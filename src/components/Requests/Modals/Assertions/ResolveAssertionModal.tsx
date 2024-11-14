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
  AssertionV1,
  RequestV1,
  resolveAssertionV1,
  ResolveAssertionV1InstructionAccounts,
  safeFetchAssertionV1,
} from '@/program-sdks/oracle';
import { shareTweet } from '@/utils/share';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { transactionBuilder } from '@metaplex-foundation/umi';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

const ResolveAssertionModal = ({
  request,
  assertion,
  onClose,
  onBack,
  onSuccess,
}: {
  request: RequestV1;
  assertion: AssertionV1;
  bondAmount: number | bigint;
  option: number;
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
      const refreshedAssertion = await safeFetchAssertionV1(
        umi,
        assertion.publicKey,
      );

      if (!refreshedAssertion) {
        throw Error('Assertion does not exist');
      }

      const params: ResolveAssertionV1InstructionAccounts = {
        // TODO: Create config
        config: ORACLE_PROGRAM,
        request: request.publicKey,
        assertion: assertion.publicKey,
      };

      builder = builder.add(resolveAssertionV1(umi, params));

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
      actionText='Resolve Assertion'
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
              Resolve Assertion
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </ModalWrapper>
  );
};

export default ResolveAssertionModal;
