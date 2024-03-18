import {
  Box,
  Divider,
  Flex,
  HStack,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import ProposalDrawer from '../Proposals/ProposalDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowRight,
  faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons';
import USDCLogo from '../Svg/USDCLogo';
import { OracleType } from '@/types/tableData';
import { MainColorSet } from '@/theme/types';

const TableDataCardMobile = ({
  row,
  bodyInfo,
}: {
  row: OracleType;
  bodyInfo: Record<string, string>[];
}) => {
  const { colors } = useTheme();
  const { textGrey, black, bluePrimary, background } = colors as MainColorSet;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const displayQueryData = (data: OracleType) => {
    return (
      <VStack w='full'>
        <HStack w='full' justifyContent='space-between'>
          <HStack maxW='90%'>
            <Flex mr='5px'>
              <FontAwesomeIcon
                icon={faEarthAmericas}
                width='18px'
                height='18px'
              />
              <Text
                textStyle='Body'
                color={black}
                fontWeight='700'
                whiteSpace='wrap'
                overflow='hidden'
                textOverflow='ellipsis'
                noOfLines={2}
                w='full'
              >
                {data.title}
              </Text>
            </Flex>
          </HStack>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            cursor='pointer'
            color={bluePrimary}
            style={{
              width: '24px',
            }}
          />
        </HStack>
        <HStack w='full' justifyContent='flex-start'>
          <Text textStyle='Body' fontSize='12px' color={textGrey}>
            {data.chain}
          </Text>
          <Text textStyle='Body' fontSize='12px' color={textGrey}>
            {data.dateCreated}
          </Text>
          <Divider orientation='vertical' bg={textGrey} />
        </HStack>
        <Divider w='full' />
      </VStack>
    );
  };

  const renderTableData = () => {
    const elementsToRender = [];
    for (const info of bodyInfo) {
      if (info.title === '') {
        continue;
      } else if (info.title === 'bond' || info.title === 'reward') {
        elementsToRender.push(
          <HStack w='full' justifyContent='space-between' alignItems='center'>
            <Text textStyle='NavLink'>
              {info.title.charAt(0).toUpperCase() + info.title.slice(1)}
            </Text>
            <HStack>
              <USDCLogo width='16px' height='16px' />
              <Text>
                {info.title in row ? row[info.title as keyof OracleType] : null}
              </Text>
            </HStack>
          </HStack>
        );
      } else if (info.title === 'title') {
        elementsToRender.push(displayQueryData(row));
      } else {
        elementsToRender.push(
          <HStack w='full' justifyContent='space-between' alignItems='center'>
            <Text textStyle='NavLink'>
              {info.title.charAt(0).toUpperCase() + info.title.slice(1)}
            </Text>
            <Text
              whiteSpace='wrap'
              overflow='hidden'
              textOverflow='ellipsis'
              noOfLines={2}
              maxW={info.maxW || 'fit-content'}
            >
              {info.title in row ? row[info.title as keyof OracleType] : null}
            </Text>
          </HStack>
        );
      }
    }
    return elementsToRender;
  };

  return (
    <Tr cursor='pointer' onClick={onOpen}>
      <ProposalDrawer data={row} isOpen={isOpen} onClose={onClose} />
      <VStack w='full'>
        <Td px='20px' py='20px' w='full' style={{ width: 'full' }}>
          <>
            <VStack w='full'>{renderTableData()}</VStack>
          </>
        </Td>
        <Box w='full' h='10px' bg={background} />
      </VStack>
    </Tr>
  );
};

export default TableDataCardMobile;
