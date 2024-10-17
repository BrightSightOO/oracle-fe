import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ScriptProps } from "next/script";
import { FC, useMemo } from "react";
import { UmiProvider } from "./UmiProvider";
import { useCluster } from "./cluster";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");

export type RpcNetwork = WalletAdapterNetwork.Devnet | WalletAdapterNetwork.Mainnet;

const WalletConnectionProvider: FC<ScriptProps> = ({ children }) => {
  const network = useCluster();

  const devnetUrl = process.env.NEXT_PUBLIC_DEVNET_RPC_URL;
  const mainnetUrl = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;

  const endpoint = useMemo(
    () => (network === WalletAdapterNetwork.Devnet ? devnetUrl : mainnetUrl),
    [devnetUrl, mainnetUrl, network],
  );

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    // TODO: Check if dependency on `network` is necessary.
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <UmiProvider endpoint={endpoint}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </UmiProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletConnectionProvider;
