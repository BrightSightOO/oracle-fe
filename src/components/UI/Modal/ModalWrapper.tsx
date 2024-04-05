import React, { useState } from 'react';
import {
  BoxProps,
  Button,
  Flex,
  HStack,
  Link,
  Spinner,
  Text,
  VStack,
  chakra,
  useTheme,
} from '@chakra-ui/react';
import { logError } from '@/utils/error.utils';
import { MainColorSet } from '@/theme/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCircleCheck,
  faCircleXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const GradientButton = chakra(Button, {
  baseStyle: {
    bg: 'bluePrimary',
    color: 'white',
    _hover: {
      bg: 'darkBlue',
    },
    borderRadius: '12px',
    fontFamily: 'NeueHaas',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    minW: '144px',
    h: '34px',
    mb: '20px',
  },
});

export enum ModalState {
  Awaiting = 'AWAITING',
  Loading = 'LOADING',
  Confirmed = 'CONFIRMED',
  Rejected = 'REJECTED',
}

export interface ModalProps {
  background?: string;
  header: string;
  buttonText?: string;
  // Option to override the main button component
  renderMainButton?: (
    onMainFunction: () => Promise<void>,
  ) => BoxProps['children'];
  actionText?: React.ReactChild;
  children?: React.ReactChild;
  mainButtonDisabled?: boolean;
  initialModalState?: ModalState;
  onClickMain: () => void;
  onClose: () => void;
  onShare?: () => void;
  onViewExplorer?: () => void;
  onBack?: () => void;
  showChildren?: boolean;
  hideMainButton?: boolean;
  handleErrorMessage?: (error: any) => void;
  description?: React.ReactNode;
  shareContent?: string;
}

const ModalWrapper = ({
  header,
  description,
  buttonText,
  shareContent,
  renderMainButton: renderMainButton,
  actionText,
  children,
  mainButtonDisabled,
  initialModalState,
  onClose,
  onClickMain,
  onShare,
  onViewExplorer,
  onBack,
  showChildren,
  hideMainButton,
  handleErrorMessage,
}: ModalProps) => {
  const { colors } = useTheme();
  const { bluePrimary, textPrimary, white, redSecondary, redSubdued } =
    colors as MainColorSet;

  const [modalState, setModalState] = useState(
    initialModalState || ModalState.Awaiting,
  );
  const [errorMessage, setErrorMessage] = useState('Please try again');

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
        <Text textStyle='H3' fontWeight='500' color={textPrimary}>
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
      logError(e);
      setErrorMessage(handleErrorMessage ? handleErrorMessage(e) : e.message);
      setModalState(ModalState.Rejected);
    }
  };

  return (
    <Flex
      direction='column'
      w='100%'
      p={{ base: '20px', md: '20px 30px 29px 30px' }}
      pt={{ base: '0', md: '20px' }}
      justifyContent={{ base: 'space-between' }}
      flex={1}
    >
      <Flex justifyContent={{ base: 'space-between', md: 'flex-end' }}>
        {onBack ? (
          <Button
            onClick={() => {
              onBack();
              setModalState(ModalState.Awaiting);
            }}
            display={{ base: 'flex', md: 'none' }}
            background='transparent'
            border='none'
            cursor='pointer'
          >
            <FontAwesomeIcon icon={faArrowLeft} width='15px' border={true} />
            <Text color={textPrimary}>Back</Text>
          </Button>
        ) : (
          <Flex />
        )}
        <Button
          onClick={() => {
            onClose();
            setModalState(ModalState.Awaiting);
          }}
          display='flex'
          background='transparent'
          border='none'
          cursor='pointer'
        >
          <FontAwesomeIcon
            icon={faXmark}
            width='16px'
            color={bluePrimary}
            border={true}
          />
        </Button>
      </Flex>
      <VStack // header
        justifyContent='center'
        width='full'
        gap={2}
      >
        {modalState === ModalState.Confirmed ? (
          <HStack justifyContent='center'>
            <FontAwesomeIcon
              icon={faCircleCheck}
              width='100px'
              color={bluePrimary}
              border={true}
            />
          </HStack>
        ) : (
          headerText()
        )}

        {description && modalState === ModalState.Awaiting ? (
          <Text textStyle='Body'>{description}</Text>
        ) : null}
      </VStack>
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
                <Text
                  textStyle='H3'
                  fontWeight='500'
                  mb='20px'
                  color={textPrimary}
                >
                  Your transaction is in progress
                </Text>
                {showChildren && children}
              </Flex>
            )}
            {modalState === ModalState.Confirmed && (
              <Flex flexDirection='column' alignItems='center'>
                <Text
                  textStyle='H3'
                  color={textPrimary}
                  fontWeight='500'
                  mt='13px'
                  mb='49px'
                >
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
                      {/* <Svg svgType="Share" width="20px" /> */}
                    </Flex>
                  </Link>
                )}
                {onViewExplorer && (
                  <GradientButton onClick={onViewExplorer} color={white}>
                    View on Solana Explorer
                  </GradientButton>
                )}
              </Flex>
            )}
            {modalState === ModalState.Rejected && (
              <Flex flexDirection='column' alignItems='center'>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  width='100px'
                  color={redSecondary}
                  border={true}
                />
                <Text
                  textStyle='H3'
                  fontWeight='500'
                  mt='20px'
                  color={textPrimary}
                >
                  We've encountered an issue
                </Text>
                <Text
                  textStyle='Body'
                  mt='10px'
                  mb='60px'
                  wordBreak='break-all'
                >
                  {errorMessage}
                </Text>
                <GradientButton
                  variant='warning'
                  isDisabled={mainButtonDisabled}
                  bg={redSecondary}
                  _hover={{
                    bg: redSubdued,
                  }}
                  onClick={onMainFunction}
                >
                  Retry
                </GradientButton>
              </Flex>
            )}
          </Flex>
        ) : (
          children
        )}
      </Flex>
      {modalState === ModalState.Awaiting && renderMainButton
        ? renderMainButton(onMainFunction)
        : null}
      {modalState === ModalState.Awaiting &&
        !hideMainButton &&
        !renderMainButton && (
          <Flex //footer
            justifyContent='center'
            alignItems='center'
            mt='50px'
            pb={{ base: '20px', sm: '0' }}
          >
            <GradientButton
              isDisabled={mainButtonDisabled}
              h='34px'
              onClick={onMainFunction}
            >
              {buttonText}
            </GradientButton>
          </Flex>
        )}
    </Flex>
  );
};

export default ModalWrapper;
