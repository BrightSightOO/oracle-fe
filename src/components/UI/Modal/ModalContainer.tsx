import { useTheme, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';

export interface ModalProps {
  children?: React.ReactChild;
  isOpen: boolean;
  onClose: () => void;
}

const ModalContainer = ({ children, isOpen, onClose }: ModalProps) => {
  const theme = useTheme();
  const { backgroundCard } = theme.colors;

  return (
    <Modal //modal container
      isOpen={isOpen}
      onClose={onClose}
      size='xl'
    >
      <ModalOverlay />
      <ModalContent bg={backgroundCard}>{children}</ModalContent>
    </Modal>
  );
};

export default ModalContainer;
