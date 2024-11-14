import {
  getTokenSize,
  getSplTokenProgramId,
  initializeToken3,
  closeToken,
  createAccount,
  syncNative,
} from '@metaplex-foundation/mpl-toolbox';
import {
  Umi,
  SolAmount,
  generateSigner,
  transactionBuilder,
  addAmounts,
  PublicKey,
} from '@metaplex-foundation/umi';

export const createWrappedSol = async ({
  umi,
  mint,
  amount,
  shouldSync,
}: {
  umi: Umi;
  amount: SolAmount;
  mint: PublicKey;
  shouldSync: boolean;
}) => {
  const token = generateSigner(umi);
  const tokenSize = getTokenSize();
  const rent = await umi.rpc.getRent(tokenSize);

  const preBuilder = transactionBuilder()
    .append(
      createAccount(umi, {
        newAccount: token,
        programId: getSplTokenProgramId(umi),
        lamports: addAmounts(amount, rent),
        space: tokenSize,
      }),
    )
    .append(
      initializeToken3(umi, {
        account: token.publicKey,
        owner: umi.identity.publicKey,
        mint,
      }),
    );

  if (shouldSync) {
    preBuilder.append(
      syncNative(umi, {
        account: token.publicKey,
      }),
    );
  }

  const postBuilder = closeToken(umi, {
    account: token.publicKey,
    destination: umi.payer.publicKey,
    owner: umi.identity,
  });

  return { token: token.publicKey, pre: preBuilder, post: postBuilder };
};
