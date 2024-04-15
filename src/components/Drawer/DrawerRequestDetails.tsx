import {
  Button,
  HStack,
  Select,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { MainColorSet } from '@/theme/types';
import { iOracle } from '@/types/table';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUmi } from '@/context/UmiProvider';
import { displayAmount, publicKey } from '@metaplex-foundation/umi';
import { ModalContainer, ModalWrapper } from '../UI/Modal';
import { assertRequest } from '@/program-sdks/oracle/scripts/assertRequest';
import { expireAndResolveRequest } from '@/program-sdks/oracle/scripts/expireAndResolveRequest';
import {
  deserializeResolver,
  getResolverGpaBuilder,
} from '@/program-sdks/par-resolver';
import { RequestState } from '@/program-sdks/oracle';
import CountdownTimer from './CountdownTimer';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

const REQUEST_OPTIONS = {
  Yes: 1n,
  No: 0n,
  Invalid: 2n,
} as const;

const DrawerRequestDetails = ({ data }: { data: iOracle }) => {
  const { colors } = useTheme();
  const { bluePrimary, white, black, background } = colors as MainColorSet;

  const wallet = useWallet();
  const umi = useUmi();
  const { setVisible } = useWalletModal();

  const [requestOption, setRequestOption] =
    useState<keyof typeof REQUEST_OPTIONS>();
  const submitModal = useDisclosure();

  const handleSubmitOutcome = async () => {
    if (!requestOption) {
      return;
    }
    try {
      return assertRequest({
        umi,
        bond: data.bond.basisPoints,
        bondMint: data.bondMint,
        request: data.request,
        outcome: REQUEST_OPTIONS[requestOption],
      });
    } catch (e) {
      console.log('ERROR', e);
      throw e;
    }
  };

  const handleSubmitExpireAndResolve = async () => {
    try {
      const requestPubkey = publicKey(data.request);
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

  const renderModalBody = (state: RequestState) => {
    if (state === RequestState.Requested) {
      return (
        <ModalWrapper
          header='Assert Outcome'
          onClickMain={handleSubmitOutcome}
          onClose={submitModal.onClose}
          buttonText='Confirm'
        >
          <VStack pt='8'>
            <Text fontWeight='bold'>{data.title}</Text>
            <Text>{`Asserting: ${requestOption}`}</Text>
          </VStack>
        </ModalWrapper>
      );
    } else if (state === RequestState.Asserted) {
      return (
        <ModalWrapper
          header='Expire & Resolve'
          onClickMain={handleSubmitExpireAndResolve}
          onClose={submitModal.onClose}
          buttonText='Confirm'
        >
          <VStack pt='8'>
            <Text fontWeight='bold'>{data.title}</Text>
            <Text>{`Resolving to: ${
              data.assertedValue === 1n ? 'Yes' : 'No'
            }`}</Text>
          </VStack>
        </ModalWrapper>
      );
    }

    return <></>;
  };

  const [isNotAssertable, isNotExpirable] = useMemo(() => {
    const now = Date.now() / 1000;
    return [
      now < Number(data.requestedTime),
      Boolean(data.expirationTime && now < Number(data.expirationTime)),
    ];
  }, [data.expirationTime, data.resolvedTime]);

  const isAssertDisabled = useMemo(
    () =>
      Boolean(
        data.state === RequestState.Requested &&
          isNotAssertable &&
          !requestOption,
      ),
    [data.state, isNotAssertable, requestOption],
  );

  const isResolveDisabled = useMemo(() => {
    return Boolean(data.state === RequestState.Asserted && isNotExpirable);
  }, [data.state, isNotExpirable]);

  return (
    <VStack bg={background} alignItems='flex-start' px='28px' py='24px'>
      <ModalContainer isOpen={submitModal.isOpen} onClose={submitModal.onClose}>
        {renderModalBody(data.state)}
      </ModalContainer>
      <Text textStyle='H5' fontWeight='700'>
        Request (price)
      </Text>
      {data.requestOutcome &&
      // Selecting outcome should be availible when submiting request or voting in dispute
      (data.state === RequestState.Requested ||
        data.state === RequestState.Disputed) ? (
        <Select
          placeholder='Select option'
          bg={white}
          my='10px'
          value={requestOption}
          onChange={(e) =>
            setRequestOption(
              e.currentTarget.value as keyof typeof REQUEST_OPTIONS,
            )
          }
        >
          {data.requestOutcome.map((option, idx) => {
            return (
              <option key={idx} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
      ) : (
        <HStack
          bg={white}
          w='full'
          minH='44px'
          px='16px'
          alignItems='center'
          justifyContent='space-between'
        >
          <HStack>
            <Text textStyle='H5'>Asserted outcome:</Text>
            <Text textStyle='H4'>
              {data.assertedValue === 0n ? 'No' : 'Yes'}
            </Text>
          </HStack>
          {data.state === RequestState.Asserted && !isResolveDisabled ? (
            <Button variant='secondaryAction'>Dispute outcome</Button>
          ) : null}
        </HStack>
      )}
      {data.bond && (
        <HStack w='full' justifyContent='space-between'>
          <HStack>
            <Text textStyle='Body' color={black}>
              Bond
            </Text>
            <Tooltip
              p='20px'
              label='Every request to the Bright Sight Oracle includes bond and liveness settings that specify the size of the bond that proposers (and disputers) are required to post.'
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
            {/* <Image
              width='16px'
              height='16px'
              src={'assets/common/usdc_logo.svg'}
            /> */}
            <Text textStyle='Body' color={black}>
              {displayAmount(data.bond, 3)}
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
              label='Rewards are posted by data requesters and are distributed to correct proposers once liveness is complete and the proposal is settled.'
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
            {/* <Image
              width='16px'
              height='16px'
              src={'assets/common/usdc_logo.svg'}
            /> */}
            <Text textStyle='Body' color={black}>
              {displayAmount(data.reward, 3)}
            </Text>
          </HStack>
        </HStack>
      )}
      {data.state === RequestState.Requested ? (
        <HStack w='full' justifyContent='space-between'>
          <HStack>
            <Text textStyle='Body' color={black}>
              Assertion window opens
            </Text>
            <Tooltip
              p='20px'
              label={`Providing an assertion to a market outcome is available after market resolution date.`}
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
            {!isResolveDisabled ? (
              <CountdownTimer endTs={Number(data.requestedTime)} />
            ) : (
              <Text>Open to assert</Text>
            )}
          </HStack>
        </HStack>
      ) : null}
      {data.state === RequestState.Asserted ? (
        <HStack w='full' justifyContent='space-between'>
          <HStack>
            <Text textStyle='Body' color={black}>
              Dispute period ends
            </Text>
            <Tooltip
              p='20px'
              label={`Every request to the Bright Sight Oracle specifies liveness
             settings that define the length of the challenge period during 
             which a proposal can be challenged.`}
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
            {!isResolveDisabled ? (
              <CountdownTimer endTs={Number(data.expirationTime)} />
            ) : (
              <Text>--</Text>
            )}
          </HStack>
        </HStack>
      ) : null}

      {data.state !== RequestState.Resolved ? (
        wallet.connected ? (
          <Button
            w='full'
            h='50px'
            variant='primaryAction'
            onClick={submitModal.onOpen}
            isDisabled={isAssertDisabled || isResolveDisabled}
          >
            {data.state === RequestState.Requested
              ? 'Assert Outcome'
              : data.state === RequestState.Asserted
              ? 'Resolve Request'
              : 'Challenge Result'}
          </Button>
        ) : (
          <Button
            w='full'
            h='50px'
            color={white}
            bg={bluePrimary}
            borderRadius='4px'
            onClick={() => setVisible(true)}
          >
            Connect wallet
          </Button>
        )
      ) : null}
    </VStack>
  );
};

export default DrawerRequestDetails;
