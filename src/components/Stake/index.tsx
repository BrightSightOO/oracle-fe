import { MainColorSet } from '@/theme/types';
import {
	Box,
	Button,
	ButtonGroup,
	HStack,
	Text,
	useTheme,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import Staking from './Staking';

const unlocks = [
	{ amount: 500, date: '12 Sep 2024 18:23' },
	{ amount: 1525, date: '12 Sep 2024 18:23' },
	{ amount: 2001, date: '12 Sep 2024 18:23' },
];

export enum StakeMode {
	STAKE = 'Stake',
	UNSTAKE = 'Unstake',
}

const Stake = () => {
	const { colors } = useTheme();
	const {
		textPrimary,
		backgroundCard,
		textGrey,
		greyLight,
		greyLight2,
		greenBrightSight,
	} = colors as MainColorSet;

	const [mode, setMode] = useState(StakeMode.STAKE);

	const stakeModes = [StakeMode.STAKE, StakeMode.UNSTAKE];

	return (
		<VStack w='full' h='100%' maxW={{ base: 'full', md: '473px' }}>
			{/* Header text - Staking amount */}
			<HStack w='full' justifyContent='space-between' pb='20px'>
				<Text
					textStyle='H3'
					fontSize={{ base: '16px', md: '24px' }}
					fontWeight='700'
					color={textPrimary}
				>
					Stake to vote on disputes
				</Text>
				<Box
					h='29px'
					py='1px'
					px='12px'
					bg={greyLight}
					borderRadius='1000px'
					border={`1px solid ${greenBrightSight}`}
				>
					{/* TODO: Bring in real staked number */}
					<Text
						textStyle='H6'
						fontSize={{ base: '10px', xmd: '14px' }}
						color={greenBrightSight}
					>
						12.312 OO Staked
					</Text>
				</Box>
			</HStack>
			{/* Staking */}
			<ButtonGroup w='full'>
				<HStack w='full'>
					{stakeModes.map((stakeMode) => {
						const isSelected = stakeMode === mode;
						console.log(stakeMode);
						return (
							<Button
								key={stakeMode}
								w='full'
								h='38px'
								p='8px'
								borderRadius='lg'
								fontSize='18px'
								fontWeight='500'
								color={textPrimary}
								opacity={isSelected ? 1 : 0.25}
								bg={backgroundCard}
								_hover={{
									bg: greyLight2,
								}}
								onClick={() => setMode(stakeMode)}
							>
								{stakeMode}
							</Button>
						);
					})}
				</HStack>
			</ButtonGroup>
			<Staking mode={mode} />
			{/* Unlocks */}
			<VStack w='full' align='flex-start' pt='80px'>
				<Text textStyle='H3' fontWeight='700' color={textPrimary}>
					Your Unlocks
				</Text>
				<VStack w='full' p='24px' bg={backgroundCard} borderRadius='lg'>
					<HStack w='full' justifyContent='space-between'>
						<Text textStyle='H6' color={textGrey} fontWeight='600'>
							Amount
						</Text>
						<Text textStyle='H6' color={textGrey} fontWeight='600'>
							Unlock Date
						</Text>
					</HStack>
					<VStack w='full'>
						{unlocks.map((unlock) => (
							<HStack
								key={unlock.amount + unlock.date}
								w='full'
								justifyContent='space-between'
							>
								<Text textStyle='H6' color={textPrimary} fontWeight='500'>
									{unlock.amount} OO
								</Text>
								<Text textStyle='H6' color={textGrey} fontWeight='500'>
									{unlock.date}
								</Text>
							</HStack>
						))}
					</VStack>
				</VStack>
			</VStack>
		</VStack>
	);
};

export default Stake;
