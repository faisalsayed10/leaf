import { List, ListType } from ".prisma/client";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ListMenu from "@components/menus/ListMenu";
import AuthModal from "@components/modals/AuthModal";
import CreateListModal from "@components/modals/CreateListModal";
import { toCapitalizedWords } from "@util/helpers";
import { Item } from "@util/types";
import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
	data: Item;
}

const AddToList: React.FC<Props> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [session, isSessionLoading] = useSession();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenCreateList,
		onOpen: onOpenCreateList,
		onClose: onCloseCreateList
	} = useDisclosure();

	const addBookToList = async (listId?: string, listType?: ListType) => {
		try {
			setLoading(true);
			const res = axios.post<List>("/api/list/add", {
				listId,
				listType,
				gbookId: data.id,
				title: data.volumeInfo.title,
				description: data.volumeInfo.description,
				authors: data.volumeInfo.authors,
				publishedDate: data.volumeInfo.publishedDate,
				previewLink: data.volumeInfo.previewLink,
				imageLinks: data.volumeInfo.imageLinks
			});

			toast.promise(
				res,
				{
					loading: "Creating your list ⏳",
					success: `Added to ${toCapitalizedWords(listType)}`,
					error: `Aw man! An error occurred while adding. Maybe, try again later? 😭`
				},
				{
					style: {
						minWidth: "250px"
					}
				}
			);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Text fontSize="lg" align="center" fontWeight="600" my="1">
				Add To List
			</Text>
			<Flex as={ButtonGroup} variant="outline" justify="space-evenly" mb="1" mx="4">
				<Button
					onClick={() => {
						if (isSessionLoading) return;
						session?.user ? addBookToList(null, "wantToRead") : onOpen();
					}}
					disabled={loading}>
					Want To Read
				</Button>
				<Button
					onClick={() => {
						if (isSessionLoading) return;
						session?.user ? addBookToList(null, "currentlyReading") : onOpen();
					}}
					disabled={loading}>
					Currently Reading
				</Button>
				<Button
					onClick={() => {
						if (isSessionLoading) return;
						session?.user ? addBookToList(null, "alreadyRead") : onOpen();
					}}
					disabled={loading}>
					Already Read
				</Button>
				<Box>
					<ListMenu onOpen={onOpenCreateList} data={data} addBookToList={addBookToList} />
				</Box>
			</Flex>
			<AuthModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
			<CreateListModal
				onClose={onCloseCreateList}
				isOpen={isOpenCreateList}
				book={{
					gbookId: data?.id,
					title: data?.volumeInfo?.title,
					description: data?.volumeInfo?.description,
					authors: data?.volumeInfo?.authors,
					publishedDate: data?.volumeInfo?.publishedDate,
					previewLink: data?.volumeInfo?.previewLink,
					imageLinks: data?.volumeInfo?.imageLinks
				}}
			/>
		</>
	);
};

export default AddToList;
