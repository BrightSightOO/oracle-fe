import { VStack } from '@chakra-ui/react';
import TableWrapper from '../Table/TableWrapper';
import { data } from '@/data';

const headerInfo = [
  { title: 'Query', maxW: '634px' },
  { title: 'Type', maxW: '211px' },
  { title: 'Bond', maxW: '111px' },
  { title: 'Reward', maxW: '108px' },
  { title: '', maxW: '70px' },
];
const bodyInfo = [
  { title: 'title', maxW: '634px' },
  { title: 'type', maxW: '211px' },
  { title: 'bond', maxW: '111px' },
  { title: 'reward', maxW: '108px' },
  { title: '', maxW: '70px' },
];

const ProposalTable = () => {
  return (
    <VStack w='full' pt='20px' px='8px'>
      <TableWrapper
        data={data}
        variant='simple'
        headerInfo={headerInfo}
        bodyInfo={bodyInfo}
      />
    </VStack>
  );
};

export default ProposalTable;
