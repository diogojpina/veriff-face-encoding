import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  encode: number[];
}

export default function FaceEncodeModal({ isOpen, onClose, encode }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Encode</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{JSON.stringify(encode)}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
