import { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { mplBubblegum } from '@metaplex-foundation/mpl-bubblegum';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox';
import { Umi } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { bundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr';

type UmiContext = {
  umi: Umi | null;
};

const DEFAULT_CONTEXT: UmiContext = {
  umi: null,
};

export const UmiContext = createContext<UmiContext>(DEFAULT_CONTEXT);

export function useUmi(): Umi {
  const umi = useContext(UmiContext).umi;
  if (!umi) {
    throw new Error(
      'Umi context was not initialized. ' +
        'Did you forget to wrap your app with <UmiProvider />?'
    );
  }
  return umi;
}

export const UmiProvider = ({
  endpoint,
  children,
}: {
  endpoint: string;
  children: ReactNode;
}) => {
  const wallet = useWallet();
  const umi = createUmi(endpoint)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrUploader())
    .use(mplToolbox())
    .use(mplBubblegum())
    .use(dasApi())
    .use(mplCandyMachine());

  return <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>;
};
