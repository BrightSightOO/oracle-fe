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
import { useEffect, useState } from 'react';
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
  const [subData, setSubData] = useState<iOracle>(() => data);
  const [requestId, setRequestId] = useState<number>();
  const [assertId, setAssertId] = useState<number>();
  const [votingId, setVotingId] = useState<number>();

  useEffect(() => {
    // Accounts are not expected to change after resolved
    if (subData.state === RequestState.Resolved) {
      return;
    }

    let updatedData = { ...subData };
    let didDataUpdate = false;
    // Subscribe to accounts
    if (!requestId) {
      console.log('subscribe to request account');

      const rId = connection.onAccountChange(
        toWeb3JsPublicKey(subData.request),
        (accountRaw) => {
          const requestAccount = deserializeRequest({
            ...accountRaw,
            lamports: lamports(accountRaw.lamports),
            owner: fromWeb3JsPublicKey(accountRaw.owner),
            rentEpoch: accountRaw.rentEpoch
              ? BigInt(accountRaw.rentEpoch)
              : undefined,
            publicKey: subData.request,
          });
          console.log('inside request cb', requestAccount);
          didDataUpdate = true;
          updatedData.state = requestAccount.state;
          updatedData.resolvedTime = requestAccount.resolveTimestamp;
          updatedData.resolvedValue = requestAccount.value;
        },
      );
      setRequestId(rId);
    }

    if (!assertId && subData.asserter) {
      console.log('subscribe to assert account', subData.asserter);

      const aId = connection.onAccountChange(
        toWeb3JsPublicKey(subData.asserter),
        (accountRaw) => {
          const assertAccount = deserializeAssertion({
            ...accountRaw,
            lamports: lamports(accountRaw.lamports),
            owner: fromWeb3JsPublicKey(accountRaw.owner),
            rentEpoch: accountRaw.rentEpoch
              ? BigInt(accountRaw.rentEpoch)
              : undefined,
            publicKey: subData.asserter!,
          });
          console.log('inside assert cb', assertAccount);
          didDataUpdate = true;
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

    didDataUpdate && setSubData(updatedData);

    return () => {
      console.log('unsubscribe to request', subData.request);
      requestId && connection.removeAccountChangeListener(requestId);
      assertId && connection.removeAccountChangeListener(assertId);
      votingId && connection.removeAccountChangeListener(votingId);
      setRequestId(undefined);
      setAssertId(undefined);
      setVotingId(undefined);
    };
  }, [subData]);

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
              {subData.title}
            </Text>
          </DrawerHeader>
        </HStack>
        <DrawerBody px='0'>
          <DrawerRequestDetails data={subData} />
          <DrawerTimestamps
            requestedTime={subData.requestedTime}
            assertedTime={subData.assertedTime}
            expirationTime={subData.expirationTime}
            resolvedTime={subData.resolvedTime}
          />
          <VStack pb='64px'>
            <DrawerTextData description={subData.description} />
            <DrawerInformation data={subData} />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWrapper;
