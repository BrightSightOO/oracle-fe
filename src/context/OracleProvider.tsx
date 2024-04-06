import { createContext, FC, useContext, useState } from 'react';
import { useUmi } from './UmiProvider';
import { PublicKey } from '@metaplex-foundation/umi';
import {
  Assertion,
  fetchOracleFromSeeds,
  findAssertionPda,
  findRequestPda,
  Request,
  safeFetchAllAssertion,
  safeFetchAllRequest,
} from '@/program-sdks/oracle';
import { getDescriptions } from '@/program-sdks/oracle/scripts/descriptions';
import { ParimutuelMarketSchema } from '@/data/ipfs';

type ContextProps = {
  oracleRequestAccounts: Request[];
  oracleAssertionAccounts: Record<string, Assertion>;
  descriptions: Record<string, ParimutuelMarketSchema>;
  fetchPage: ({
    page,
    perPage,
    reload,
  }: {
    page: number;
    perPage: number;
    reload: boolean;
  }) => void;
};

export type IOracleContext = ContextProps;

const defaultValue: IOracleContext = {
  oracleRequestAccounts: [],
  oracleAssertionAccounts: {},
  descriptions: {},
  fetchPage: async () => 'unimplemented',
};

export const OracleContext = createContext<IOracleContext>(defaultValue);
export const useOracle = () => useContext(OracleContext);

export const OracleProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const umi = useUmi();

  const [oracleRequestKeys, setOracleRequestKeys] = useState<PublicKey[]>([]);
  const [oracleRequestAccounts, setOracleRequestAccounts] = useState<Request[]>(
    [],
  );
  const [oracleAssertionAccounts, setOracleAssertionAccounts] = useState<
    Record<string, Assertion>
  >({});
  const [descriptions, setDescriptions] = useState<
    Record<string, ParimutuelMarketSchema>
  >({});

  const prefetchAccounts = async () => {
    const account = await fetchOracleFromSeeds(umi);
    const requestPubkeyList = Array.from(
      { length: Number(account.nextIndex) },
      (_, k) => findRequestPda(umi, { index: k })[0],
    );
    setOracleRequestKeys(requestPubkeyList);
    return requestPubkeyList;
  };

  const fetchPage = async ({
    page,
    perPage,
    reload = false,
  }: {
    page: number;
    perPage: number;
    reload: boolean;
  }) => {
    let requestKeys = oracleRequestKeys;
    if (requestKeys.length === 0 || reload) {
      const respKeys = await prefetchAccounts();
      requestKeys = respKeys;
    }
    const paginatedPublicKeys = requestKeys.slice(
      (page - 1) * perPage,
      page * perPage,
    );

    if (paginatedPublicKeys.length === 0) {
      return;
    }
    const maybeRequests = await safeFetchAllRequest(umi, paginatedPublicKeys);
    const assertionAddresses = maybeRequests.map(
      (request) => findAssertionPda(umi, { request: request.publicKey })[0],
    );
    const maybeAssertions = await safeFetchAllAssertion(
      umi,
      assertionAddresses,
    );
    const hashList = maybeRequests.map((request) => ({
      key: request.publicKey,
      hash: request.data.question,
    }));

    const newDescriptions = await getDescriptions(hashList);
    setDescriptions((oldMap) => ({
      ...oldMap,
      ...newDescriptions,
    }));

    setOracleRequestAccounts((pS) => [...pS, ...maybeRequests]);
    setOracleAssertionAccounts((pS) => ({
      ...pS,
      ...maybeAssertions.reduce((acc, cur) => {
        acc[cur.request] = cur;
        return acc;
      }, {} as Record<string, Assertion>),
    }));
  };

  return (
    <OracleContext.Provider
      value={{
        oracleRequestAccounts,
        oracleAssertionAccounts,
        descriptions,
        fetchPage,
      }}
    >
      {children}
    </OracleContext.Provider>
  );
};
