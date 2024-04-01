import { Box, Flex, HStack, Text, useTheme } from '@chakra-ui/react';
import { MainColorSet } from '@/theme/types';
import Search from '@/components/Search/Search';
import ProposalTable from '@/components/Proposals/ProposalTable';
import PageHeader from '../PageHeader/PageHeader';

const content = [
  {
    index: 1,
    text: 'Data consumers post reward bounties in return for data.',
  },
  { index: 2, text: 'Proposers can post a bond to answer a data request.' },
  {
    index: 3,
    text: 'If a proposal goes unchallenged, the proposer receives the reward after liveness.',
  },
];

const Proposals = () => {
  const { colors } = useTheme();
  const { background, white, black, backgroundMain } = colors as MainColorSet;

  return (
    <Flex mx='auto' flexDir='column' w='100%' h='100vh' bg={backgroundMain}>
      <PageHeader headerText='Propose answers to 925 requests'>
        <Flex
          justifyContent='space-between'
          flexDir={{ base: 'column', md2: 'row' }}
          w='full'
          px='32px'
          py='24px'
          gap='8px'
          bg='#2D2A2F'
        >
          {content.map((item, idx) => {
            return (
              <HStack key={idx}>
                <Flex alignItems='flex-start' h='full'>
                  <Box w='22px' h='22px' bg={white} borderRadius='50%'>
                    <Text
                      textStyle='H6'
                      fontWeight='700'
                      color={black}
                      textAlign='center'
                    >
                      {item.index}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  alignItems='flex-start'
                  maxW={{ base: 'full', md2: '270px' }}
                  h='full'
                >
                  <Text textStyle='Body' color={white}>
                    {item.text}
                  </Text>
                </Flex>
              </HStack>
            );
          })}
        </Flex>
      </PageHeader>
      {/* <Flex w='full' bg={white}>
        <Flex mx='auto' px='16px' maxW='1144px' minW='343px' w='full'>
          <Search />
        </Flex>
      </Flex> */}
      <Flex w='full' pb='64px' bg={background}>
        <Flex mx='auto' maxW='1144px' minW='343px' w='full'>
          <ProposalTable />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Proposals;
