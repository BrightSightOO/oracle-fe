import { MainColorSet } from '@/theme/types';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalProps,
	useTheme,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ModalContainerProps {
	children?: ReactNode;
	isOpen: boolean;
	isOutsideScroll?: boolean;
	onClose: () => void;
}

const ModalContainer = ({
	children,
	isOpen,
	isOutsideScroll = true,
	onClose,
	...props
}: ModalContainerProps & ModalProps) => {
	const theme = useTheme();
	const { backgroundMain } = theme.colors as MainColorSet;

	return (
		<Modal //modal container
			isOpen={isOpen}
			onClose={onClose}
			size='xl'
			isCentered
			scrollBehavior={isOutsideScroll ? 'outside' : 'inside'}
			{...props}
		>
			<ModalOverlay />
			<ModalContent
				bg={backgroundMain}
				position={{ base: 'fixed', sm: 'relative' }}
				bottom={{ base: '0px', sm: 'auto' }}
				mb={{ base: '0', sm: 'auto' }}
				p='6'
				borderRadius={{ base: '1.75rem 1.75rem 0px 0px', sm: '1rem' }}
			>
				<ModalBody sx={theme.customScroll} p='0'>
					{children}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ModalContainer;
