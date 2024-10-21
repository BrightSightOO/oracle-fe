import type { PublicKey, RpcAccount, RpcDataFilter } from "@metaplex-foundation/umi";
import type { AccountInfo, GetProgramAccountsFilter } from "@solana/web3.js";

import { fromWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { base58 } from "@metaplex-foundation/umi/serializers";

export function fromWeb3JsAccountInfo(
  publicKey: PublicKey,
  accountInfo: AccountInfo<Uint8Array | Buffer>,
): RpcAccount {
  const { executable, owner, lamports, rentEpoch, data } = accountInfo;

  return {
    executable,
    owner: fromWeb3JsPublicKey(owner),
    lamports: { basisPoints: BigInt(lamports), identifier: "SOL", decimals: 9 },
    rentEpoch: rentEpoch === undefined ? undefined : BigInt(rentEpoch),
    publicKey,
    data: new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
  };
}

export function toWeb3JsGpaFilter(filter: RpcDataFilter): GetProgramAccountsFilter {
  if ("memcmp" in filter) {
    const { offset, bytes } = filter.memcmp;

    return { memcmp: { offset, bytes: base58.deserialize(bytes)[0] } };
  }

  return filter;
}
