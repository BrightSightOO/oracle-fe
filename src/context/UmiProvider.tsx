import { optimisticOracle } from "@/program-sdks/oracle";
import { parimutuelResolver } from "@/program-sdks/par-resolver";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { Umi } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { createContext, FC, ReactNode, useContext } from "react";

type Web3JsUmi = Umi & { rpc: { readonly connection: Connection } };

export const UmiContext = createContext<Web3JsUmi | undefined>(undefined);

export function useUmi(): Web3JsUmi {
  const umi = useContext(UmiContext);
  if (umi === undefined) {
    throw new Error(
      "Umi context was not initialized. Did you forget to wrap your app with <UmiProvider />?",
    );
  }
  return umi;
}

export const UmiProvider: FC<{ children: ReactNode; endpoint: string }> = ({
  endpoint,
  children,
}) => {
  const wallet = useWallet();

  const umi = createUmi(endpoint, { commitment: "confirmed" })
    .use(walletAdapterIdentity(wallet))
    .use(dasApi())
    .use(mplToolbox())
    .use(optimisticOracle())
    .use(parimutuelResolver()) as Web3JsUmi;

  return <UmiContext.Provider value={umi}>{children}</UmiContext.Provider>;
};
