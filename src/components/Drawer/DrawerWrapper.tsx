import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react';
import { MainColorSet } from '@/theme/types';
import { iOracle } from '@/types/table';
import DrawerRequestDetails from './DrawerRequestDetails';
import DrawerTimestamps from './DrawerTimestamps';
import DrawerTextData from './DrawerTextData';
import DrawerInformation from './DrawerInformation';

const DrawerWrapper = ({
  data,
  isOpen,
  onClose,
}: {
  data: iOracle;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { colors } = useTheme();
  const { white, black } = colors as MainColorSet;

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent minW={{ base: 'full', sm: '553px' }} w='full'>
        <HStack w='full' bg={black} justifyContent='flex-start'>
          <DrawerCloseButton bg={white} />
          <DrawerHeader color={white} w='full'>
            <Text
              minW={{ base: '300px', sm: '470px' }}
              maxW='470px'
              w='full'
              whiteSpace='wrap'
              noOfLines={2}
            >
              {data.title}
            </Text>
          </DrawerHeader>
        </HStack>
        <DrawerBody px='0'>
          <DrawerRequestDetails data={data} />
          <DrawerTimestamps
            requestedTime={data.requestedTime}
            expirationTime={data.expirationTime}
            resolvedTime={data.resolvedTime}
          />
          <VStack pb='64px'>
            <DrawerTextData description={data.description} />
            <DrawerInformation data={data} />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapper;
