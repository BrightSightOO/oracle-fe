import { useUmi } from "@/context/UmiProvider";
import {
  getOptimisticOracleProgramId,
  getRequestV1AccountDataSerializer,
  getRequestV1GpaBuilder,
  RequestState,
  RequestV1,
  RequestV1AccountData,
} from "@/program-sdks/oracle";
import { fromWeb3JsAccountInfo, toWeb3JsGpaFilter } from "@/utils/web3js-adapters";
import { deserializeAccount, PublicKey } from "@metaplex-foundation/umi";
import { fromWeb3JsPublicKey, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { Serializer } from "@metaplex-foundation/umi/serializers";
import { useEffect, useReducer, useRef } from "react";

/**
 * Off-chain request data.
 */
export type RequestData = {
  readonly title: string;
  readonly description: string;
};

// TODO: Create a cache for requests.

const requestDataCache = new Map<PublicKey, RequestData | Promise<RequestData>>();

export function useRequests(state: RequestState): ReadonlyMap<PublicKey, RequestV1> {
  const umi = useUmi();

  const [accounts, updateAccounts] = useReducer(
    (state: Map<PublicKey, RequestV1>, action: RequestV1 | Array<RequestV1>) => {
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

  const serializer = useRef<Serializer<RequestV1AccountData>>();

  // TODO: Use some sort of pagination to minimize requests fetched.

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const programId = getOptimisticOracleProgramId(umi);
    const gpaBuilder = getRequestV1GpaBuilder(umi).whereField("state", state);

    let subscriptionId: number | undefined;

    void (async () => {
      let accounts: Array<RequestV1>;
      try {
        accounts = await gpaBuilder.getDeserialized({ signal });
      } catch (err) {
        if (signal.aborted) {
          return;
        }
        throw err;
      }

      updateAccounts(accounts);

      subscriptionId = umi.rpc.connection.onProgramAccountChange(
        toWeb3JsPublicKey(programId),
        ({ accountId, accountInfo }) => {
          const rawAccount = fromWeb3JsAccountInfo(fromWeb3JsPublicKey(accountId), accountInfo);
          const account = deserializeAccount(
            rawAccount,
            (serializer.current ??= getRequestV1AccountDataSerializer()),
          );

          updateAccounts(account);
        },
        undefined,
        gpaBuilder.options.filters?.map(toWeb3JsGpaFilter),
      );
    })();

    return () => {
      controller.abort();

      if (subscriptionId !== undefined) {
        void umi.rpc.connection.removeProgramAccountChangeListener(subscriptionId);
        subscriptionId = undefined;
      }
    };
  }, [state, umi]);

  return accounts;
}

export async function fetchRequestData(
  request: Pick<RequestV1, "publicKey" | "uri">,
): Promise<RequestData> {
  const cached = requestDataCache.get(request.publicKey);
  if (cached !== undefined) {
    return cached;
  }

  // TODO: Fetch and cache data.

  return { title: "Unknown", description: "..." };
}
