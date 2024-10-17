import { optimisticOracle } from "@/program-sdks/oracle";
import { parimutuelResolver } from "@/program-sdks/par-resolver";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { Umi } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useWallet } from "@solana/wallet-adapter-react";
import { FC, createContext, ReactNode, useContext } from "react";

export const UmiContext = createContext<Umi | undefined>(undefined);

export function useUmi(): Umi {
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

  const umi = createUmi(endpoint)
    .use(walletAdapterIdentity(wallet))
    .use(dasApi())
    .use(mplToolbox())
    .use(optimisticOracle())
    .use(parimutuelResolver());

  return <UmiContext.Provider value={umi}>{children}</UmiContext.Provider>;
};
