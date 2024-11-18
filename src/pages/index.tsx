import Requests from '@/components/Requests';
import Stake from '@/components/Stake';
import StakingBottomSheet from '@/components/Stake/StakingBottomSheet';
import { MainColorSet } from '@/theme/types';
import { HStack, Show, useDisclosure, useTheme } from '@chakra-ui/react';
import Head from 'next/script';

export default function Home() {
  const { colors } = useTheme();
  const { backgroundMain } = colors as MainColorSet;

  const stakeModal = useDisclosure();

  return (
    <HStack
      w='full'
      mx='auto'
      px={{ base: '16px', md: '36px' }}
      bg={backgroundMain}
      align='start'
      justify='flex-start'
    >
      <Head id='BrightSight'>
        <title>BrightSight - Home</title>
      </Head>
      <HStack
        w='full'
        mx='auto'
        maxW='1512px'
        py='50px'
        gap={10}
        justifyContent='space-between'
      >
        <Requests stakingToggle={stakeModal.onToggle} />
        <Show above='md'>
          <Stake />
        </Show>
        <Show below='md'>
          <StakingBottomSheet
            isOpen={stakeModal.isOpen}
            onClose={stakeModal.onClose}
          />
        </Show>
      </HStack>
    </HStack>
  );
}
