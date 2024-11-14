import { useOracleAccounts } from '@/context/OracleProvider';
import { RequestV1 } from '@/program-sdks/oracle';
import { MainColorSet } from '@/theme/types';
import {
  Button,
  HStack,
  Show,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import RequestList from './RequestList';

export enum RequestStatus {
  OPEN = 'Open',
  PROVIDED = 'Data Provided',
  DISPUTED = 'Disputed',
  CLOSED = 'Closed',
}

const Requests = ({ stakingToggle }: { stakingToggle: () => void }) => {
  const { colors } = useTheme();
  const { textPrimary, backgroundCard, greyLight2, greenPrimary } = colors as MainColorSet;

  const { requests } = useOracleAccounts();

  const requestsByStatus = useMemo(() => {
    const statusGroups: Record<string, RequestV1[]> = {
      Requested: [],
      Asserted: [],
      Disputed: [],
      Resolved: [],
    };

    for (const request of requests) {
      statusGroups[request.state].push(request);
    }

    return statusGroups;
  }, [requests]);

  const requestTabs = [
    RequestStatus.OPEN,
    RequestStatus.PROVIDED,
    RequestStatus.DISPUTED,
    RequestStatus.CLOSED,
  ];

  return (
    <VStack w="full" h="100%" maxW="777px" align="flex-start" alignSelf="start">
      <HStack w="full" justifyContent="space-between" pb="20px">
        <Text textStyle="H3" fontWeight="700" color={textPrimary}>
          Data Requests
        </Text>
        <Show below="md">
          <Button
            border={`1px solid ${greenPrimary}`}
            color={greenPrimary}
            fontSize="18px"
            fontWeight="600"
            onClick={stakingToggle}
          >
            Stake
          </Button>
        </Show>
      </HStack>
      <VStack w="full">
        <Tabs w="full">
          <TabList>
            <HStack w="full">
              {requestTabs.map((tab) => {
                return (
                  <Tab
                    key={tab}
                    w="full"
                    h="38px"
                    p="8px"
                    borderRadius="lg"
                    fontSize="18px"
                    fontWeight="500"
                    color={textPrimary}
                    opacity={0.25}
                    bg={backgroundCard}
                    _hover={{
                      bg: greyLight2,
                    }}
                    _selected={{
                      opacity: 1,
                    }}
                  >
                    {tab}
                  </Tab>
                );
              })}
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel p="0px" pt="15px">
              <RequestList data={requestsByStatus['Requested']} />
            </TabPanel>
            <TabPanel p="0px" pt="15px">
              <RequestList data={requestsByStatus['Asserted']} />
            </TabPanel>
            <TabPanel p="0px" pt="15px">
              <RequestList data={requestsByStatus['Disputed']} />
            </TabPanel>
            <TabPanel p="0px" pt="15px">
              <RequestList data={requestsByStatus['Resolved']} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </VStack>
  );
};

export default Requests;
