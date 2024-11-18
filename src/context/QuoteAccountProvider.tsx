import {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  SetStateAction,
} from 'react';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { stripSuffix } from '@/utils/strings';
import { getClusterConstants } from '@/constants';
import { Account } from '@solana/spl-token';
import { loadToken } from '@/models/token';

export type TokenAccount = Account & {
  uiAmount: number | null;
  uiAmountString?: string;
  decimals: number;
};

type ContextProps = {
  userUSDCAccount: TokenAccount | undefined;
  userUSDCBalance: number;
  userSolBalance: number;
  referralWalletAddress: PublicKey | undefined;
};

export const QuoteAccountContext = createContext<ContextProps>({
  userUSDCAccount: undefined,
  userUSDCBalance: 0,
  userSolBalance: 0,
  referralWalletAddress: undefined,
});

export const useQuoteAccount = () => useContext(QuoteAccountContext);

export const QuoteAccountProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [subId, setSubId] = useState<number | undefined>();

  const [userSolBalance, setUserSolBalance] = useState(0);
  const [userUSDCAccount, setUserUSDCAccount] = useState<TokenAccount>();

  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (!wallet) {
      setUserUSDCAccount(undefined);
      if (subId) {
        unsubscribeAccount(subId);
      }
    }
  }, [wallet]);

  useEffect(() => {
    if (!wallet) return;

    (async () => {
      const { QUOTE_TOKEN } = getClusterConstants('QUOTE_TOKEN');

      const userQuoteAccount = await getAssociatedTokenAddress(
        QUOTE_TOKEN,
        wallet.publicKey,
      );

      const userQuoteBuf = await connection.getAccountInfo(userQuoteAccount);

      let userQuoteAccountInfo: TokenAccount | undefined;
      if (userQuoteBuf) {
        const userQuoteAccountRaw = loadToken(userQuoteAccount, userQuoteBuf);
        const infoQuote = await connection.getTokenAccountBalance(
          userQuoteAccount,
        );
        userQuoteAccountInfo = {
          ...userQuoteAccountRaw,
          ...infoQuote.value,
          amount: BigInt(infoQuote.value.amount),
        };
        setUserUSDCAccount(userQuoteAccountInfo);
      }

      const quoteSubId = connection.onAccountChange(
        userQuoteAccount,
        (accountInfo) => {
          const tokenAccount = loadToken(userQuoteAccount, accountInfo);

          const uiAmount =
            Number(tokenAccount.amount) /
            10 ** (userQuoteAccountInfo?.decimals ?? 6);
          const update: TokenAccount = {
            ...userUSDCAccount,
            ...tokenAccount,
            uiAmount,
            uiAmountString: uiAmount.toString(),
            decimals: userQuoteAccountInfo?.decimals ?? 6,
          };
          setUserUSDCAccount(update);
        },
      );
      setSubId(quoteSubId);
    })();
  }, [wallet]);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    (async () => {
      try {
        const balance = await connection.getBalance(wallet?.publicKey);
        setUserSolBalance(balance / LAMPORTS_PER_SOL);
      } catch (e) {
        //noop
      }
    })();
  }, [wallet?.publicKey.toBase58()]);

  const unsubscribeAccount = (subId: number) => {
    connection.removeAccountChangeListener(subId);
    setSubId(undefined);
  };

  const referralWalletAddress = useMemo(() => {
    if (
      // Query param property exists
      'referral' in router.query &&
      // Value is present
      router.query.referral &&
      // Not the same as connected wallet
      stripSuffix(router.query.referral as string, '/') !==
        wallet?.publicKey.toBase58()
    ) {
      try {
        return new PublicKey(stripSuffix(router.query.referral as string, '/'));
      } catch (e) {
        //noop
      }
    }
  }, [router.query, wallet?.publicKey.toBase58()]);

  return (
    <QuoteAccountContext.Provider
      value={{
        userUSDCAccount,
        userUSDCBalance: userUSDCAccount?.uiAmount || 0,
        userSolBalance,
        referralWalletAddress,
      }}
    >
      {children}
    </QuoteAccountContext.Provider>
  );
};
