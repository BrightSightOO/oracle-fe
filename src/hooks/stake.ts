import { useUmi } from "@/context/UmiProvider";
import {
  getOptimisticOracleProgramId,
  getStakeV1AccountDataSerializer,
  getStakeV1GpaBuilder,
  StakeV1,
  StakeV1AccountData,
} from "@/program-sdks/oracle";
import { fromWeb3JsAccountInfo, toWeb3JsGpaFilter } from "@/utils/web3js-adapters";
import { deserializeAccount, PublicKey } from "@metaplex-foundation/umi";
import { fromWeb3JsPublicKey, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { Serializer } from "@metaplex-foundation/umi/serializers";
import { useEffect, useReducer, useRef } from "react";

export function useStakes(): ReadonlyMap<PublicKey, StakeV1> {
  const umi = useUmi();

  const [accounts, updateAccounts] = useReducer(
    (state: Map<PublicKey, StakeV1>, action: StakeV1 | Array<StakeV1>) => {
      if (Array.isArray(action)) {
        for (const req of action) {
          state.set(req.publicKey, req);
        }
      } else {
        state.set(action.publicKey, action);
      }
      return state;
    },
    new Map(),
  );

  const serializer = useRef<Serializer<StakeV1AccountData>>();

  // TODO: Use some sort of pagination to minimize requests fetched.

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const programId = getOptimisticOracleProgramId(umi);

    const gpaBuilderOwner = getStakeV1GpaBuilder(umi).whereField("owner", umi.identity.publicKey);
    const gpaBuilderDelegate = getStakeV1GpaBuilder(umi).whereField(
      "delegate",
      umi.identity.publicKey,
    );

    let subscriptionIdOwner: number | undefined;
    let subscriptionIdDelegate: number | undefined;

    void (async () => {
      let accounts: Array<StakeV1>;

      try {
        accounts = await gpaBuilderOwner.getDeserialized({ signal });
      } catch (err) {
        if (signal.aborted) {
          return;
        }
        throw err;
      }

      updateAccounts(accounts);

      subscriptionIdOwner = umi.rpc.connection.onProgramAccountChange(
        toWeb3JsPublicKey(programId),
        ({ accountId, accountInfo }) => {
          const rawAccount = fromWeb3JsAccountInfo(fromWeb3JsPublicKey(accountId), accountInfo);
          const account = deserializeAccount(
            rawAccount,
            (serializer.current ??= getStakeV1AccountDataSerializer()),
          );

          updateAccounts(account);
        },
        undefined,
        gpaBuilderOwner.options.filters?.map(toWeb3JsGpaFilter),
      );
    })();

    void (async () => {
      let accounts: Array<StakeV1>;

      try {
        accounts = await gpaBuilderDelegate.getDeserialized({ signal });
      } catch (err) {
        if (signal.aborted) {
          return;
        }
        throw err;
      }

      updateAccounts(accounts);

      subscriptionIdDelegate = umi.rpc.connection.onProgramAccountChange(
        toWeb3JsPublicKey(programId),
        ({ accountId, accountInfo }) => {
          const rawAccount = fromWeb3JsAccountInfo(fromWeb3JsPublicKey(accountId), accountInfo);
          const account = deserializeAccount(
            rawAccount,
            (serializer.current ??= getStakeV1AccountDataSerializer()),
          );

          updateAccounts(account);
        },
        undefined,
        gpaBuilderDelegate.options.filters?.map(toWeb3JsGpaFilter),
      );
    })();

    return () => {
      controller.abort();

      if (subscriptionIdOwner !== undefined) {
        void umi.rpc.connection.removeProgramAccountChangeListener(subscriptionIdOwner);
        subscriptionIdOwner = undefined;
      }
      if (subscriptionIdDelegate !== undefined) {
        void umi.rpc.connection.removeProgramAccountChangeListener(subscriptionIdDelegate);
        subscriptionIdDelegate = undefined;
      }
    };
  }, [umi, umi.identity.publicKey]);

  return accounts;
}
