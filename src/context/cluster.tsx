import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useRouter } from "next/router";
import { ScriptProps } from "next/script";
import { FC, createContext, useContext, useEffect, useMemo } from "react";
import { ClusterKey, setCluster } from "../constants/index";

export type RpcNetwork = WalletAdapterNetwork.Devnet | WalletAdapterNetwork.Mainnet;

export const ClusterContext = createContext<RpcNetwork>(WalletAdapterNetwork.Devnet);

export const useCluster = () => useContext(ClusterContext);

export const ClusterContextProvider: FC<ScriptProps> = ({ children }) => {
  const router = useRouter();

  const envNetwork = process.env.NEXT_PUBLIC_RPC_NETWORK;
  const routerNetwork = Array.isArray(router.query.network)
    ? router.query.network.at(-1)
    : router.query.network;

  const network = useMemo(() => {
    switch (routerNetwork) {
      case WalletAdapterNetwork.Devnet:
      case WalletAdapterNetwork.Mainnet:
        return routerNetwork;

      default:
        return envNetwork;
    }
  }, [routerNetwork, envNetwork]);

  useEffect(() => setCluster(network as ClusterKey), [network]);

  return <ClusterContext.Provider value={network}>{children}</ClusterContext.Provider>;
};
