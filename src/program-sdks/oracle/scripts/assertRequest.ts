import { createAssociatedTokenIdempotent } from '@/program-sdks/common/createAssociatedTokenIdempotent';
import {
  findAssociatedTokenPda,
  syncNative,
  transferSol,
} from '@metaplex-foundation/mpl-toolbox';
import {
  Umi,
  lamports,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { NATIVE_MINT } from '@solana/spl-token';
import { createAssertion } from '..';

export const assertRequest = async ({
  umi,
  request,
  bond,
  bondMint,
  outcome,
}: {
  umi: Umi;
  request: string;
  bond: bigint;
  bondMint: string;
  outcome: 0n | 1n | 2n;
}) => {
  try {
    const mint = publicKey(bondMint);

    const createAssertionBuilder = createAssertion(umi, {
      request: publicKey(request),
      bondMint: publicKey(mint),
      createAssertionArgs: {
        __kind: 'V1',
        value: outcome,
      },
    });

    if (bondMint === NATIVE_MINT.toBase58()) {
      const tokenAccount = findAssociatedTokenPda(umi, {
        mint,
        owner: umi.identity.publicKey,
      });

      return transactionBuilder()
        .append(
          createAssociatedTokenIdempotent(umi, {
            mint,
          }),
        )
        .append(
          transferSol(umi, {
            destination: tokenAccount,
            amount: lamports(bond),
          }),
        )
        .append(
          syncNative(umi, {
            account: tokenAccount,
          }),
        )
        .append(createAssertionBuilder)
        .sendAndConfirm(umi);
    }

    return createAssertionBuilder.sendAndConfirm(umi);
  } catch (e) {
    throw e;
  }
};
