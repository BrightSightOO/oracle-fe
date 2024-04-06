import {
  Box,
  Divider,
  Flex,
  HStack,
  Td,
  Text,
  Tr,
  Image,
  VStack,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowRight,
  faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons';
import { iOracle } from '@/types/table';
import { MainColorSet } from '@/theme/types';
import DrawerWrapper from '../Drawer/DrawerWrapper';
import { formatLongDate } from '@/utils/time';
import { amountToString } from '@metaplex-foundation/umi';

const TableRowCardMobile = ({
  row,
  bodyInfo,
}: {
  row: iOracle;
  bodyInfo: Record<string, string>[];
}) => {
  const { colors } = useTheme();
  const { textGrey, black, bluePrimary, background } = colors as MainColorSet;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const displayQueryData = (data: iOracle) => {
    const formattedDate = formatLongDate.format(
      Number(data.requestedTime * 1000n),
    );

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
            {formattedDate}
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
              <Image
                width='16px'
                height='16px'
                src={'assets/common/usdc_logo.svg'}
              />
              <Text>
                {info.title in row ? amountToString(row[info.title], 3) : null}
              </Text>
            </HStack>
          </HStack>,
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
              {info.title in row
                ? // @ts-ignore - w/o/e refactor row
                  row[info.title]
                : null}
            </Text>
          </HStack>,
        );
      }
    }
    return elementsToRender;
  };

  return (
    <>
      <DrawerWrapper data={row} isOpen={isOpen} onClose={onClose} />
      <Tr cursor='pointer' onClick={onOpen}>
        <VStack w='full'>
          <Td px='20px' py='20px' w='full' style={{ width: 'full' }}>
            <>
              <VStack w='full'>{renderTableData()}</VStack>
            </>
          </Td>
          <Box w='full' h='10px' bg={background} />
        </VStack>
      </Tr>
    </>
  );
};

export default TableRowCardMobile;
