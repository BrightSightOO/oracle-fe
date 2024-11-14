import {
  AssertionV1,
  findAssertionV1Pda,
  findVotingV1Pda,
  getRequestV1GpaBuilder,
  RequestV1,
  safeFetchAssertionV1,
  safeFetchVotingV1,
  VotingV1,
} from "@/program-sdks/oracle";
import { PublicKey } from "@metaplex-foundation/umi";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { createContext, FC, useContext, useState } from "react";
import { useUmi } from "./UmiProvider";

type ContextProps = {
  requests: RequestV1[];
  requestToAssertionMap: Record<PublicKey, AssertionV1>;
  assertionToVotingMap: Record<PublicKey, VotingV1>;
  //fetchRefreshAccounts: (marketAddress: PublicKey, userPositions: PublicKey[]) => void;
};

export type IOracleContext = ContextProps;

const defaultValue: IOracleContext = {
  requests: [],
  requestToAssertionMap: {},
  assertionToVotingMap: {},
  //fetchRefreshAccounts: () => "unimplemented",
};

export const OracleContext = createContext<IOracleContext>(defaultValue);
export const useOracleAccounts = () => useContext(OracleContext);

export const OracleAccountsProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const umi = useUmi();

  const [requests, setRequests] = useState<RequestV1[]>([]);
  const [requestToAssertionMap, setRequestToAssertionMap] = useState<
    Record<PublicKey, AssertionV1>
  >({});
  const [assertionToVotingMap, setAssertionToVotingMap] = useState<Record<PublicKey, VotingV1>>({});

  const fetchOracleAccounts = async () => {
    // Fetch requests onchain
    const requests = await getRequestV1GpaBuilder(umi).getDeserialized();
    setRequests((pS) => _.uniqBy([...pS, ...requests], "publicKey"));

    // Fetch assertions and voting from requests
    const requestToAssertionMap: Record<PublicKey, AssertionV1> = {};
    const assertionToVotingMap: Record<PublicKey, VotingV1> = {};
    for (const request of requests) {
      // Fetch all assertions matching the request round
      const [assertionPda] = findAssertionV1Pda(umi, {
        request: request.publicKey,
        round: request.round,
      });
      const assertion = await safeFetchAssertionV1(umi, assertionPda);

      if (!assertion) return;
      requestToAssertionMap[request.publicKey] = assertion;
      setRequestToAssertionMap(requestToAssertionMap);

      // Fetch Voting accounts matching assertion
      const [votingPda] = findVotingV1Pda(umi, { assertion: assertionPda });
      const voting = await safeFetchVotingV1(umi, votingPda);

      if (!voting) return;
      assertionToVotingMap[assertion.publicKey] = voting;
      setAssertionToVotingMap(assertionToVotingMap);
    }

    return { requests, requestToAssertionMap, assertionToVotingMap };
  };

  const oracleAccountsQuery = useQuery({
    queryKey: ["oracle-accounts", requests.length],
    queryFn: fetchOracleAccounts,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  // const fetchRefreshAccounts = async (marketAddress: PublicKey, userPositions: PublicKey[]) => {
  //   try {
  //     const maybeMarket = await safeFetchMarketV1(umi, marketAddress);
  //     const updatedMarkets = markets.map((m) => {
  //       if (maybeMarket && m.publicKey === marketAddress) {
  //         return maybeMarket;
  //       } else {
  //         return m;
  //       }
  //     });
  //     setMarkets(updatedMarkets);

  //     if (userPositions.length) {
  //       const maybeUserPositions = await safeFetchAllUserPositionV1(umi, userPositions);

  //       setUserPositionsMap((pS) => {
  //         const existingPositons = marketAddress in pS ? pS[marketAddress] : [];
  //         return {
  //           ...pS,
  //           [marketAddress]: _.uniqBy([...existingPositons, ...maybeUserPositions], "publicKey"),
  //         };
  //       });
  //     }
  //   } catch (e) {
  //     // noop
  //   }
  // };

  return (
    <OracleContext.Provider
      value={{
        requests,
        requestToAssertionMap,
        assertionToVotingMap,
      }}
    >
      {children}
    </OracleContext.Provider>
  );
};
