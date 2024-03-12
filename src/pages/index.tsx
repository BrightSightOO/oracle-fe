import { Flex, useTheme } from '@chakra-ui/react';
import { MainColorSet } from '@/theme/types';
import Head from 'next/script';
import Proposals from '@/components/Proposals/Proposals';

export default function Home() {
  const { colors } = useTheme();
  const { backgroundMain } = colors as MainColorSet;

  return (
    <>
      <Head id='Optimistic Oracle'>
        <title>Optimistic Oracle</title>
      </Head>
      <Flex mx='auto' flexDir='column' w='100%' bg={backgroundMain}>
        <Proposals />
      </Flex>
    </>
  );
}
