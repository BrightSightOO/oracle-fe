import { MainColorSet } from '@/theme/types';
import { Text, VStack, useTheme } from '@chakra-ui/react';

const DrawerTextData = ({ description }: { description: string }) => {
  const { colors } = useTheme();
  const { black } = colors as MainColorSet;

  return (
    <VStack px='28px' alignItems='flex-start'>
      <Text textStyle='H5' fontWeight='700' my='16px'>
        Additional Text Data
      </Text>
      <Text textStyle='Body' fontWeight='700' color={black}>
        Description
      </Text>
      <Text textStyle='Body' color={black} wordBreak='break-word'>
        {description}
      </Text>
    </VStack>
  );
};

export default DrawerTextData;
