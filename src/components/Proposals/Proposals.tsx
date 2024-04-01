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
    text: 'If a proposal goes unchallenged, the proposer receives the reward.',
  },
];

const Proposals = () => {
  const { colors } = useTheme();
  const { background, white, black, backgroundMain } = colors as MainColorSet;

  return (
    <Flex mx='auto' flexDir='column' w='100%' h='100vh' bg={backgroundMain}>
      <PageHeader headerText='Propose data, earn rewards!'>
       
      </PageHeader>
      <Flex w='full' bg={white}>
        <Flex mx='auto' px='16px' maxW='1144px' minW='343px' w='full'>
          <Search />
        </Flex>
      </Flex>
      <Flex w='full' pb='64px' bg={background}>
        <Flex mx='auto' maxW='1144px' minW='343px' w='full'>
          <ProposalTable />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Proposals;
