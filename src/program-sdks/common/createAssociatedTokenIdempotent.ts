import {
  findAssociatedTokenPda,
  getSplAssociatedTokenProgramId,
  getSplSystemProgramId,
  getSplTokenProgramId,
  getTokenSize,
} from '@metaplex-foundation/mpl-toolbox';
import {
  ACCOUNT_HEADER_SIZE,
  publicKey,
  transactionBuilder,
  type AccountMeta,
  type Context,
  type Pda,
  type PublicKey,
  type Signer,
  type TransactionBuilder,
} from '@metaplex-foundation/umi';

export type CreateAssociatedTokenIdempotentInstructionAccounts = {
  payer?: Signer;
  ata?: PublicKey | Pda;
  owner?: PublicKey | Pda;
  mint: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
};

export function createAssociatedTokenIdempotent(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateAssociatedTokenIdempotentInstructionAccounts,
): TransactionBuilder {
  const programId = getSplAssociatedTokenProgramId(context);

  const { mint } = input;

  // Account defaults.
  let { payer, ata, owner, systemProgram, tokenProgram } = input;
  payer ??= context.payer;
  owner ??= context.identity.publicKey;
  ata ??= findAssociatedTokenPda(context, {
    mint: publicKey(mint, false),
    owner: publicKey(owner, false),
  });
  systemProgram ??= getSplSystemProgramId(context);
  tokenProgram ??= getSplTokenProgramId(context);

  const keys: AccountMeta[] = [
    { pubkey: payer.publicKey, isSigner: true, isWritable: true },
    { pubkey: publicKey(ata, false), isSigner: false, isWritable: true },
    { pubkey: publicKey(owner, false), isSigner: false, isWritable: false },
    { pubkey: publicKey(mint, false), isSigner: false, isWritable: false },
    {
      pubkey: publicKey(systemProgram, false),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: publicKey(tokenProgram, false),
      isSigner: false,
      isWritable: false,
    },
  ];

  const data = new Uint8Array(1);
  data[0] = 1;

  const signers: Signer[] = [payer];

  const bytesCreatedOnChain = getTokenSize() + ACCOUNT_HEADER_SIZE;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
