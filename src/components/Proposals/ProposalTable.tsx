import { VStack } from '@chakra-ui/react';
import TableWrapper from '../Table/TableWrapper';
import { useEffect, useMemo, useState } from 'react';
import { useOracle } from '@/context/OracleProvider';
import { OracleType } from '@/types/table';
import { getClusterConstant } from '@/constants';

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
  const [page, setPage] = useState(1);
  const { oracleRequestAccounts, descriptions, fetchPage } = useOracle();

  useEffect(() => {
    fetchPage({ page, perPage: 20, reload: false });
  }, []);

  const proposalData = useMemo(() => {
    const MINT_PUBKEY_TO_DECIMAL = getClusterConstant('MINT_PUBKEY_TO_DECIMAL');
    const currentRequestAccounts = oracleRequestAccounts.slice(page, 10 * page);
    const result: OracleType[] = [];
    for (const account of currentRequestAccounts) {
      console.log('ACCOUNT', account);
      const info = descriptions[account.publicKey];
      const bondMint = account.bondMint;
      const rewardMint = account.rewardMint;
      const bondDecimals =
        bondMint in MINT_PUBKEY_TO_DECIMAL
          ? MINT_PUBKEY_TO_DECIMAL[bondMint]
          : 0;
      const rewardDecimals =
        rewardMint in MINT_PUBKEY_TO_DECIMAL
          ? MINT_PUBKEY_TO_DECIMAL[rewardMint]
          : 0;

      result.push({
        title: info.title,
        chain: 'Solana',
        dateCreated: new Date(
          (account.resolveTimestamp * 1000n).toString(),
        ).toString(),
        type: 'Parimutuel Markets',
        description: info.description,
        oracle: account.publicKey,
        requestedTime: new Date(
          (account.assertionTimestamp * 1000n).toString(),
        ).toString(),
        settledTime: undefined,
        bond: Number(account.bond) / Math.pow(10, bondDecimals),
        bondMint: bondMint,
        reward: Number(account.reward) / Math.pow(10, rewardDecimals),
        request: ['Yes', 'No'],
        umip: undefined,
        identifier: undefined,
        requester: account.creator,
        requestTxn: undefined,
        settled: null,
        asserter: undefined,
        escalationManager: undefined,
        callbackRecipient: undefined,
        caller: undefined,
        assertionTxn: undefined,
        settlementRecipient: undefined,
        settlementTxn: undefined,
        voteStatus: undefined,
      });
    }
    return result;
  }, [oracleRequestAccounts, page]);

  console.log('oracleRequestAccounts', oracleRequestAccounts);
  return (
    <VStack w='full' pt='20px' px='8px'>
      <TableWrapper
        data={proposalData}
        variant='simple'
        headerInfo={headerInfo}
        bodyInfo={bodyInfo}
      />
    </VStack>
  );
};

export default ProposalTable;
