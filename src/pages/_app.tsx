import type { AppProps } from 'next/app';
import { ThemeContextProvider } from '@/context/ThemeProvider';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';
import WalletConnectionProvider from '@/context/WalletConnectionProvider';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import { useState } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [favicon, setFavicon] = useState('/favicon-light.ico');

  return (
    <ThemeContextProvider>
      <Head>
        <link rel='icon' href={favicon} />
        <title>Hedgehog Markets</title>
        <script src='https://terminal.jup.ag/main-v2.js' />
      </Head>
      <WalletConnectionProvider>
        <ReactQueryProvider>
          <Box h='100vh'>
            <Flex
              minH='calc(100vh)' // Footer h 473; Header h 66
              justifyContent='center'
            >
              <Component {...pageProps} />
            </Flex>
          </Box>
        </ReactQueryProvider>
      </WalletConnectionProvider>
    </ThemeContextProvider>
  );
}
