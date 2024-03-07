import _ from 'lodash';
import { FC, createContext, useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ScriptProps } from 'next/script';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ClusterKey, setCluster } from '../constants/index';

export const ClusterContext = createContext<WalletAdapterNetwork>(
  WalletAdapterNetwork.Devnet
);

export const useCluster = () => useContext(ClusterContext);

export const ClusterContextProvider: FC<ScriptProps> = ({ children }) => {
  const envRpcNetwork = process.env.NEXT_PUBLIC_RPC_NETWORK || '';
  const router = useRouter();

  const network = useMemo(() => {
    if (
      _.includes(
        [WalletAdapterNetwork.Devnet, WalletAdapterNetwork.Mainnet],
        router.query.network
      )
    ) {
      return router.query.network as WalletAdapterNetwork;
    }

    return envRpcNetwork as WalletAdapterNetwork;
  }, [envRpcNetwork, router.query.network]);

  useEffect(() => setCluster(network as ClusterKey), [network]);

  return (
    <ClusterContext.Provider value={network}>
      {children}
    </ClusterContext.Provider>
  );
};
