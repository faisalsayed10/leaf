import { Book, List } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	book?: Omit<Book, "id">;
}

const CreateListModal: React.FC<Props> = ({
	isOpen,
	onClose,
	onOpen,
	book,
}) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const createList = async () => {
		try {
			if (name.trim() === "") return toast.error("Name field is required.");
			const res = axios.post<List>("/api/list", {
				name,
				description,
				book,
			});

			toast.promise(
				res,
				{
					loading: "Creating your list ⏳",
					success: ({ data }) =>
						`Successfully added book to your new list: ${data.name}`,
					error: `Aw man! Something went wrong and your list wasn't created 😭`,
				},
				{
					style: {
						minWidth: "250px",
					},
				}
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create A List</ModalHeader>
				<ModalCloseButton />
				<ModalBody as="form">
					<Flex align="start" flexDir="column" justify="center">
						<FormControl mb="6" isRequired>
							<FormLabel mb="0">Name</FormLabel>
							<Input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								variant="flushed"
								placeholder="Awesome Books 😎"
								maxLength={100}
							/>
						</FormControl>
						<FormControl>
							<FormLabel mb="0">Description</FormLabel>
							<Input
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								variant="flushed"
								placeholder="This is my list of awesome books"
								maxLength={250}
							/>
							<FormHelperText>
								Optional text to describe your list
							</FormHelperText>
						</FormControl>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button variant="ghost" mr={3} onClick={onClose}>
						Close
					</Button>
					<Button colorScheme="blue" onClick={createList}>
						Create ✨
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateListModal;
