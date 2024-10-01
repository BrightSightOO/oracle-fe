import { mockRequestData } from '@/mockRequestData';
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
import RequestList from './RequestList';

export enum RequestStatus {
	OPEN = 'Open',
	CLOSED = 'Closed',
	PROVIDED = 'Provided',
	DISPUTED = 'Disputed',
}

const Requests = ({ stakingToggle }: { stakingToggle: () => void }) => {
	const { colors } = useTheme();
	const { textPrimary, backgroundCard, greyLight2, greenPrimary } =
		colors as MainColorSet;

	const requestTabs = [
		RequestStatus.OPEN,
		RequestStatus.CLOSED,
		RequestStatus.PROVIDED,
		RequestStatus.DISPUTED,
	];

	return (
		<VStack w='full' h='100%' maxW='777px' align='flex-start'>
			<HStack w='full' justifyContent='space-between' pb='20px'>
				<Text textStyle='H3' fontWeight='700' color={textPrimary}>
					Data Requests
				</Text>
				<Show below='md'>
					<Button
						border={`1px solid ${greenPrimary}`}
						color={greenPrimary}
						fontSize='18px'
						fontWeight='600'
						onClick={stakingToggle}
					>
						Stake
					</Button>
				</Show>
			</HStack>
			<VStack w='full'>
				<Tabs w='full'>
					<TabList>
						<HStack w='full'>
							{requestTabs.map((tab) => {
								return (
									<Tab
										key={tab}
										w='full'
										h='38px'
										p='8px'
										borderRadius='lg'
										fontSize='18px'
										fontWeight='500'
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
						<TabPanel p='0px' pt='15px'>
							<RequestList data={mockRequestData[RequestStatus.OPEN]} />
						</TabPanel>
						<TabPanel p='0px' pt='15px'>
							<RequestList data={mockRequestData[RequestStatus.CLOSED]} />
						</TabPanel>
						<TabPanel p='0px' pt='15px'>
							<RequestList data={mockRequestData[RequestStatus.PROVIDED]} />
						</TabPanel>
						<TabPanel p='0px' pt='15px'>
							<RequestList data={mockRequestData[RequestStatus.DISPUTED]} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
		</VStack>
	);
};

export default Requests;
