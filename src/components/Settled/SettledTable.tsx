import { VStack } from '@chakra-ui/react';
import TableWrapper from '../Table/TableWrapper';
import { settledData } from '@/data';

const headerInfo = [
  { title: 'Query', maxW: '728px' },
  { title: 'Type', maxW: '211px' },
  { title: 'Settled as', maxW: '127px' },
  { title: '', maxW: '70px' },
];
const bodyInfo = [
  { title: 'title', maxW: '728px' },
  { title: 'type', maxW: '211px' },
  { title: 'settled', maxW: '127px' },
  { title: '', maxW: '70px' },
];

const SettledTable = () => {
  return (
    <VStack w='full' pt='20px' px='8px'>
      <TableWrapper
        data={settledData}
        variant='simple'
        headerInfo={headerInfo}
        bodyInfo={bodyInfo}
      />
    </VStack>
  );
};

export default SettledTable;
