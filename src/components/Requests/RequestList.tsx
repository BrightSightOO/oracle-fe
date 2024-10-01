import { shortDateYear } from '@/utils/time';
import { VStack } from '@chakra-ui/react';
import { RequestStatus } from '.';
import RequestCard from './RequestCard';

type MarketInfo = {
	id: string;
	closingDate: Date;
	status: RequestStatus;
	title: string;
	description: string;
	bond: number;
	reward: number;
	disputeDate: Date;
	answer: string[] | null;
	disputed: string | null;
	disputedVoted: string | null;
	resultFromVote: string | null;
	options: string[];
};

const RequestList = ({ data }: { data: MarketInfo[] }) => {
	const renderRequestCard = (request: MarketInfo) => {
		if (!request) return null;
		const closingDate = shortDateYear.format(request.closingDate);
		const disputeDate = shortDateYear.format(request.disputeDate);

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
		<VStack w='full'>
			{data ? data.map((request) => renderRequestCard(request)) : null}
		</VStack>
	);
};

export default RequestList;
