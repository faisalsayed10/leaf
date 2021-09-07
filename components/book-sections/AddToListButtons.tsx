import { List, ListType } from ".prisma/client";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import AuthModal from "@components/modals/AuthModal";
import CreateListModal from "@components/modals/CreateListModal";
import { toCapitalizedWords } from "@util/helpers";
import { Item } from "@util/types";
import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrAdd } from "react-icons/gr";
import { MdPlaylistAdd } from "react-icons/md";
import useSWR from "swr";

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
		onClose: onCloseCreateList,
	} = useDisclosure();
	const {
		data: lists,
		error,
		isValidating,
	} = useSWR<List[]>(session ? "/api/lists" : null);

	const addBookToList = async (listId?: string, listType?: ListType) => {
		try {
			setLoading(true);
			const res = axios.post<List>("/api/list/add", {
				listId,
				listType,
				gbookId: data.id,
				title: data.volumeInfo.title,
				authors: data.volumeInfo.authors,
				publishedDate: data.volumeInfo.publishedDate,
				previewLink: data.volumeInfo.previewLink,
				imageLinks: data.volumeInfo.imageLinks,
			});

			toast.promise(
				res,
				{
					loading: "Creating your list ⏳",
					success: `Added to ${toCapitalizedWords(listType)}`,
					error: `Aw man! An error occurred while adding. Maybe, try again later? 😭`,
				},
				{
					style: {
						minWidth: "250px",
					},
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
			<Flex
				as={ButtonGroup}
				variant="outline"
				justify="space-evenly"
				mb="1"
				mx="4"
			>
				<Button
					onClick={() => {
						if (isSessionLoading) return;
						session?.user ? addBookToList(null, "wantToRead") : onOpen();
					}}
					disabled={loading}
				>
					Want To Read
				</Button>
				<Button
					onClick={() => {
						if (isSessionLoading) return;
						session?.user ? addBookToList(null, "currentlyReading") : onOpen();
					}}
					disabled={loading}
				>
					Currently Reading
				</Button>
				<Button
					onClick={() => {
						if (isSessionLoading) return;
						session?.user ? addBookToList(null, "alreadyRead") : onOpen();
					}}
					disabled={loading}
				>
					Already Read
				</Button>
				<Box>
					<Menu>
						<MenuButton
							borderRadius="md"
							as={IconButton}
							aria-label="Add to playlist"
							icon={<Icon as={MdPlaylistAdd} boxSize={5} />}
						/>
						<MenuList>
							{error && !isValidating && !data ? (
								<MenuItem>Error loading your lists</MenuItem>
							) : lists?.length > 0 ? (
								<>
									{lists.map((list) => (
										<MenuItem
											key={list.id}
											icon={<Icon as={MdPlaylistAdd} boxSize={5} />}
										>
											{list.name}
										</MenuItem>
									))}
									<MenuDivider />
									<MenuItem
										onClick={onOpenCreateList}
										icon={<Icon as={GrAdd} boxSize={5} />}
									>
										Create a new list
									</MenuItem>
								</>
							) : (
								<>
									<MenuItem isDisabled>No lists found</MenuItem>
									{isSessionLoading ? (
										<>
											<MenuDivider />
											<MenuItem isDisabled>Just a second...</MenuItem>
										</>
									) : session?.user ? (
										<>
											<MenuDivider />
											<MenuItem onClick={onOpenCreateList} icon={<GrAdd />}>
												Create a new list
											</MenuItem>
										</>
									) : null}
								</>
							)}
						</MenuList>
					</Menu>
				</Box>
			</Flex>
			<AuthModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
			<CreateListModal
				onClose={onCloseCreateList}
				onOpen={onOpenCreateList}
				isOpen={isOpenCreateList}
				book={{
					gbookId: data?.id,
					title: data?.volumeInfo?.title,
					authors: data?.volumeInfo?.authors,
					publishedDate: data?.volumeInfo?.publishedDate,
					previewLink: data?.volumeInfo?.previewLink,
					imageLinks: data?.volumeInfo?.imageLinks,
				}}
			/>
		</>
	);
};

export default AddToList;
