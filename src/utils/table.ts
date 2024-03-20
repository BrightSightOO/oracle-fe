import { TableDataEnum } from '@/types/tableData';

export const tableDataType = ({
  settled,
  requester,
  voteStatus,
}: {
  settled: string | undefined;
  requester: string | undefined;
  voteStatus: string | undefined;
}) => {
  if (settled) {
    return TableDataEnum.Settled;
  }

  if (requester) {
    return TableDataEnum.Proposal;
  }

  if (voteStatus) {
    return TableDataEnum.Vote;
  }

  return TableDataEnum.Proposal;
};
