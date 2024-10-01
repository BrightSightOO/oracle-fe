import { MainColorSet } from '@/theme/types';
import {
	Box,
	Button,
	HStack,
	NumberInput,
	NumberInputField,
	Text,
	useTheme,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { StakeMode } from '.';
import USDCLogo from '../Svg/USDCLogo';

const Staking = ({ mode }: { mode: StakeMode }) => {
	const { colors } = useTheme();
	const {
		greenBrightSight,
		greenDark,
		textPrimary,
		textGrey,
		backgroundMain,
		backgroundCard,
	} = colors as MainColorSet;

	const [value, setValue] = useState('0');

	return (
		<VStack
			w='full'
			p='24px'
			align='flex-start'
			bg={backgroundCard}
			borderRadius='lg'
		>
			{/* Input */}
			<VStack
				w='full'
				p='16px'
				align='flex-start'
				bg={backgroundMain}
				borderRadius='lg'
				gap={4}
			>
				<Text textStyle='Body' color={textGrey}>
					{"You're Staking"}
				</Text>
				<NumberInput
					w='full'
					value={value}
					defaultValue={0}
					// TODO: Set max to whatever the max the user has in wallet
					max={10000}
					clampValueOnBlur={true}
					onChange={(valueString) => setValue(valueString)}
				>
					<HStack w='full'>
						<HStack>
							<USDCLogo width='32px' height='auto' />
							<Text textStyle='Body' fontWeight='500' color={textPrimary}>
								OO
							</Text>
						</HStack>
						<NumberInputField
							w='full'
							h='32px'
							color={textGrey}
							placeholder='0'
							fontWeight='600'
							justifyContent='flex-end'
							border='none'
							textAlign='right'
							pr='0px'
						/>
					</HStack>
				</NumberInput>
			</VStack>
			<Box h='10px' />
			{/* Action */}
			<Button
				w='full'
				h='48px'
				p='8px'
				bg={greenBrightSight}
				borderRadius='lg'
				fontSize='18px'
				fontWeight='600'
				color={textPrimary}
				onClick={() => {
					// TODO: handleStacking
					console.log('Staking...');
				}}
				_hover={{
					bg: greenDark,
				}}
			>
				{mode}
			</Button>
			<Box h='10px' />
			{/* Information */}
			<VStack w='full'>
				<HStack w='full' justifyContent='space-between'>
					<Text textStyle='H6' color={textGrey} fontWeight='500'>
						Balance
					</Text>
					<Text textStyle='H6' color={textPrimary} fontWeight='500'>
						12.312 OO
					</Text>
				</HStack>
				<HStack w='full' justifyContent='space-between'>
					<Text textStyle='H6' color={textGrey} fontWeight='500'>
						Min Lock-up
					</Text>
					<Text textStyle='H6' color={textPrimary} fontWeight='500'>
						2 Weeks
					</Text>
				</HStack>
			</VStack>
		</VStack>
	);
};

export default Staking;
