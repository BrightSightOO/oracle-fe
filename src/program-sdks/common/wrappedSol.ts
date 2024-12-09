import {
  addAmounts,
  generateSigner,
  lamports,
  publicKey,
  transactionBuilder,
  Umi,
} from '@metaplex-foundation/umi';
import { toWeb3JsInstruction } from '@metaplex-foundation/umi-web3js-adapters';
import {
  syncNative,
  closeToken,
  getTokenSize,
  createAccount,
  getSplTokenProgramId,
  initializeToken3,
} from '@metaplex-foundation/mpl-toolbox';

export const createWrappedSol = async ({
  umi,
  rewardMint,
  reward,
}: {
  umi: Umi;
  reward: bigint;
  rewardMint: string;
}) => {
  const token = generateSigner(umi);
  const tokenSize = getTokenSize();
  const rent = await umi.rpc.getRent(tokenSize);

  const preBuilder = transactionBuilder()
    .append(
      createAccount(umi, {
        newAccount: token,
        programId: getSplTokenProgramId(umi),
        lamports: addAmounts(lamports(reward), rent),
        space: tokenSize,
      }),
    )
    .append(
      initializeToken3(umi, {
        account: token.publicKey,
        mint: publicKey(rewardMint),
        owner: umi.identity.publicKey,
      }),
    )
    .append(
      syncNative(umi, {
        account: token.publicKey,
      }),
    );

  const postBuilder = closeToken(umi, {
    account: token.publicKey,
    destination: umi.payer.publicKey,
    owner: umi.identity,
  });

  return [
    preBuilder
      .getInstructions()
      .map((instruction) => toWeb3JsInstruction(instruction)),
    postBuilder
      .getInstructions()
      .map((instruction) => toWeb3JsInstruction(instruction)),
  ];
};
