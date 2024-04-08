import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react';
import { MainColorSet } from '@/theme/types';
import { iOracle } from '@/types/table';
import DrawerRequestDetails from './DrawerRequestDetails';
import DrawerTimestamps from './DrawerTimestamps';
import DrawerTextData from './DrawerTextData';
import DrawerInformation from './DrawerInformation';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useMemo, useState } from 'react';
import {
  RequestState,
  deserializeAssertion,
  deserializeRequest,
} from '@/program-sdks/oracle';
import {
  fromWeb3JsPublicKey,
  toWeb3JsPublicKey,
} from '@metaplex-foundation/umi-web3js-adapters';
import { lamports } from '@metaplex-foundation/umi';

const DrawerWrapper = ({
  data,
  isOpen,
  onClose,
}: {
  data: iOracle;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { colors } = useTheme();
  const { white, black } = colors as MainColorSet;

  const { connection } = useConnection();
  const [subData, setSubData] = useState<iOracle>();
  const [requestId, setRequestId] = useState<number>();
  const [assertId, setAssertId] = useState<number>();
  const [votingId, setVotingId] = useState<number>();

  useEffect(() => {
    // Accounts are not expected to change after resolved
    if (data.state === RequestState.Resolved) {
      return;
    }

    let updatedData = { ...data };
    // Subscribe to accounts
    const rId = connection.onAccountChange(
      toWeb3JsPublicKey(data.request),
      (accountRaw) => {
        const requestAccount = deserializeRequest({
          ...accountRaw,
          lamports: lamports(accountRaw.lamports),
          owner: fromWeb3JsPublicKey(accountRaw.owner),
          rentEpoch: accountRaw.rentEpoch
            ? BigInt(accountRaw.rentEpoch)
            : undefined,
          publicKey: data.request,
        });
        updatedData.state = requestAccount.state;
        updatedData.resolvedTime = requestAccount.resolveTimestamp;
        updatedData.resolvedValue = requestAccount.value;
      },
    );
    setRequestId(rId);

    if (data.asserter) {
      const aId = connection.onAccountChange(
        toWeb3JsPublicKey(data.asserter),
        (accountRaw) => {
          const assertAccount = deserializeAssertion({
            ...accountRaw,
            lamports: lamports(accountRaw.lamports),
            owner: fromWeb3JsPublicKey(accountRaw.owner),
            rentEpoch: accountRaw.rentEpoch
              ? BigInt(accountRaw.rentEpoch)
              : undefined,
            publicKey: data.asserter!,
          });
          updatedData.assertedTime = assertAccount.assertionTimestamp;
          updatedData.expirationTime = assertAccount.expirationTimestamp;
          updatedData.disputer = assertAccount.disputer;
          updatedData.assertedValue = assertAccount.assertedValue;
          updatedData.disputedValue = assertAccount.disputedValue;
        },
      );
      setAssertId(aId);
    }

    // TODO - add voting when program implemented
    // if (data.voting) {
    //   const vId = connection.onAccountChange(
    //     toWeb3JsPublicKey(data.voting),
    //     (accountRaw) => {},
    //   );
    //   setVotingId(vId);
    // }

    setSubData(updatedData);

    return () => {
      requestId && connection.removeAccountChangeListener(requestId);
      assertId && connection.removeAccountChangeListener(assertId);
      votingId && connection.removeAccountChangeListener(votingId);
      setRequestId(undefined);
      setAssertId(undefined);
      setVotingId(undefined);
    };
  }, []);

  const currentData = useMemo(() => {
    return subData || data;
  }, [data, subData]);

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent minW={{ base: 'full', sm: '553px' }} w='full'>
        <HStack w='full' bg={black} justifyContent='flex-start'>
          <DrawerCloseButton bg={white} />
          <DrawerHeader color={white} w='full'>
            <Text
              minW={{ base: '300px', sm: '470px' }}
              maxW='470px'
              w='full'
              whiteSpace='wrap'
              noOfLines={2}
            >
              {currentData.title}
            </Text>
          </DrawerHeader>
        </HStack>
        <DrawerBody px='0'>
          <DrawerRequestDetails data={currentData} />
          <DrawerTimestamps
            requestedTime={currentData.requestedTime}
            expirationTime={currentData.expirationTime}
            resolvedTime={currentData.resolvedTime}
          />
          <VStack pb='64px'>
            <DrawerTextData description={currentData.description} />
            <DrawerInformation data={currentData} />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapper;
