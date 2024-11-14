import { ModalWrapper } from '@/components/Shared/Modal';
import { BASE_URL } from '@/constants/common';
import { getClusterConstants } from '@/constants/index';
import { useUmi } from '@/context/UmiProvider';
import useViewExplorerCallback from '@/hooks/useViewExplorerCallback';
import {
  buildAndSendOptimized,
  extractTxSig,
} from '@/program-sdks/common/transaction';
import {
  closeVotingV1,
  CloseVotingV1InstructionAccounts,
  RequestV1,
  safeFetchVotingV1,
  StakeV1,
  VotingV1,
} from '@/program-sdks/oracle';
import { shareTweet } from '@/utils/share';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { transactionBuilder } from '@metaplex-foundation/umi';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

const CloseVoteModal = ({
  request,
  voting,
  onClose,
  onBack,
  onSuccess,
}: {
  request: RequestV1;
  voting: VotingV1;
  onClose: () => void;
  onSuccess: () => void;
  onBack?: () => void;
}) => {
  const umi = useUmi();
  const wallet = useWallet();
  const { connection } = useConnection();

  const { ORACLE_PROGRAM } = getClusterConstants('ORACLE_PROGRAM');

  const [txSig, setTxSig] = useState<string | undefined>();
  const onViewExplorer = useViewExplorerCallback(txSig);

  const handleConfirm = async () => {
    if (!wallet?.publicKey) {
      throw Error('Wallet not connected!');
    }

    let builder = transactionBuilder();
    try {
      const refreshedVoting = await safeFetchVotingV1(umi, voting.publicKey);

      if (!refreshedVoting) {
        throw Error('Voting does not exist');
      }

      const params: CloseVotingV1InstructionAccounts = {
        config: ORACLE_PROGRAM,
        request: request.publicKey,
        assertion: voting.assertion,
        voting: voting.publicKey,
      };

      builder = builder.add(closeVotingV1(umi, params));

      const { signature, result } = await buildAndSendOptimized(
        connection,
        umi,
        builder,
        wallet.publicKey,
      );

      if (result.value.err) {
        throw new Error(result.value.err.toString());
      }
      setTxSig(extractTxSig(signature));
      // Fetch updated oracle accounts
      onSuccess();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const onShare = () => {
    const shareURL = `${BASE_URL}/${request.publicKey}`;
    const content = `Place your prediction on @HedgehogMarket: ${shareURL}`;
    shareTweet(content);
  };

  return (
    <ModalWrapper
      header=''
      buttonText='Confirm'
      onClickMain={handleConfirm}
      onShare={onShare}
      actionText={`Close Voting`}
      onClose={onClose}
      onBack={onBack}
      onViewExplorer={() => onViewExplorer && onViewExplorer()}
    >
      <VStack alignItems='center' mt='40px'>
        <Text textStyle='H3' fontWeight='500'>
          Confirm Transaction
        </Text>
        <VStack justifyContent='space-between' w='261px' mt='41px'>
          <HStack justifyContent='space-between' mb='20px'>
            <Text textStyle='Body' noOfLines={1}>
              Close Voting
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </ModalWrapper>
  );
};

export default CloseVoteModal;
