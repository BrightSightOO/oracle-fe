import { MainColorSet } from '@/theme/types';
import { iOracle } from '@/types/table';
import { Text, VStack, useTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const DrawerInfoText = ({
  children,
  color,
  fontWeight = '400',
  mt = '0',
}: {
  children: ReactNode;
  color: string;
  fontWeight?: string;
  mt?: string;
}) => {
  return (
    <Text
      textStyle='Body'
      overflowWrap='break-word'
      maxW='480px'
      w='full'
      color={color}
      fontWeight={fontWeight}
      mt={mt}
    >
      {children}
    </Text>
  );
};

const DrawerInformation = ({ data }: { data: iOracle }) => {
  const { colors } = useTheme();
  const { bluePrimary, black } = colors as MainColorSet;

  return (
    <VStack px='28px' w='full' alignItems='flex-start'>
      <Text textStyle='H5' fontWeight='700' mt='16px'>
        More information
      </Text>
      <Text textStyle='Body' fontWeight='700' color={black} mt='16px'>
        {data.oracleType}
      </Text>
      <Text
        textStyle='Body'
        color={bluePrimary}
        overflowWrap='break-word'
        w='full'
      >
        {data.request}
      </Text>

      {data.request && (
        <VStack alignItems='flex-start'>
          <DrawerInfoText fontWeight='700' color={black} mt='16px'>
            Requester
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>{data.request}</DrawerInfoText>
        </VStack>
      )}
      {data.asserter && (
        <VStack alignItems='flex-start'>
          <DrawerInfoText fontWeight='700' color={black} mt='16px'>
            Asserter
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>{data.asserter}</DrawerInfoText>
        </VStack>
      )}
      {data.creator && (
        <VStack alignItems='flex-start'>
          <DrawerInfoText fontWeight='700' color={black} mt='16px'>
            Callback Recipient
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>{data.creator}</DrawerInfoText>
        </VStack>
      )}
      {/* {data.caller && (
        <VStack alignItems='flex-start'>
          <DrawerInfoText fontWeight='700' color={black} mt='16px'>
            Caller
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>{data.caller}</DrawerInfoText>
        </VStack>
      )}
      {data.assertionTxn && (
        <VStack alignItems='flex-start'>
          <DrawerInfoText fontWeight='700' color={black} mt='16px'>
            Assertion Transaction
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>
            {data.assertionTxn}
          </DrawerInfoText>
        </VStack>
      )}
      {data.settlementRecipient && (
        <VStack alignItems='flex-start'>
          <DrawerInfoText fontWeight='700' color={black} mt='16px'>
            Settlement Recipient
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>
            {data.settlementRecipient}
          </DrawerInfoText>
        </VStack>
      )}
      {data.settlementTxn && (
        <VStack alignItems='flex-start'>
          <DrawerInfoText fontWeight='700' color={black} mt='16px'>
            Settlement Transaction
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>
            {data.settlementTxn}
          </DrawerInfoText>
        </VStack>
      )} */}
    </VStack>
  );
};

export default DrawerInformation;
