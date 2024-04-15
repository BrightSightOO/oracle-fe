import { MainColorSet } from '@/theme/types';
import { formatLongDate } from '@/utils/time';
import { Text, VStack, useTheme } from '@chakra-ui/react';

const DrawerTimestamps = ({
  requestedTime,
  assertedTime,
  expirationTime,
  resolvedTime,
}: {
  requestedTime: bigint;
  assertedTime: bigint | undefined;
  expirationTime: bigint | undefined;
  resolvedTime: bigint | undefined;
}) => {
  const { colors } = useTheme();
  const { black } = colors as MainColorSet;

  return (
    <VStack px='28px' alignItems='flex-start'>
      <Text textStyle='H5' fontWeight='700' mb='2'>
        Timestamp
      </Text>
      <VStack gap='2'>
        {[
          { ts: requestedTime, label: 'Requested Time' },
          { ts: assertedTime, label: 'Asserted Time' },
          { ts: expirationTime, label: 'Expiration Time' },
          { ts: resolvedTime, label: 'Resolved Time' },
        ].map(({ label, ts }) => {
          return ts ? (
            <VStack key={label} alignItems='flex-start' gap='1'>
              <Text textStyle='Body' fontWeight='700' color={black}>
                {label}
              </Text>
              <Text textStyle='Body' color={black}>
                {formatLongDate.format(Number(ts * 1000n))}
              </Text>
            </VStack>
          ) : null;
        })}
      </VStack>
    </VStack>
  );
};

export default DrawerTimestamps;
