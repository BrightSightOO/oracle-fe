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
  claimAssertionV1,
  ClaimAssertionV1InstructionAccounts,
  safeFetchAssertionV1,
} from '@/program-sdks/oracle';
import { MainColorSet } from '@/theme/types';
import { shareTweet } from '@/utils/share';
import { HStack, Text, useTheme, VStack } from '@chakra-ui/react';
import {
  createAmount,
  displayAmount,
  PublicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';

const ClaimAssertionModal = ({
  request,
  assertion,
  reward,
  rewardMint,
  option,
  onClose,
  onBack,
  onSuccess,
}: {
  request: PublicKey;
  assertion: PublicKey;
  reward: number | bigint;
  rewardMint: PublicKey;
  option: number;
  onClose: () => void;
  onSuccess: () => void;
  onBack?: () => void;
}) => {
  const theme = useTheme();
  const { greenPrimary } = theme.colors as MainColorSet;
  const umi = useUmi();
  const wallet = useWallet();
  const { connection } = useConnection();

  const { ORACLE_PROGRAM, MINT_PUBKEY_TO_DECIMAL } = getClusterConstants(
    'ORACLE_PROGRAM',
    'MINT_PUBKEY_TO_DECIMAL',
  );

  const [txSig, setTxSig] = useState<string | undefined>();
  const onViewExplorer = useViewExplorerCallback(txSig);

  const actionText = () => {
    return (
      <Text textStyle='Body'>
        {displayAmount(rewardCreateAmount, 2)} on
        <Text textStyle='Body' mx='5px' as='span' color={greenPrimary}>
          {option}
        </Text>
      </Text>
    );
  };

  const tokenDecimal = MINT_PUBKEY_TO_DECIMAL[rewardMint] ?? 0;
  const rewardCreateAmount = useMemo(
    () => createAmount(reward, '$', tokenDecimal),
    [reward],
  );

  const handleConfirm = async () => {
    if (!wallet?.publicKey) {
      throw Error('Wallet not connected!');
    }

    let builder = transactionBuilder();
    try {
      const refreshedAssertion = await safeFetchAssertionV1(umi, assertion);

      if (!refreshedAssertion) {
        throw Error('Assertion does not exist');
      }

      const params: ClaimAssertionV1InstructionAccounts = {
        request: request.publicKey,
        assertion: assertion.publicKey,
        bondMint: request.bondMint,
        rewardMint: request.rewardMint,
      };

      builder = builder.add(claimAssertionV1(umi, params));

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
      actionText={actionText()}
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
              Claim assertion for{displayAmount(rewardCreateAmount, 2)} on
              <Text
                as='span'
                px='2'
                textStyle='Body'
                fontWeight='bold'
                color={greenPrimary}
              >
                {option}
              </Text>
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </ModalWrapper>
  );
};

export default ClaimAssertionModal;
