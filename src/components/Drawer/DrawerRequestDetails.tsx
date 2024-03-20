import {
  Button,
  HStack,
  Select,
  Text,
  Tooltip,
  VStack,
  useTheme,
} from '@chakra-ui/react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import USDCLogo from '../Svg/USDCLogo';
import { useState } from 'react';
import { MainColorSet } from '@/theme/types';
import { OracleType, TableDataEnum } from '@/types/tableData';

const DrawerRequestDetails = ({
  data,
  dataType,
}: {
  data: OracleType;
  dataType: TableDataEnum;
}) => {
  const { colors } = useTheme();
  const { bluePrimary, white, black, background } = colors as MainColorSet;

  const [requestOption, setRequestOption] = useState('');

  return (
    <VStack bg={background} alignItems='flex-start' px='28px' py='24px'>
      <Text textStyle='H5' fontWeight='700'>
        Request (price)
      </Text>
      {data.request && (
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
      )}
      {data.settled && <Text textStyle='H5'>{data.settled}</Text>}

      {data.bond && (
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
      )}
      {data.reward && (
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
      )}
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
      {dataType === TableDataEnum.Proposal && (
        <Button
          w='full'
          h='50px'
          color={white}
          bg={bluePrimary}
          borderRadius='4px'
        >
          Connect wallet
        </Button>
      )}
    </VStack>
  );
};

export default DrawerRequestDetails;
