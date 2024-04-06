import {
  Divider,
  Flex,
  HStack,
  Td,
  Text,
  Tr,
  VStack,
  Image,
  chakra,
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

const TableData = chakra(Td, {
  baseStyle: {
    px: '20px',
    py: '1px',
    w: 'full',
    h: '80px',
  },
});

const TableRowCard = ({
  row,
  bodyInfo,
}: {
  row: iOracle;
  bodyInfo: Record<string, string>[];
}) => {
  const { colors } = useTheme();
  const { textGrey, black, bluePrimary } = colors as MainColorSet;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const displayQueryData = (data: iOracle, idx: number) => {
    const formattedDate = formatLongDate.format(
      Number(data.requestedTime * 1000n),
    );
    return (
      <TableData key={idx} maxW='634px'>
        <HStack alignItems='center'>
          <Flex mr='5px'>
            <FontAwesomeIcon
              icon={faEarthAmericas}
              width='40px'
              height='40px'
            />
          </Flex>
          <VStack>
            <Text
              color={black}
              fontWeight='700'
              whiteSpace='wrap'
              overflow='hidden'
              textOverflow='ellipsis'
              noOfLines={2}
              maxW='634px'
            >
              {data.title}
            </Text>
            <HStack w='full' justifyContent='flex-start'>
              <Text textStyle='Body' fontSize='12px' color={textGrey}>
                {data.chain}
              </Text>
              <Text textStyle='Body' fontSize='12px' color={textGrey}>
                {formattedDate}
              </Text>
              <Divider orientation='vertical' bg={textGrey} />
            </HStack>
          </VStack>
        </HStack>
      </TableData>
    );
  };

  return (
    <>
      <DrawerWrapper data={row} isOpen={isOpen} onClose={onClose} />
      <Tr cursor='pointer' onClick={onOpen}>
        {bodyInfo.map((info, idx) => {
          if (info.title === '') {
            return (
              <TableData key={idx} maxW={info.maxW || 'fit-content'}>
                {' '}
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  cursor='pointer'
                  color={bluePrimary}
                  style={{
                    width: '25px',
                  }}
                />
              </TableData>
            );
          }

          if (info.title === 'bond' || info.title === 'reward') {
            return (
              <TableData key={idx} maxW={info.maxW || 'fit-content'}>
                <HStack>
                  <Image
                    width='16px'
                    height='16px'
                    src={'assets/common/usdc_logo.svg'}
                  />
                  <Text>
                    {info.title in row
                      ? amountToString(row[info.title], 3)
                      : null}
                  </Text>
                </HStack>
              </TableData>
            );
          }

          if (info.title === 'title') {
            return displayQueryData(row as iOracle, idx);
          }
          return (
            <TableData
              key={idx}
              style={{ maxWidth: info.maxW || 'fit-content' }}
            >
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
            </TableData>
          );
        })}
      </Tr>
    </>
  );
};

export default TableRowCard;
