import { VStack } from '@chakra-ui/react';
import TableWrapper from '../Table/TableWrapper';
import { voteData } from '@/data';
import { useMemo } from 'react';

const CurrentVotesTable = () => {
  const headerInfo = [
    { title: 'Vote', maxW: '728px' },
    { title: 'Your vote', maxW: '211px' },
    { title: 'Vote status', maxW: '127px' },
    { title: '', maxW: '70px' },
  ];
  const bodyInfo = [
    { title: 'title', maxW: '728px' },
    { title: 'voteStatus', maxW: '211px' },
    { title: 'settled', maxW: '127px' },
    { title: '', maxW: '70px' },
  ];

  const filteredData = useMemo(() => {
    return voteData.filter((vote) => !vote.settled);
  }, [voteData]);

  return (
    <VStack w='full' pt='20px' px='8px'>
      <TableWrapper
        data={filteredData}
        variant='simple'
        headerInfo={headerInfo}
        bodyInfo={bodyInfo}
      />
    </VStack>
  );
};

export default CurrentVotesTable;
