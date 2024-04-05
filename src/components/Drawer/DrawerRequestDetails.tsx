import {
  Button,
  Flex,
  HStack,
  Image,
  Select,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { MainColorSet } from '@/theme/types';
import { OracleType, TableDataEnum } from '@/types/table';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUmi } from '@/context/UmiProvider';
import { publicKey } from '@metaplex-foundation/umi';
import { ModalContainer, ModalWrapper } from '../UI/Modal';
import { assertRequest } from '@/program-sdks/oracle/scripts/assertRequest';
import { expireAndResolveRequest } from '@/program-sdks/oracle/scripts/expireAndResolveRequest';
import {
  deserializeResolver,
  getResolverGpaBuilder,
} from '@/program-sdks/par-resolver';

const DrawerRequestDetails = ({
  data,
  dataType,
}: {
  data: OracleType;
  dataType: TableDataEnum;
}) => {
  const { colors } = useTheme();
  const { bluePrimary, white, black, background } = colors as MainColorSet;

  const wallet = useWallet();
  const umi = useUmi();

  const [requestOption, setRequestOption] = useState('');
  const assertModal = useDisclosure();

  const handleSubmitOutcome = async () => {
    try {
      return assertRequest({
        umi,
        bond: data.bond,
        bondMint: data.bondMint,
        request: data.oracle,
        outcome: requestOption === 'Yes' ? 1n : 0n,
      });
    } catch (e) {
      console.log('ERROR', e);
      throw e;
    }
  };

  const handleSubmitExpireAndResolve = async () => {
    try {
      const requestPubkey = publicKey(data.oracle);
      const resolveAccountRaw = await getResolverGpaBuilder(umi)
        .whereField('request', requestPubkey)
        .get();
      const resolveAccount = deserializeResolver(resolveAccountRaw[0]);
      return expireAndResolveRequest({
        umi,
        request: requestPubkey,
        market: resolveAccount.market,
      });
    } catch (e) {
      console.log('ERROR', e);
      throw e;
    }
  };
  console.log('requestOption', requestOption);
  return (
    <VStack bg={background} alignItems='flex-start' px='28px' py='24px'>
      <ModalContainer isOpen={assertModal.isOpen} onClose={assertModal.onClose}>
        <ModalWrapper
          header='Assert Outcome'
          onClickMain={handleSubmitExpireAndResolve}
          onClose={assertModal.onClose}
          buttonText='Confirm'
        >
          <VStack pt='8'>
            <Text fontWeight='bold'>{data.title}</Text>
            <Text>{`Asserting: ${requestOption}`}</Text>
          </VStack>
        </ModalWrapper>
      </ModalContainer>
      <Text textStyle='H5' fontWeight='700'>
        Request (price)
      </Text>
      {data.request && !data.settled && (
        <Select
          placeholder='Select option'
          bg={white}
          my='10px'
          value={requestOption}
          onChange={(e) => setRequestOption(e.currentTarget.value)}
        >
          {data.request.map((option, idx) => {
            return (
              <option key={idx} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
      )}
      {data.settled && (
        <Flex bg={white} w='full' minH='44px' px='16px' alignItems='center'>
          <Text textStyle='H5'>{data.settled}</Text>
        </Flex>
      )}

      {data.bond && (
        <HStack w='full' justifyContent='space-between'>
          <HStack>
            <Text textStyle='Body' color={black}>
              Bond
            </Text>
            <Tooltip
              p='20px'
              label='Every request to Optimistic Oracle includes bond and liveness settings that specify the size of the bond that proposers (and disputers) are required to post.'
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{
                  width: '15px',
                }}
                cursor='pointer'
                border={true}
              />
            </Tooltip>
          </HStack>
          <HStack>
            <Image
              width='16px'
              height='16px'
              src={'assets/common/usdc_logo.svg'}
            />
            <Text textStyle='Body' color={black}>
              {data.bond}
            </Text>
          </HStack>
        </HStack>
      )}
      {data.reward && (
        <HStack w='full' justifyContent='space-between'>
          <HStack>
            <Text textStyle='Body' color={black}>
              Reward
            </Text>
            <Tooltip
              p='20px'
              label='Every request to Optimistic Oracle includes reward and liveness settings that specify the size of the bond that proposers (and disputers) are required to post.'
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{
                  width: '15px',
                }}
                cursor='pointer'
                border={true}
              />
            </Tooltip>
          </HStack>
          <HStack>
            <Image
              width='16px'
              height='16px'
              src={'assets/common/usdc_logo.svg'}
            />
            <Text textStyle='Body' color={black}>
              {data.reward}
            </Text>
          </HStack>
        </HStack>
      )}
      <HStack w='full' justifyContent='space-between'>
        <HStack>
          <Text textStyle='Body' color={black}>
            Challenge period ends
          </Text>
          <Tooltip
            p='20px'
            label='Every request to Optimistic Oracle includes reward and liveness settings that specify the size of the bond that proposers (and disputers) are required to post.'
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{
                width: '15px',
              }}
              cursor='pointer'
              border={true}
            />
          </Tooltip>
        </HStack>
      </HStack>
      {dataType === TableDataEnum.Proposal ? (
        wallet.connected ? (
          <Button
            w='full'
            h='50px'
            color={white}
            bg={bluePrimary}
            borderRadius='4px'
            onClick={assertModal.onOpen}
          >
            Submit Outcome
          </Button>
        ) : (
          <Button
            w='full'
            h='50px'
            color={white}
            bg={bluePrimary}
            borderRadius='4px'
            onClick={wallet.connect}
          >
            Connect wallet
          </Button>
        )
      ) : null}
    </VStack>
  );
};

export default DrawerRequestDetails;
