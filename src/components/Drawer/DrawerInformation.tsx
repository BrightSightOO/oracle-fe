import { MainColorSet } from '@/theme/types';
import { iOracle } from '@/types/table';
import { Text, VStack, chakra, useTheme } from '@chakra-ui/react';

const DrawerInfoText = chakra(Text, {
  baseStyle: {
    textStyle: 'Body',
    overflowWrap: 'break-word',
    maxW: '480px',
    w: 'full',
  },
});

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
            Request Account
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
            Request creator
          </DrawerInfoText>
          <DrawerInfoText color={bluePrimary}>{data.creator}</DrawerInfoText>
        </VStack>
      )}
    </VStack>
  );
};

export default DrawerInformation;
