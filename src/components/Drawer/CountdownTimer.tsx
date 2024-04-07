import { useEffect, useState } from 'react';
import { BoxProps, HStack, Text, VStack } from '@chakra-ui/react';
import {
  DAYS_SECONDS,
  HOURS_SECONDS,
  MINUTES_SECONDS,
  SECONDS_MS,
} from '@/constants/time';

function padTime(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function countdownTime(timestamp: number) {
  const now = Date.now() / SECONDS_MS;

  let remaining = timestamp - now;
  if (remaining < 0) {
    return [0, 0, 0, 0];
  }

  const days = Math.floor(remaining / DAYS_SECONDS);
  remaining %= DAYS_SECONDS;
  const hours = Math.floor(remaining / HOURS_SECONDS);
  remaining %= HOURS_SECONDS;
  const minutes = Math.floor(remaining / MINUTES_SECONDS);
  remaining %= MINUTES_SECONDS;
  const seconds = Math.floor(remaining % MINUTES_SECONDS);

  return [days, padTime(hours), padTime(minutes), padTime(seconds)];
}

interface CountdownTimerProps {
  endTs: number;
}
const caption = ['days', 'hrs', 'mins', 'secs'];

export default function CountdownTimer({ endTs }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<(number | string)[]>([0, 0, 0, 0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeList = countdownTime(endTs);
      setCountdown(timeList);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [endTs]);

  return (
    <>
      {countdown.map((val, idx) => (
        <HStack spacing={0.25} key={idx} gap={1}>
          <Text color='inherit' textStyle='H5' fontSize='16px'>
            {val}
          </Text>
          <Text color='inherit' textStyle='H5' fontSize='12px' fontWeight='400'>
            {caption[idx]}
          </Text>
        </HStack>
      ))}
    </>
  );
}
