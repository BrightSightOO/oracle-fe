import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Select,
  Text,
  Tooltip,
  VStack,
  useTheme,
} from '@chakra-ui/react';
import { MainColorSet } from '@/theme/types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import USDCLogo from '../Svg/USDCLogo';
import { ProposalType } from '@/types/proposals';

const ProposalDrawer = ({
  data,
  isOpen,
  onClose,
}: {
  data: ProposalType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { colors } = useTheme();
  const { bluePrimary, white, black, background } = colors as MainColorSet;

  const [requestOption, setRequestOption] = useState('');

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
            >
              {data.title}
            </Text>
          </DrawerHeader>
        </HStack>
        <DrawerBody px='0'>
          <VStack bg={background} alignItems='flex-start' px='28px' py='24px'>
            <Text textStyle='H5' fontWeight='700'>
              Request (price)
            </Text>
            <Select placeholder='Select option' bg={white} my='10px'>
              {data.request.map((option, idx) => {
                if (option === requestOption) {
                  return;
                }

                return (
                  <option key={idx} onClick={() => setRequestOption(option)}>
                    {option}
                  </option>
                );
              })}
            </Select>

            <HStack w='full' justifyContent='space-between'>
              <HStack>
                <Text textStyle='Body' color={black}>
                  Bond
                </Text>
                <Tooltip
                  p='20px'
                  label='Every request to Optimistic Oracle includes bond and liveness settings that specify the size of the bond that proposers (and disputers) are required to post.'
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{
                      width: '15px',
                    }}
                    cursor='pointer'
                    border={true}
                  />
                </Tooltip>
              </HStack>
              <HStack>
                <USDCLogo width='16px' height='16px' />
                <Text textStyle='Body' color={black}>
                  {data.bond}
                </Text>
              </HStack>
            </HStack>
            <HStack w='full' justifyContent='space-between'>
              <HStack>
                <Text textStyle='Body' color={black}>
                  Reward
                </Text>
                <Tooltip
                  p='20px'
                  label='Every request to Optimistic Oracle includes reward and liveness settings that specify the size of the bond that proposers (and disputers) are required to post.'
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{
                      width: '15px',
                    }}
                    cursor='pointer'
                    border={true}
                  />
                </Tooltip>
              </HStack>
              <HStack>
                <USDCLogo width='16px' height='16px' />
                <Text textStyle='Body' color={black}>
                  {data.reward}
                </Text>
              </HStack>
            </HStack>
            <HStack w='full' justifyContent='space-between'>
              <HStack>
                <Text textStyle='Body' color={black}>
                  Challenge period ends
                </Text>
                <Tooltip
                  p='20px'
                  label='Every request to Optimistic Oracle includes reward and liveness settings that specify the size of the bond that proposers (and disputers) are required to post.'
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{
                      width: '15px',
                    }}
                    cursor='pointer'
                    border={true}
                  />
                </Tooltip>
              </HStack>
            </HStack>
            {/* TODO: Put in button logic */}
            <Button
              w='full'
              h='50px'
              color={white}
              bg={bluePrimary}
              borderRadius='4px'
            >
              Connect wallet
            </Button>
          </VStack>
          <VStack px='28px' alignItems='flex-start'>
            <Text textStyle='H5' fontWeight='700' mb='10px'>
              Timestamp
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black}>
              Requested Time
            </Text>
            <Text textStyle='Body' color={black}>
              UTC {data.dateCreated}
            </Text>
            <Text textStyle='Body' color={black}>
              UNIX {data.dateCreated}
            </Text>
          </VStack>
          <VStack px='28px' alignItems='flex-start' pb='64px'>
            <Text textStyle='H5' fontWeight='700' my='16px'>
              Additional Text Data
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black}>
              Description
            </Text>
            <Text textStyle='Body' color={black}>
              {data.description}
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black} mt='10px'>
              String
            </Text>
            <Text textStyle='Body' color={black}>
              {data.string}
            </Text>
            <Text textStyle='H5' fontWeight='700' mt='16px'>
              More information
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black} mt='16px'>
              {data.type}
            </Text>
            <Text
              textStyle='Body'
              color={bluePrimary}
              overflowWrap='break-word'
              w='full'
            >
              {data.oracle}
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black} mt='16px'>
              UMIP
            </Text>
            <Text textStyle='Body' color={bluePrimary}>
              {data.umip}
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black} mt='16px'>
              Identifier
            </Text>
            <Text textStyle='Body' color={bluePrimary}>
              {data.identifier}
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black} mt='16px'>
              Requester
            </Text>
            <Text
              textStyle='Body'
              color={bluePrimary}
              overflowWrap='break-word'
              w='full'
            >
              {data.requester}
            </Text>
            <Text textStyle='Body' fontWeight='700' color={black} mt='16px'>
              Request Transaction
            </Text>
            <Text
              textStyle='Body'
              color={bluePrimary}
              overflowWrap='break-word'
              w='full'
            >
              {data.requestTxn}
            </Text>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ProposalDrawer;
