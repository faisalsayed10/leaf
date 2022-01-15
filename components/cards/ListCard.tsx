import { useDisclosure } from "@chakra-ui/hooks";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Badge,
	Box,
	Button,
	Icon,
	IconButton,
	Text
} from "@chakra-ui/react";
import CreateListModal from "@components/modals/CreateListModal";
import { List } from "@prisma/client";
import { ListWithBooks } from "@util/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { useSWRConfig } from "swr";

interface Props {
	list?: ListWithBooks;
	isGeneric?: true;
}

const ListCard: React.FC<Props> = ({ list, isGeneric }) => {
	const router = useRouter();
	const cancelRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
	const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

	return (
		<Box
			onClick={() => (isGeneric ? onOpen() : router.push(`/list/${list.id}`))}
			w={["200px", "175px", "175px", "200px"]}
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bgColor={isGeneric ? "gray.50" : "white"}
			cursor="pointer"
			pos="relative"
		>
			<Box p="4" minH="100">
				<Box d="flex" alignItems="baseline">
					<Badge fontSize="xs" borderRadius="full" px="2" colorScheme={isGeneric ? "blue" : "teal"}>
						{isGeneric
							? "Add"
							: (list?.books?.length || 0) + (list?.books?.length === 1 ? ` book` : ` books`)}
					</Badge>
					<Text
						fontWeight="medium"
						fontSize="sm"
						as="h4"
						lineHeight="tight"
						isTruncated
						ml="2"
						textTransform="uppercase"
					>
						{isGeneric ? "New List" : list.name}
					</Text>
				</Box>

				<Text color="gray.500" fontSize="xs">
					{isGeneric ? "Create a new list" : list.description}
				</Text>
			</Box>
			{!isGeneric ? (
				<>
					<IconButton
						icon={<Icon as={BiEditAlt} />}
						variant="unstyled"
						pos="absolute"
						aria-label="edit-icon"
						bottom="0"
						right="10"
						zIndex="100"
						onClick={(e) => {
							e.stopPropagation();
							onOpenEdit();
						}}
					/>
					<IconButton
						icon={<Icon as={BiTrashAlt} />}
						variant="unstyled"
						pos="absolute"
						aria-label="delete-icon"
						bottom="0"
						right="0"
						zIndex="100"
						onClick={(e) => {
							e.stopPropagation();
							onOpenDelete();
						}}
					/>
				</>
			) : null}
			{isGeneric ? <CreateListModal isOpen={isOpen} onClose={onClose} /> : null}
			{!isGeneric ? (
				<>
					<DeleteDialog
						isOpen={isOpenDelete}
						cancelRef={cancelRef}
						onClose={onCloseDelete}
						id={list.id}
					/>
					<CreateListModal
						isOpen={isOpenEdit}
						onClose={onCloseEdit}
						isEdit={true}
						listId={list.id}
					/>
				</>
			) : null}
		</Box>
	);
};

const DeleteDialog = ({ isOpen, cancelRef, onClose, id }) => {
	const { mutate } = useSWRConfig();
	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Delete List
					</AlertDialogHeader>

					<AlertDialogBody>Are you sure? You cant undo this action afterwards.</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={async () => {
								const { data: lists } = await axios.get<List[]>("/api/lists");
								const res = axios.delete(`/api/list?id=${id}`);

								mutate(
									`/api/lists`,
									lists.filter((list) => list.id != id),
									false
								);

								toast.promise(
									res,
									{
										loading: "Deleting list ⏳",
										success: `List deleted successfully!`,
										error: `Aw man! Something went wrong 😭`
									},
									{ style: { minWidth: "250px" } }
								);

								onClose();
							}}
							ml={3}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default ListCard;
