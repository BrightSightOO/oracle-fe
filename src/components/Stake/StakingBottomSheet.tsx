import { MainColorSet } from '@/theme/types';
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	useTheme,
} from '@chakra-ui/react';
import Stake from '.';

const StakingBottomSheet = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const { colors } = useTheme();
	const { textPrimary, backgroundCard } = colors as MainColorSet;

	return (
		<Drawer placement='bottom' isOpen={isOpen} onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent maxH='80%' bg={backgroundCard} borderTopRadius='2xl'>
				<DrawerCloseButton />
				<DrawerHeader color={textPrimary}>Staking</DrawerHeader>
				<DrawerBody>
					<Stake />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default StakingBottomSheet;
