import { Umi, publicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { ExpireAssertionArgs, expireAssertion } from '..';
import { ResolveArgs, resolve } from '@/program-sdks/par-resolver';

export const expireAndResolveRequest = async ({
  umi,
  request,
  market,
}: {
  umi: Umi;
  request: string;
  market: string;
}) => {
  try {
    const requestKey = publicKey(request);

    return transactionBuilder()
      .append(
        expireAssertion(umi, {
          request: requestKey,
          expireAssertionArgs: ExpireAssertionArgs.V1,
        }),
      )
      .append(
        resolve(umi, {
          market: publicKey(market),
          request: requestKey,
          resolveArgs: ResolveArgs.V1,
        }),
      )
      .sendAndConfirm(umi);
  } catch (e) {
    throw e;
  }
};
