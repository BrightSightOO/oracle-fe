import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const apiKey =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_RPC_API_KEY
    : '';

export const RPC_POOL_CLUSTER_MAP = {
  [WalletAdapterNetwork.Testnet]:
    process.env.NEXT_PUBLIC_TESTNET_RPC_URL || 'localhost:8900',
  [WalletAdapterNetwork.Devnet]:
    process.env.NEXT_PUBLIC_DEV_RPC_URL ||
    'https://hedgehog-hedgehog-3e2c.devnet.rpcpool.com/' + apiKey,

  [WalletAdapterNetwork.Mainnet]:
    process.env.NEXT_PUBLIC_MAINNET_RPC_URL ||
    'https://hedgehog-hedgehog-41ec.mainnet.rpcpool.com/' + apiKey,
};
