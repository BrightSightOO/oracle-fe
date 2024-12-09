import { MainColorSet } from '@/theme/types';
import { Flex, HStack, Text, VStack, useTheme } from '@chakra-ui/react';
import { faEarthAmericas, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';

const PageHeader = ({
  headerText,
  children,
}: {
  headerText: string;
  children?: ReactNode;
}) => {
  const { colors } = useTheme();
  const { white, black } = colors as MainColorSet;

  return (
    <Flex w='full' bg={black}>
      <VStack mx='auto' px='16px' maxW='1144px' minW='343px' w='full'>
        <VStack bg={black} w='full' pb='40px'>
          <HStack my='20px' w='full' justifyContent='flex-start'>
            <Flex mr='10px'>
              <FontAwesomeIcon
                icon={faMoneyBillTransfer}
                width='54px'
                color={white}
              />
            </Flex>
            <Text
              textStyle='H1'
              color={white}
              fontSize={`clamp(2.5rem, 2rem + 2.5vw, 4rem)`}
            >
              {headerText}
            </Text>
          </HStack>
          {children}
        </VStack>
      </VStack>
    </Flex>
  );
};

export default PageHeader;
