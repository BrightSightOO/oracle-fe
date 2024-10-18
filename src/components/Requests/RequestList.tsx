import { shortDateFmt } from "@/utils/time";
import { VStack } from "@chakra-ui/react";
import { RequestStatus } from ".";
import RequestCard from "./RequestCard";
import { FC } from "react";

const RequestList: FC<{ status: RequestStatus }> = ({ status }) => {
  

  const renderRequestCard = (request: MarketInfo) => {
    if (!request) return null;
    const closingDate = shortDateFmt.format(request.closingDate);
    const disputeDate = shortDateFmt.format(request.disputeDate);

    return (
      <RequestCard
        key={request.id}
        status={request.status}
        title={request.title}
        description={request.description}
        bond={request.bond}
        reward={request.reward}
        closingDate={closingDate}
        disputeDate={disputeDate}
        answer={request.answer || null}
        disputed={request.disputed || null}
        disputedVoted={request.disputedVoted || null}
        resultFromVote={request.resultFromVote || null}
        options={request.options}
      />
    );
  };

  return (
    <VStack w="full">{data ? data.map((request) => renderRequestCard(request)) : null}</VStack>
  );
};

export default RequestList;
