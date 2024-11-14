import { useUmi } from "@/context/UmiProvider";
import { fromWeb3JsAccountInfo } from "@/utils/web3js-adapters";
import {
  Account,
  deserializeAccount,
  MaybeRpcAccount,
  PublicKey,
  RpcAccount,
} from "@metaplex-foundation/umi";
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { Serializer } from "@metaplex-foundation/umi/serializers";
import { useCallback, useEffect, useRef, useState } from "react";

export function useAccount<T extends object>(
  address: PublicKey,
  accountSerializer: Serializer<T> | (() => Serializer<T>),
): Account<T> | null | undefined {
  const umi = useUmi();

  const [account, setAccount] = useState<Account<T> | null>();

  const serializer = useRef<Serializer<T>>();

  const setAccountFromRaw = useCallback(
    (rawAccount: RpcAccount | null) => {
      if (rawAccount === null || rawAccount.data.length === 0) {
        setAccount(null);
        return;
      }

      if (serializer.current === undefined) {
        serializer.current =
          typeof accountSerializer === "function" ? accountSerializer() : accountSerializer;
      }

      setAccount(deserializeAccount(rawAccount, serializer.current));
    },
    [accountSerializer],
  );

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
        setAccountFromRaw(null);
        return;
      }
      setAccountFromRaw(account);

      subscriptionId = umi.rpc.connection.onAccountChange(
        toWeb3JsPublicKey(address),
        (accountInfo) => setAccountFromRaw(fromWeb3JsAccountInfo(address, accountInfo)),
      );
    })();

    return () => {
      controller.abort();

      if (subscriptionId !== undefined) {
        void umi.rpc.connection.removeAccountChangeListener(subscriptionId);
        subscriptionId = undefined;
      }
    };
  }, [address, setAccountFromRaw, umi]);

  return account;
}
