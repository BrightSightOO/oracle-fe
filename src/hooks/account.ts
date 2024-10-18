import type { AccountInfo } from "@solana/web3.js";

import { useUmi } from "@/context/UmiProvider";
import {
  Account,
  deserializeAccount,
  MaybeRpcAccount,
  PublicKey,
  RpcAccount,
} from "@metaplex-foundation/umi";
import { fromWeb3JsPublicKey, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { Serializer } from "@metaplex-foundation/umi/serializers";
import { useEffect, useRef, useState } from "react";

export function rpcAccountFromWeb3Js(
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

export function useAccount<T extends object>(
  address: PublicKey,
  accountSerializer: Serializer<T> | (() => Serializer<T>),
): Account<T> | undefined {
  const umi = useUmi();

  const [rawAccount, setRawAccount] = useState<RpcAccount>();
  const [account, setAccount] = useState<Account<T>>();

  const serializer = useRef<Serializer<T>>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let subscriptionId: number | undefined;

    void (async () => {
      let account: MaybeRpcAccount;
      try {
        account = await umi.rpc.getAccount(address, { signal });
      } catch (err) {
        if (signal.aborted) {
          return;
        }
        throw err;
      }

      if (!account.exists) {
        setRawAccount(undefined);
        return;
      }
      setRawAccount(account);

      subscriptionId = umi.rpc.connection.onAccountChange(
        toWeb3JsPublicKey(address),
        (accountInfo) => setRawAccount(rpcAccountFromWeb3Js(address, accountInfo)),
      );
    })();

    return () => {
      controller.abort();

      if (subscriptionId !== undefined) {
        void umi.rpc.connection.removeAccountChangeListener(subscriptionId);
      }
    };
  }, [address, umi.rpc]);

  useEffect(() => {
    if (rawAccount === undefined || rawAccount.data.length === 0) {
      setAccount(undefined);
      return;
    }

    serializer.current ??=
      typeof accountSerializer === "function" ? accountSerializer() : accountSerializer;

    setAccount(deserializeAccount(rawAccount, serializer.current));
  }, [accountSerializer, rawAccount]);

  return account;
}
