import PageHeader from '@/components/PageHeader/PageHeader';
import Search from '@/components/Search/Search';
import CurrentVotesTable from '@/components/Vote/CurrentVotesTable';
import PastVotesTable from '@/components/Vote/PastVotesTable';
import { MainColorSet } from '@/theme/types';
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react';

const content = [
  {
    mainText: 'Stake SOL',
    secondaryText: 'You are staking 0 of your 0 UMA tokens.',
    actionText: 'Stake',
  },
  {
    mainText: 'Vote',
    secondaryText: 'You have voted in 0 votes, and are earning 0% APR.',
    actionText: 'Vote history',
  },
  {
    mainText: 'Get rewards',
    secondaryText: 'Your unclaimed UMA rewards: 0',
    actionText: 'Claim',
  },
];

const VoteHome = () => {
  const { colors } = useTheme();
  const { black, white, background, backgroundMain, bluePrimary } =
    colors as MainColorSet;

  return (
    <Flex mx='auto' flexDir='column' w='100%' h='100vh' bg={backgroundMain}>
      <PageHeader headerText='Stake, vote & earn up to 33% APR' />
      <Flex w='full' bg={white}>
        <VStack
          mx='auto'
          px='16px'
          py='30px'
          maxW='1144px'
          minW='343px'
          w='full'
          alignItems='flex-start'
        >
          <Text textStyle='H4' color={black} fontWeight='700' mb='20px'>
            How it works:
          </Text>
          {content.map((step, idx) => {
            return (
              <Flex
                key={step.mainText}
                w='full'
                bg={background}
                flexDir={{ base: 'column', sm: 'row' }}
                minH='50px'
              >
                <HStack
                  alignItems='center'
                  alignContent='center'
                  justifyItems='center'
                  maxW={{ base: '100%', sm: '160px' }}
                  w='full'
                  bg={black}
                  px='16px'
                >
                  <Flex alignItems='center'>
                    <Box w='22px' h='22px' bg={white} borderRadius='50%'>
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

                  <Text textStyle='H6' color={white} ml='10px'>
                    {step.mainText}
                  </Text>
                </HStack>
                <Flex alignItems='center' flex={1}>
                  <Text textStyle='H6' ml='16px'>
                    {step.secondaryText}
                  </Text>
                </Flex>
                <Flex alignItems='center'>
                  <Button
                    variant='unstyled'
                    color={bluePrimary}
                    bg={background}
                    px='16px'
                  >
                    {step.actionText}
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </VStack>
      </Flex>
      <Flex w='full' pb='64px' bg={background} py='30px'>
        <Flex mx='auto' maxW='1144px' minW='343px' w='full' flexDir='column'>
          <Text textStyle='H4' color={black} fontWeight='700' pl='8px'>
            Current votes:
          </Text>
          <CurrentVotesTable />
        </Flex>
      </Flex>
      <Flex w='full' pb='64px' bg={background} py='30px'>
        <Flex mx='auto' maxW='1144px' minW='343px' w='full' flexDir='column'>
          <Text textStyle='H4' color={black} fontWeight='700' pl='8px'>
            Past votes:
          </Text>
          <PastVotesTable />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VoteHome;
