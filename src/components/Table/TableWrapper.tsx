import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpoint,
  useTheme,
} from '@chakra-ui/react';
import { iOracle } from '@/types/table';
import { useMemo } from 'react';
import TableRowCardMobile from './TableRowCardMobile';
import TableRowCard from './TableRowCard';

const TableWrapper = ({
  data,
  headerInfo,
  bodyInfo,
  variant = 'simple',
}: {
  data: iOracle[];
  headerInfo: Record<string, string>[];
  bodyInfo: Record<string, string>[];
  variant?: 'simple' | 'striped' | 'unstyled';
}) => {
  const {
    colors: { white },
    customScroll,
  } = useTheme();
  const breakpoint = useBreakpoint();

  const info = useMemo(() => {
    return breakpoint === 'sm' ? [headerInfo[0]] : headerInfo;
  }, [breakpoint]);

  return (
    <TableContainer w='full' overflowY='auto' css={customScroll}>
      <Table variant={variant}>
        <Thead>
          <Tr>
            {info.map((header, idx) => (
              <Th key={idx} maxW={header.maxW || 'fit-content'}>
                {header.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody bg={white}>
          {data.map((row, idx) => {
            if (breakpoint === 'sm') {
              return (
                <TableRowCardMobile key={idx} row={row} bodyInfo={bodyInfo} />
              );
            } else {
              return <TableRowCard key={idx} row={row} bodyInfo={bodyInfo} />;
            }
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableWrapper;
