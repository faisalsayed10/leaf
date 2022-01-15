import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/modal";
import { useRouter } from "next/router";
import React from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, onOpen }) => {
	const router = useRouter();

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Unauthorized Action</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>
						Hey! It seems that your are doing an action which requires authentication. Head over to
						the login page before you proceed further 🚧
					</Text>
				</ModalBody>

				<ModalFooter>
					<Button mr={3} onClick={onClose}>
						Close
					</Button>
					<Button colorScheme="red" onClick={() => router.push("/signin")}>
						Log In
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AuthModal;
