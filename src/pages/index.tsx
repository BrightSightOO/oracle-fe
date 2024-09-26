import { Box, Text, Flex, HStack, useTheme, VStack } from '@chakra-ui/react';
import { MainColorSet } from '@/theme/types';
import Head from 'next/script';
import PageHeader from '@/components/PageHeader/PageHeader';
import ProposalTable from '@/components/Proposals/ProposalTable';

const CONTENT_COPY = [
  'Data consumers post reward bounties in return for data.',
  'Proposers can post a bond to answer a data request.',
  'If a proposal goes unchallenged, the proposer receives the reward.',
];

export default function Home() {
  const { colors } = useTheme();
  const { background, white, black, backgroundMain } = colors as MainColorSet;

  return (
    <Flex mx='auto' flexDir='column' w='100%' bg={backgroundMain}>
      <Head id='Bright Sight'>
        <title>Bright Sight</title>
      </Head>
      <Flex mx='auto' flexDir='column' w='100%' h='100vh' bg={backgroundMain}>
        <PageHeader headerText='Propose data, earn rewards!'>
          {/* <Flex
            justifyContent='space-between'
            flexDir={{ base: 'column', md2: 'row' }}
            w='full'
            px='32px'
            py='24px'
            gap='8px'
            bg='#2D2A2F'
          >
            {CONTENT_COPY.map((item, idx) => {
              return (
                <HStack key={idx}>
                  <Flex alignItems='flex-start' h='full'>
                    <Box w='24px' h='24px' bg={white} borderRadius='50%'>
                      <Text
                        textStyle='H6'
                        fontWeight='700'
                        color={black}
                        textAlign='center'
                      >
                        {idx + 1}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex
                    alignItems='flex-start'
                    maxW={{ base: 'full', md2: '270px' }}
                    h='full'
                  >
                    <Text textStyle='Body' color={white}>
                      {item}
                    </Text>
                  </Flex>
                </HStack>
              );
            })}
          </Flex> */}
        </PageHeader>
        {/* <Flex w='full' bg={white}>
        <Flex mx='auto' px='16px' maxW='1144px' minW='343px' w='full'>
          <Search />
        </Flex>
      </Flex> */}
        <Flex w='full' pb='64px' bg={background}>
          <VStack mx='auto' maxW='1144px' minW='343px' w='full'>
            <ProposalTable />
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
