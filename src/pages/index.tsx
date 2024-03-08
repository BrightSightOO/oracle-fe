import { Flex, Text, useTheme } from '@chakra-ui/react';
import { MainColorSet } from '@/theme/types';
import Head from 'next/script';

export default function Home() {
  const { colors } = useTheme();
  const { backgroundMain, textPrimary } = colors as MainColorSet;

  return (
    <>
      <Head>
        <title>Optimistic Oracle</title>
      </Head>
      <Flex
        mx='auto'
        flexDir='column'
        justifyContent='center'
        w='100%'
        bg={backgroundMain}
      >
        <Text>Hello</Text>
      </Flex>
    </>
  );
}
