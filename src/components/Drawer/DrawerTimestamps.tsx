import { MainColorSet } from '@/theme/types';
import { formatLongDate } from '@/utils/time';
import { Text, VStack, useTheme } from '@chakra-ui/react';

const DrawerTimestamps = ({
  requestedTime,
  expirationTime,
  resolvedTime,
}: {
  requestedTime: bigint;
  expirationTime: bigint | undefined;
  resolvedTime: bigint | undefined;
}) => {
  const { colors } = useTheme();
  const { black } = colors as MainColorSet;

  return (
    <VStack px='28px' alignItems='flex-start'>
      <Text textStyle='H5' fontWeight='700' mb='10px'>
        Timestamp
      </Text>
      {requestedTime ? (
        <VStack alignItems='flex-start'>
          <Text textStyle='Body' fontWeight='700' color={black}>
            Requested Time
          </Text>
          <Text textStyle='Body' color={black}>
            {formatLongDate.format(Number(requestedTime * 1000n))}
          </Text>
        </VStack>
      ) : null}
      {expirationTime ? (
        <VStack alignItems='flex-start'>
          <Text textStyle='Body' fontWeight='700' color={black}>
            Expiration Time
          </Text>
          <Text textStyle='Body' color={black}>
            {formatLongDate.format(Number(expirationTime * 1000n))}
          </Text>
        </VStack>
      ) : null}
      {resolvedTime ? (
        <VStack alignItems='flex-start'>
          <Text textStyle='Body' fontWeight='700' color={black}>
            Resolved Time
          </Text>
          <Text textStyle='Body' color={black}>
            {formatLongDate.format(Number(resolvedTime * 1000n))}
          </Text>
        </VStack>
      ) : null}
    </VStack>
  );
};

export default DrawerTimestamps;
