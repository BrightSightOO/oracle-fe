import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useUmi } from './UmiProvider';
import { PublicKey } from '@metaplex-foundation/umi';
import { getClusterConstant } from '@/constants';
import {
  AccountType,
  fetchOracle,
  fetchOracleFromSeeds,
  findRequestPda,
  getRequestGpaBuilder,
  Request,
  safeFetchAllRequest,
} from '@/program-sdks/oracle';
import { getDescriptions } from '@/program-sdks/oracle/scripts/descriptions';
import { ParimutuelMarketSchema } from '@/data/ipfs';

type ContextProps = {
  oracleRequestAccounts: Request[];
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
  const [descriptions, setDescriptions] = useState<
    Record<string, ParimutuelMarketSchema>
  >({});
  console.log('oracleRequestKeys', oracleRequestKeys);

  const OPTIMISTIC_ORACLE = getClusterConstant('OPTIMISTIC_ORACLE');

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
    console.log('runs');
    let requestKeys = oracleRequestKeys;
    if (requestKeys.length === 0 || reload) {
      const respKeys = await prefetchAccounts();
      requestKeys = respKeys;
    }
    console.log('here after', requestKeys, page, perPage);
    const paginatedPublicKeys = requestKeys.slice(
      (page - 1) * perPage,
      page * perPage,
    );
    console.log(' 1 oracleRequestKeys', oracleRequestKeys);
    console.log(' 1 paginatedPublicKeys', paginatedPublicKeys);
    if (paginatedPublicKeys.length === 0) {
      return;
    }
    console.log('here 1');
    const maybeRequests = await safeFetchAllRequest(umi, paginatedPublicKeys);
    const hashList = maybeRequests.map((request) => ({
      key: request.publicKey,
      hash: request.data.question,
    }));
    console.log('here 2', maybeRequests);

    const newDescriptions = await getDescriptions(hashList);
    setDescriptions((oldMap) => ({
      ...oldMap,
      ...newDescriptions,
    }));
    console.log('here 3', newDescriptions);

    setOracleRequestAccounts((pS) => [...pS, ...maybeRequests]);
  };

  return (
    <OracleContext.Provider
      value={{
        oracleRequestAccounts,
        descriptions,
        fetchPage,
      }}
    >
      {children}
    </OracleContext.Provider>
  );
};
