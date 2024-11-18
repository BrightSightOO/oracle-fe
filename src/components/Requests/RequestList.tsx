import { getTokenAmount } from '@/constants/mints';
import { useOracleAccounts } from '@/context/OracleProvider';
import {
  AssertionV1,
  RequestKind,
  RequestState,
  RequestV1,
  StakeV1,
  VotingV1,
  YesNoValue,
} from '@/program-sdks/oracle';
import { prettyAmount } from '@/utils/amount';
import { formatDate } from '@/utils/time';
import { useDisclosure, VStack } from '@chakra-ui/react';
import RequestCard from './RequestCard';
import { useState } from 'react';
import { PublicKey } from '@metaplex-foundation/umi';
import ModalContainer from '../Shared/Modal/ModalContainer';

type RequestModalAction = 'assertion' | 'dispute' | 'vote';

const RequestList = ({ data }: { data: RequestV1[] }) => {
  const { requestToAssertionMap, assertionToVotingMap } = useOracleAccounts();

  const [selectedRequestKey, setSelectedRequestKey] = useState();

  const allModal = useDisclosure();
  const assertionModal = useDisclosure();
  const disputeModal = useDisclosure();
  const voteModal = useDisclosure();
  const resolveModal = useDisclosure();

  const [modalInfo, setModalInfo] = useState<{
    action: RequestModalAction;
    request: RequestV1;
    assertion: AssertionV1;
    voting: VotingV1;
    stake: StakeV1;
    bondAmount: number | bigint;
    option: number;
  }>();

  // Resolve
  const [outcomeInfo, setOutcomeInfo] = useState<{
    outcome: number;
    outcomeText: string;
    marketMint: PublicKey;
  }>();

  // Assertion
  const [assertionInfo, setAssertionInfo] = useState<
    | {
        title: string;
        mint: PublicKey;
        userPositions: UserPositionV1[];
        isMarketInvalid: boolean;
        creator: PublicKey;
      }
    | undefined
  >(undefined);

  // Dispute
  const [disputeInfo, setDisputeInfo] = useState<
    | {
        title: string;
        mint: PublicKey;
        userPositions: UserPositionV1[];
        isMarketInvalid: boolean;
        creator: PublicKey;
      }
    | undefined
  >(undefined);

  // Vote
  const [voteInfo, setVoteInfo] = useState<{
    outcome: number;
    outcomeText: string;
    marketMint: PublicKey;
  }>();

  const renderRequestCard = (request: RequestV1) => {
    if (!request) return null;

    const assertion = requestToAssertionMap[request.publicKey];
    const voting = assertionToVotingMap[assertion.publicKey];

    const state = RequestState[request.state];

    const { additionalInfo, assertedValue, timestamp } = getAdditionalInfo({
      request,
      state,
      assertion,
      voting,
    });

    const title = '';
    const description = '';

    const options =
      request.kind === RequestKind.YesNo ? ['Yes', 'No', 'Invalid'] : [];

    return (
      <RequestCard
        key={request.publicKey}
        state={state}
        title={title}
        description={description}
        additionalInfo={additionalInfo}
        options={options}
        timestamp={timestamp}
        assertedAnswer={assertedValue}
        assertion={assertion}
        voting={voting}
      />
    );
  };

  // Reset modal and selected state
  const handleModalClose = () => {
    allModal.isOpen && allModal.onClose();
    setSelectedRequestKey(undefined);
    // setOutcomeInfo(undefined);
    // setAssertionInfo(undefined);
    setModalInfo(undefined);
  };

  return (
    <VStack w='full'>
      {selectedRequestKey && modalInfo && resolveModal.isOpen && (
        <ModalContainer isOpen={allModal.isOpen} onClose={handleModalClose}>
          <ResolveModal
            marketAddress={selectedMarketKey}
            outcome={outcomeInfo.outcome}
            marketMint={outcomeInfo.marketMint}
            outcomeText={outcomeInfo.outcomeText}
            onClose={handleModalClose}
            onSuccess={() => fetchRefreshAccounts(selectedRequestKey, [])}
          />
        </ModalContainer>
      )}
      {data ? data.map((request) => renderRequestCard(request)) : null}
    </VStack>
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

  let assertedValue: YesNoValue | undefined;
  if (assertion) {
    assertedValue = decodeYesNoValue(assertion.assertedValue);

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
    } else if (!voting) {
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
  return { additionalInfo, timestamp, assertedValue };
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
