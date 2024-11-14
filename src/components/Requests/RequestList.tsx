import { getTokenAmount } from '@/constants/mints';
import { useOracleAccounts } from '@/context/OracleProvider';
import { AssertionV1, RequestState, RequestV1, VotingV1, YesNoValue } from '@/program-sdks/oracle';
import { prettyAmount } from '@/utils/amount';
import { formatDate } from '@/utils/time';
import { VStack } from '@chakra-ui/react';
import RequestCard from './RequestCard';

const RequestList = ({ data }: { data: RequestV1[] }) => {
  const { requestToAssertionMap, assertionToVotingMap } = useOracleAccounts();

  const renderRequestCard = (request: RequestV1) => {
    if (!request) return null;

    const assertion = requestToAssertionMap[request.publicKey];
    const voting = assertionToVotingMap[assertion.publicKey];

    const state = RequestState[request.state];

    const additionalInfo = getAdditionalInfo({ request, state, assertion, voting });

    const title = '';
    const description = '';

    return (
      <RequestCard
        key={request.publicKey}
        state={state}
        title={title}
        description={description}
        additionalInfo={additionalInfo}
      />
    );
  };

  return (
    <VStack w="full">{data ? data.map((request) => renderRequestCard(request)) : null}</VStack>
  );
};

const getAdditionalInfo = ({
  request,
  state,
  assertion,
  voting,
}: {
  request: RequestV1;
  state: string;
  assertion: AssertionV1;
  voting: VotingV1;
}) => {
  const bond = getTokenAmount(request.bondMint, request.bond);
  const reward = getTokenAmount(request.rewardMint, request.reward);
  let timestamp = '';

  const additionalInfo = [
    { name: 'Bond', value: prettyAmount(bond) },
    { name: 'Reward', value: prettyAmount(reward) },
    { name: 'State', value: state },
  ];

  if (assertion !== undefined) {
    const assertedValue = decodeYesNoValue(assertion.assertedValue);

    additionalInfo.push(
      { name: 'Asserted Value', value: YesNoValue[assertedValue] },
      { name: 'Asserter', value: assertion.asserter },
    );

    const formatTs = formatDate(assertion.expirationTimestamp);
    if (request.state === RequestState.Resolved) {
      additionalInfo.push({
        name: 'Resolved Value',
        value: YesNoValue[decodeYesNoValue(request.value)],
      });
    } else if (voting === undefined) {
      additionalInfo.push(
        { name: 'Disputer', value: assertion.disputer },
        {
          name: 'Dispute Period Ends',
          value: formatTs,
        },
      );
      timestamp = formatTs;
    } else {
      const formatTs = formatDate(assertion.expirationTimestamp);
      additionalInfo.push({
        name: 'Voting Period Ends',
        value: formatTs,
      });
      timestamp = formatTs;
    }
  }
  return additionalInfo;
};

function decodeYesNoValue(value: number | bigint): YesNoValue {
  value = Number(value);

  switch (value) {
    case YesNoValue.Yes:
    case YesNoValue.No:
    case YesNoValue.Invalid:
      return value;

    default:
      throw new Error(`Invalid yes/no value: ${value}`);
  }
}

export default RequestList;
