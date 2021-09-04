import { ListType } from ".prisma/client";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import AuthModal from "@components/ui/AuthModal";
import { toCapitalizedWords } from "@util/helpers";
import { Item } from "@util/types";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";

interface Props {
	data: Item;
}

const AddToList: React.FC<Props> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [session, isSessionLoading] = useSession();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	const addBookToList = async (listId?: string, listType?: ListType) => {
		try {
			setLoading(true);
			const res = await axios.post("/api/list/add", {
				listId,
				listType,
				gbookId: data.id,
				title: data.volumeInfo.title,
				authors: data.volumeInfo.authors,
				publishedDate: data.volumeInfo.publishedDate,
				previewLink: data.volumeInfo.previewLink,
				imageLinks: data.volumeInfo.imageLinks,
			});

			if (res.status === 200) {
				toast({
					title: `Added to ${toCapitalizedWords(listType)}`,
					duration: 2000,
					isClosable: true,
					status: "success",
				});
			} else {
				toast({
					title: "Error adding to list",
					description: res.data.message,
					duration: 2000,
					isClosable: true,
					status: "error",
				});
			}
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
				<IconButton
					aria-label="Add to playlist"
					icon={<MdPlaylistAdd size="24px" />}
				/>
			</Flex>
			<AuthModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
		</>
	);
};

export default AddToList;
