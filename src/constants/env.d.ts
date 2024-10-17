import type { RpcNetwork } from "@/context/cluster";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_RPC_NETWORK: RpcNetwork;
      NEXT_PUBLIC_DEVNET_RPC_URL: string;
      NEXT_PUBLIC_MAINNET_RPC_URL: string;
    }
  }
}
