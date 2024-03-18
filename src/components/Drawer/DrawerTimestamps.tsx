import { MainColorSet } from '@/theme/types';
import { Text, VStack, useTheme } from '@chakra-ui/react';

const DrawerTimestamps = ({
  requestedTime,
  settledTime,
}: {
  requestedTime: string | undefined;
  settledTime: string | undefined;
}) => {
  const { colors } = useTheme();
  const { black } = colors as MainColorSet;

  return (
    <VStack px='28px' alignItems='flex-start'>
      <Text textStyle='H5' fontWeight='700' mb='10px'>
        Timestamp
      </Text>
      {requestedTime && (
        <VStack alignItems='flex-start'>
          <Text textStyle='Body' fontWeight='700' color={black}>
            Requested Time
          </Text>
          <Text textStyle='Body' color={black}>
            UTC: {requestedTime}
          </Text>
          <Text textStyle='Body' color={black}>
            UNIX: {requestedTime}
          </Text>
        </VStack>
      )}
      {settledTime && (
        <VStack alignItems='flex-start'>
          <Text textStyle='Body' fontWeight='700' color={black}>
            Settled Time
          </Text>
          <Text textStyle='Body' color={black}>
            UTC: {settledTime}
          </Text>
          <Text textStyle='Body' color={black}>
            UNIX: {settledTime}
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default DrawerTimestamps;
