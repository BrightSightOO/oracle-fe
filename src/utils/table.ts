import { TableDataEnum } from "@/types/table";

export const tableDataType = ({
  settled,
  requester,
  voteStatus,
}: {
  settled: string | null | undefined;
  requester: string | undefined;
  voteStatus: string | null | undefined;
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
