import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpoint,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { iOracle } from '@/types/table';
import { useMemo, useState } from 'react';
import TableRowCardMobile from './TableRowCardMobile';
import TableRowCard from './TableRowCard';
import DrawerWrapper from '../Drawer/DrawerWrapper';

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
  const [dataSelected, setDataSelected] = useState<iOracle>();

  const drawer = useDisclosure();
  const info = useMemo(() => {
    return breakpoint === 'sm' ? [headerInfo[0]] : headerInfo;
  }, [breakpoint]);

  return (
    <>
      {dataSelected ? (
        <DrawerWrapper
          data={dataSelected}
          isOpen={drawer.isOpen}
          onClose={() => {
            drawer.onClose();
            setDataSelected(undefined);
          }}
        />
      ) : null}
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
                  <TableRowCardMobile
                    key={idx}
                    row={row}
                    bodyInfo={bodyInfo}
                    onDrawerOpen={() => {
                      setDataSelected(row);
                      drawer.onOpen();
                    }}
                  />
                );
              } else {
                return (
                  <TableRowCard
                    key={idx}
                    row={row}
                    bodyInfo={bodyInfo}
                    onDrawerOpen={() => {
                      setDataSelected(row);
                      drawer.onOpen();
                    }}
                  />
                );
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableWrapper;
