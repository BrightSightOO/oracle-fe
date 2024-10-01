import { ModalState } from '@/constants/shared';
import { MainColorSet } from '@/theme/types';
import {
	Button,
	Flex,
	HStack,
	IconButton,
	Link,
	Spinner,
	Text,
	useColorModeValue,
	useTheme,
	VStack,
} from '@chakra-ui/react';
import {
	faArrowLeft,
	faCircleCheck,
	faCircleXmark,
	faShare,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';

export interface ModalProps {
	background?: string;
	header: string;
	buttonText: string;
	actionText?: ReactNode;
	children?: ReactNode;
	mainButtonDisabled?: boolean;
	onClickMain: () => void;
	onClose?: () => void;
	onShare?: () => void;
	onViewExplorer?: () => void;
	onBack?: () => void;
	showChildren?: boolean;
	hideMainButton?: boolean;
}

const ModalWrapper = ({
	header,
	buttonText,
	actionText,
	children,
	mainButtonDisabled,
	onClose,
	onClickMain,
	onShare,
	onViewExplorer,
	onBack,
	showChildren,
	hideMainButton,
}: ModalProps) => {
	const { colors } = useTheme();
	const {
		bluePrimary,
		backgroundMain,
		greyDark,
		textPrimary,
		pinkPrimary,
		textSecondary,
	} = colors as MainColorSet;
	const [modalState, setModalState] = useState(ModalState.Awaiting);
	const [errorMessage, setErrorMessage] = useState('Please try again');

	const buttonTextColor = useColorModeValue(textSecondary, textPrimary);

	const headerText = () => {
		if (modalState === ModalState.Loading) {
			return '';
		} else if (
			modalState === ModalState.Confirmed ||
			modalState === ModalState.Rejected
		) {
			// shouldn't happen
			return '';
		} else {
			return (
				<Text textStyle='H3' fontWeight='500'>
					{header}
				</Text>
			);
		}
	};

	const onMainFunction = async () => {
		setModalState(ModalState.Loading);
		try {
			await onClickMain();
			setModalState(ModalState.Confirmed);
		} catch (e: any) {
			console.log('Modal transaction error', e);
			setErrorMessage(e.message);
			setModalState(ModalState.Rejected);
		}
	};

	return (
		<VStack
			w='full'
			justifyContent={{ base: 'space-between' }}
			flex={1}
			bg={backgroundMain}
		>
			<HStack
				w='full'
				justifyContent={{ base: 'space-between', md: 'flex-end' }}
			>
				{onBack ? (
					<Button
						onClick={() => {
							onBack();
							setModalState(ModalState.Awaiting);
						}}
						display={{ base: 'flex', md: 'none' }}
						as={IconButton}
						icon={<FontAwesomeIcon icon={faArrowLeft} size='1x' />}
					/>
				) : (
					<Flex />
				)}
				{onClose && (
					<Button
						onClick={() => {
							onClose();
							setModalState(ModalState.Awaiting);
						}}
						as={IconButton}
						icon={<FontAwesomeIcon icon={faXmark} color={greyDark} size='1x' />}
					/>
				)}
			</HStack>
			<Flex // header
				justifyContent='center'
			>
				{modalState === ModalState.Confirmed ? (
					<FontAwesomeIcon icon={faCircleCheck} color={bluePrimary} size='4x' />
				) : (
					headerText()
				)}
			</Flex>
			<Flex //content
				justifyContent='center'
				alignItems='center'
			>
				{modalState !== ModalState.Awaiting ? (
					<Flex justifyContent='center'>
						{modalState === ModalState.Loading && (
							<Flex direction='column' mb='80px'>
								<Flex mt='89px' mb='59px' justifyContent='center'>
									<Spinner color={bluePrimary} size='xl' />
								</Flex>
								<Text textStyle='H3' fontWeight='500' mb='20px'>
									Your transaction is in progress
								</Text>
								{showChildren && children}
							</Flex>
						)}
						{modalState === ModalState.Confirmed && (
							<Flex flexDirection='column' alignItems='center'>
								<Text textStyle='H3' fontWeight='500' mt='13px' mb='49px'>
									Your transaction is complete
								</Text>
								<Flex>{actionText}</Flex>

								{onShare && (
									<Link
										mt='14px'
										mb='55px'
										color={bluePrimary}
										onClick={onShare}
									>
										<Flex>
											<Text textStyle='H6' fontWeight='500' mr='3px'>
												Share
											</Text>
											<FontAwesomeIcon
												icon={faShare}
												size='1x'
												color={bluePrimary}
											/>
										</Flex>
									</Link>
								)}
								{onViewExplorer && (
									<Button
										variant='primaryAction'
										onClick={onViewExplorer}
										color={textPrimary}
									>
										View on Solana Explorer
									</Button>
								)}
							</Flex>
						)}
						{modalState === ModalState.Rejected && (
							<Flex flexDirection='column' alignItems='center'>
								<FontAwesomeIcon
									icon={faCircleXmark}
									color={pinkPrimary}
									size='4x'
								/>
								<Text textStyle='H3' fontWeight='500' mt='20px'>
									Please refresh and check transaction
								</Text>
								<Text
									textStyle='Body'
									mt='10px'
									mb='60px'
									wordBreak='break-all'
								>
									{errorMessage}
								</Text>
								<Button
									disabled={mainButtonDisabled}
									color={textPrimary}
									bg={pinkPrimary}
									onClick={onMainFunction}
								>
									Retry
								</Button>
							</Flex>
						)}
					</Flex>
				) : (
					children
				)}
			</Flex>
			{modalState === ModalState.Awaiting && !hideMainButton && (
				<Flex //footer
					justifyContent='center'
					alignItems='center'
					mt='50px'
					pb={{ base: '20px', sm: '0' }}
				>
					<Button
						variant='primaryAction'
						disabled={mainButtonDisabled}
						color={buttonTextColor}
						onClick={onMainFunction}
					>
						{buttonText}
					</Button>
				</Flex>
			)}
		</VStack>
	);
};

export default ModalWrapper;
