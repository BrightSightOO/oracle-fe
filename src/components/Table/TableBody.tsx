import { MainColorSet } from '@/theme/types';
import { ProposalType } from '@/types/proposals';
import { Show, Tbody, useTheme } from '@chakra-ui/react';
import TableDataCard from './TableDataCard';
import TableDataCardMobile from './TableDataCardMobile';

const TableBody = ({
  data,
  bodyInfo,
}: {
  data: ProposalType[];
  bodyInfo: Record<string, string>[];
}) => {
  const { colors } = useTheme();
  const { white } = colors as MainColorSet;

  return (
    <Tbody bg={white}>
      <Show above='sm'>
        {data.map((row, idx) => (
          <TableDataCard key={idx} row={row} bodyInfo={bodyInfo} />
        ))}
      </Show>
      <Show below='sm'>
        {data.map((row, idx) => (
          <TableDataCardMobile key={idx} row={row} bodyInfo={bodyInfo} />
        ))}
      </Show>
    </Tbody>
  );
};

export default TableBody;
