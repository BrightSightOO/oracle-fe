import {
  signTransaction,
  TransactionBuilder,
  Umi,
} from '@metaplex-foundation/umi';
import {
  fromWeb3JsTransaction,
  toWeb3JsInstruction,
} from '@metaplex-foundation/umi-web3js-adapters';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { Provider } from '@project-serum/anchor';
import {
  AddressLookupTableAccount,
  ComputeBudgetProgram,
  Connection,
  PublicKey as W3PK,
  SendOptions,
  SendTransactionError,
  Signer,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import bs58 from 'bs58';
import { PriorityFee, StorageKeys } from 'constants/common';

function getPriorityFees(): number {
  let savedPriorityFee;
  if (typeof window !== 'undefined') {
    savedPriorityFee = window.localStorage.getItem(StorageKeys.PRIORITY_FEE);
  }

  return savedPriorityFee
    ? Number(JSON.parse(savedPriorityFee))
    : PriorityFee.FAST;
}

async function getSimulationUnits(
  connection: Connection,
  instructions: TransactionInstruction[],
  payer: W3PK,
  lookupTables?: AddressLookupTableAccount[],
): Promise<number | undefined> {
  const testInstructions = [
    ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }),
    ...instructions,
  ];

  const testVersionedTxn = new VersionedTransaction(
    new TransactionMessage({
      instructions: testInstructions,
      payerKey: payer,
      recentBlockhash: W3PK.default.toString(),
    }).compileToV0Message(lookupTables),
  );

  const simulation = await connection.simulateTransaction(testVersionedTxn, {
    replaceRecentBlockhash: true,
    sigVerify: false,
    commitment: 'confirmed',
  });
  if (simulation.value.err) {
    return undefined;
  }
  return simulation.value.unitsConsumed;
}

export async function buildOptimalTransaction(
  connection: Connection,
  instructions: TransactionInstruction[],
  payer: W3PK,
  signers: Signer[],
  lookupTables?: AddressLookupTableAccount[],
) {
  const [units, recentBlockhash] = await Promise.all([
    getSimulationUnits(connection, instructions, payer, lookupTables),
    connection.getLatestBlockhash(),
  ]);

  if (units) {
    // Add 1000 margin of error to units
    instructions.unshift(
      ComputeBudgetProgram.setComputeUnitLimit({ units: units + 1000 }),
    );
  }

  const selectedFee = getPriorityFees();
  if (selectedFee !== PriorityFee.NONE) {
    instructions.unshift(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: selectedFee,
      }),
    );
  }

  // Build Legacy Transaction
  const legacyTransaction = new Transaction().add(...instructions);
  legacyTransaction.recentBlockhash = recentBlockhash.blockhash;
  legacyTransaction.lastValidBlockHeight = recentBlockhash.lastValidBlockHeight;
  legacyTransaction.feePayer = payer;
  if (signers.length) {
    legacyTransaction.sign(...signers);
  }

  // Build Versioned Transaction
  const transaction = new VersionedTransaction(
    new TransactionMessage({
      instructions,
      recentBlockhash: recentBlockhash.blockhash,
      payerKey: payer,
    }).compileToV0Message(lookupTables),
  );

  for (const signer of signers) {
    transaction.addSignature(signer.publicKey, signer.secretKey);
  }

  return {
    transaction,
    legacyTransaction,
  };
}

export async function sendAndConfirmTransactionV1(
  provider: Provider,
  transaction: Transaction,
  opts: SendOptions = {},
) {
  const signedTransaction = await provider.wallet.signTransaction(transaction);

  try {
    const transactionSignature = await provider.connection.sendRawTransaction(
      signedTransaction.serialize(),
      {
        ...opts,
        maxRetries: 3,
        skipPreflight: true,
      },
    );

    const status = await provider.connection.confirmTransaction(
      {
        signature: transactionSignature,
        blockhash: transaction.recentBlockhash!,
        lastValidBlockHeight: transaction.lastValidBlockHeight!,
      },
      'confirmed',
    );

    if (status.value.err) {
      throw status.value.err;
    }

    return transactionSignature;
  } catch (err) {
    // thrown if the underlying 'confirmTransaction' encounters a failed tx
    // the 'confirmTransaction' error does not return logs so we make another rpc call to get them
    if (err instanceof Error) {
      // choose the shortest available commitment for 'getTransaction'
      // (the json RPC does not support any shorter than "confirmed" for 'getTransaction')
      // because that will see the tx sent with `sendAndConfirmRawTransaction` no matter which
      // commitment `sendAndConfirmRawTransaction` used
      const failedTx = await provider.connection.getTransaction(
        bs58.encode(signedTransaction.signature!),
      );

      if (!failedTx) {
        throw err;
      } else {
        const logs = failedTx.meta?.logMessages;
        throw !logs ? err : new SendTransactionError(err.message, logs);
      }
    } else {
      throw err;
    }
  }
}

export function extractTxSig(signature: Uint8Array): string {
  return base58.deserialize(signature)[0];
}

export async function buildAndSendOptimized(
  connection: Connection,
  umi: Umi,
  builder: TransactionBuilder,
  wallet: W3PK,
) {
  const instructions = builder.getInstructions();

  const { transaction } = await buildOptimalTransaction(
    connection,
    instructions.map((inx) => toWeb3JsInstruction(inx)),
    wallet,
    [],
  );

  const latestBlockHash = await umi.rpc.getLatestBlockhash();
  transaction.message.recentBlockhash = latestBlockHash.blockhash;
  const optimalTransaction = fromWeb3JsTransaction(transaction);

  const signed = await signTransaction(
    optimalTransaction,
    builder.getSigners(umi),
  );
  const signature = await umi.rpc.sendTransaction(signed);
  const result = await umi.rpc.confirmTransaction(signature, {
    strategy: {
      type: 'blockhash',
      ...latestBlockHash,
    },
  });
  return { result, signature };
}
