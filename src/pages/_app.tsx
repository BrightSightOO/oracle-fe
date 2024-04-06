import type { AppProps } from 'next/app';
import { ThemeContextProvider } from '@/context/ThemeProvider';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';
import WalletConnectionProvider from '@/context/WalletConnectionProvider';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import '@/styles/fonts.css';
import '../styles/globals.css';
import Header from '@/components/Navigation/Header';
import { OracleProvider } from '@/context/OracleProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Head>
        <link rel='icon' href={'/favicon.ico'} />
        <title>Bright Sight</title>
      </Head>
      <WalletConnectionProvider>
        <ReactQueryProvider>
          <OracleProvider>
            <Box h='100vh'>
              <Flex
                minH='calc(100vh - 66px)' // Footer h 473; Header h 66
                justifyContent='center'
                flexDir='column'
              >
                <Header />
                <Component {...pageProps} />
              </Flex>
            </Box>
          </OracleProvider>
        </ReactQueryProvider>
      </WalletConnectionProvider>
    </ThemeContextProvider>
  );
}
