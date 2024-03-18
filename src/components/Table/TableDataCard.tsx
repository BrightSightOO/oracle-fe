import {
  Divider,
  Flex,
  HStack,
  Td,
  Text,
  Tr,
  VStack,
  chakra,
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

const TableData = chakra(Td, {
  baseStyle: {
    px: '20px',
    py: '1px',
    w: 'full',
    h: '80px',
  },
});

const TableDataCard = ({
  row,
  bodyInfo,
}: {
  row: OracleType;
  bodyInfo: Record<string, string>[];
}) => {
  const { colors } = useTheme();
  const { textGrey, black, bluePrimary } = colors as MainColorSet;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const displayQueryData = (data: OracleType, idx: number) => {
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
                {data.dateCreated}
              </Text>
              <Divider orientation='vertical' bg={textGrey} />
            </HStack>
          </VStack>
        </HStack>
      </TableData>
    );
  };
  return (
    <Tr cursor='pointer' onClick={onOpen}>
      <ProposalDrawer data={row} isOpen={isOpen} onClose={onClose} />
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
                <USDCLogo width='16px' height='16px' />
                <Text>{info.title in row ? row[info.title] : null}</Text>
              </HStack>
            </TableData>
          );
        }

        if (info.title === 'title') {
          return displayQueryData(row as OracleType, idx);
        }
        return (
          <TableData key={idx} style={{ maxWidth: info.maxW || 'fit-content' }}>
            <Text
              whiteSpace='wrap'
              overflow='hidden'
              textOverflow='ellipsis'
              noOfLines={2}
              maxW={info.maxW || 'fit-content'}
            >
              {info.title in row ? row[info.title as keyof OracleType] : null}
            </Text>
          </TableData>
        );
      })}
    </Tr>
  );
};

export default TableDataCard;
