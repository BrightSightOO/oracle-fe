import { Button, Text, ButtonGroup, HStack, VStack } from '@chakra-ui/react';
import TableWrapper from '../Table/TableWrapper';
import { useEffect, useMemo, useState } from 'react';
import { useOracle } from '@/context/OracleProvider';
import { iOracle } from '@/types/table';
import { getClusterConstants } from '@/constants';
import { createAmount } from '@metaplex-foundation/umi';
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const headerInfo = [
  { title: 'Query', maxW: '634px' },
  { title: 'Type', maxW: '211px' },
  { title: 'Bond', maxW: '111px' },
  { title: 'Reward', maxW: '108px' },
  { title: '', maxW: '70px' },
];
const bodyInfo = [
  { title: 'title', maxW: '634px' },
  { title: 'oracleType', maxW: '211px' },
  { title: 'bond', maxW: '111px' },
  { title: 'reward', maxW: '108px' },
  { title: '', maxW: '70px' },
];

const ProposalTable = () => {
  const [page, setPage] = useState(1);
  const {
    maxPages,
    oracleRequestAccounts,
    oracleAssertionAccounts,
    descriptions,
    fetchPage,
  } = useOracle();

  useEffect(() => {
    if (page in oracleRequestAccounts) {
      return;
    }
    fetchPage({ page, perPage: 10, reload: false });
  }, [page]);

  const proposalData = useMemo(() => {
    const { MINT_PUBKEY_TO_DECIMAL, MINT_PUBKEY_TO_NAME } = getClusterConstants(
      'MINT_PUBKEY_TO_DECIMAL',
      'MINT_PUBKEY_TO_NAME',
    );
    const currentRequestAccounts = oracleRequestAccounts[page];
    if (!currentRequestAccounts || !currentRequestAccounts.length) {
      return [];
    }

    const result: iOracle[] = [];
    for (const account of currentRequestAccounts) {
      const info = descriptions[account.publicKey];
      const assertAccount = oracleAssertionAccounts[account.publicKey];
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
      const rewardMintName =
        rewardMint in MINT_PUBKEY_TO_NAME
          ? MINT_PUBKEY_TO_NAME[rewardMint]
          : '';
      const bondMintName =
        bondMint in MINT_PUBKEY_TO_NAME ? MINT_PUBKEY_TO_NAME[bondMint] : '';

      result.push({
        title: info.title,
        description: info.description,
        chain: 'Solana',
        oracleType: 'Parimutuel Markets',
        requestedTime: account.assertionTimestamp,
        assertedTime: assertAccount
          ? assertAccount.assertionTimestamp
          : undefined,
        expirationTime: assertAccount
          ? assertAccount.expirationTimestamp
          : undefined,
        request: account.publicKey,
        bond: createAmount(account.bond, bondMintName, bondDecimals),
        bondMint: bondMint,
        reward: createAmount(account.reward, rewardMintName, rewardDecimals),
        requestOutcome: ['Yes', 'No'],
        creator: account.creator,
        state: account.state,
        asserter: assertAccount ? assertAccount.asserter : undefined,
        assertedValue: assertAccount ? assertAccount.assertedValue : undefined,
        disputedValue: assertAccount ? assertAccount.disputedValue : undefined,
        disputer: assertAccount ? assertAccount.disputer : undefined,
        resolvedTime: account.resolveTimestamp,
        resolvedValue: account.value,
      });
    }
    return result;
  }, [oracleRequestAccounts, page]);

  return (
    <VStack w='full' pt='20px' px='8px'>
      <TableWrapper
        data={proposalData}
        variant='simple'
        headerInfo={headerInfo}
        bodyInfo={bodyInfo}
      />
      <HStack w='full' justifyContent='flex-end' p='2'>
        <HStack>
          <Text>
            Page {page} of {maxPages}
          </Text>
        </HStack>
        <ButtonGroup spacing='2'>
          <Button isDisabled={page === 1} onClick={() => setPage(1)}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <Button
            isDisabled={page === 1}
            onClick={() => setPage((pS) => (pS -= 1))}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
          <Button
            isDisabled={page + 1 >= maxPages}
            onClick={() => setPage((pS) => (pS += 1))}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
          <Button
            isDisabled={page === maxPages}
            onClick={() => setPage(maxPages)}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  );
};

export default ProposalTable;
