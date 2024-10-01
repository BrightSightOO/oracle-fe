import { MainColorSet } from '@/theme/types';
import { Box, Flex, HStack, Text, useTheme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Header = () => {
	const { colors } = useTheme();
	const { greenBrightSight, black } = colors as MainColorSet;

	const WalletMultiButtonDynamic = dynamic(
		async () =>
			(await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
		{ ssr: false }
	);

	return (
		<Box w='full' bg={black}>
			<HStack
				justifyContent='space-between'
				maxW='1512px'
				w='full'
				mx='auto'
				h='66px'
				px='16px'
			>
				<Text color={greenBrightSight}>Bright Sight</Text>
				<Flex justifyContent='center' minW='190px'>
					<WalletMultiButtonDynamic />
				</Flex>
			</HStack>
		</Box>
	);
};

export default Header;
