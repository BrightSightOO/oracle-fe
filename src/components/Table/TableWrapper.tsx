import { Table, TableContainer, useTheme } from '@chakra-ui/react';
import TableHeader from './TableHeader';
import { OracleType } from '@/types/tableData';
import TableBody from './TableBody';

const TableWrapper = ({
  data,
  headerInfo,
  bodyInfo,
  variant = 'simple',
}: {
  data: OracleType[];
  headerInfo: Record<string, string>[];
  bodyInfo: Record<string, string>[];
  variant?: 'simple' | 'striped' | 'unstyled';
}) => {
  const { customScroll } = useTheme();

  return (
    <TableContainer w='full' maxH='800px' overflowY='auto' css={customScroll}>
      <Table variant={variant}>
        <TableHeader headerInfo={headerInfo} />
        <TableBody data={data} bodyInfo={bodyInfo} />
      </Table>
    </TableContainer>
  );
};

export default TableWrapper;
