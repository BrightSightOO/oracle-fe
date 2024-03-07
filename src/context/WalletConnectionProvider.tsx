import { FC, useMemo } from 'react';
import { ScriptProps } from 'next/script';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { UmiProvider } from './UmiProvider';
import { useCluster } from './cluster';
import { RPC_POOL_CLUSTER_MAP } from './rpc';

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider: FC<ScriptProps> = ({ children }) => {
  const network = useCluster();

  const endpoint = useMemo(
    () => RPC_POOL_CLUSTER_MAP[network as keyof typeof RPC_POOL_CLUSTER_MAP],
    [network]
  );

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
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
