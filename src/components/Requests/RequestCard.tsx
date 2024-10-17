import { AssertionV1, RequestKind, RequestV1, VotingV1 } from "@/program-sdks/oracle";
import { FC } from "react";
import YesNoRequestCard from "./YesNoRequestCard";

export type RequestData = {
  title: string;
  description: string;
};

export type RequestCardProps = {
  request: RequestV1;
  data: RequestData;
};

const RequestCard: FC<RequestCardProps> = (props: RequestCardProps) => {
  switch (props.request.kind) {
    case RequestKind.YesNo:
      return <YesNoRequestCard {...props}></YesNoRequestCard>;

    default:
      throw new Error("Unknown request kind");
  }
};

export default RequestCard;
