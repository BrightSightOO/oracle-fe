import type { Metadata } from 'next';
import './globals.css';
import { ThemeContextProvider } from '@/context/ThemeProvider';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';
import WalletConnectionProvider from '@/context/WalletConnectionProvider';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Optimistic Oracle',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              {children}
            </Flex>
          </Box>
        </ReactQueryProvider>
      </WalletConnectionProvider>
    </ThemeContextProvider>
  );
}
