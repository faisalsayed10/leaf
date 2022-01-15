import { Book } from ".prisma/client";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import MoreOptionsMenu from "@components/menus/MoreOptionsMenu";
import { sliceText } from "@util/helpers";
import { Item } from "@util/types";
import { useRouter } from "next/router";
import React from "react";

interface Props {
	book: Item | Book;
}

const ListViewBook: React.FC<Props> = ({ book }) => {
	const router = useRouter();
	return (book as Item).volumeInfo !== undefined ? (
		<Flex
			justify="space-between"
			width="100%"
			maxH={["150px", "180px", "180px"]}
			mb="2"
			onClick={() => router.push(`/book/${book.id}`)}
			cursor="pointer"
		>
			<Flex>
				<Image
					src={(book as Item).volumeInfo?.imageLinks?.thumbnail || ""}
					alt={sliceText((book as Item).volumeInfo.title, 50)}
					fallbackSrc="/no-thumbnail.png"
					minW={["100px", "130px", "130px"]}
					maxW={["100px", "130px", "130px"]}
					h={["150px", "180px", "180px"]}
					mr={["2", "6", "6"]}
				/>
				<Flex direction="column" mt="3">
					<Heading as="h4" size="md" noOfLines={3}>
						{sliceText((book as Item).volumeInfo.title, 50)}
					</Heading>
					<Text color="gray.700" fontSize="md" isTruncated>
						{(book as Item).volumeInfo.authors?.length > 0
							? sliceText((book as Item).volumeInfo.authors[0], 75)
							: "Anonymous"}
					</Text>
					<Text fontSize="sm" color="gray.500" noOfLines={5}>
						{(book as Item).volumeInfo.description
							? sliceText((book as Item).volumeInfo.description, 100)
							: "No Description Available..."}
					</Text>
				</Flex>
			</Flex>
			<MoreOptionsMenu data={book} />
		</Flex>
	) : (
		<Flex
			justify="space-between"
			width="100%"
			maxH={["150px", "180px", "180px"]}
			mb="2"
			onClick={() => router.push(`/book/${(book as Book).gbookId}`)}
			cursor="pointer"
		>
			<Flex>
				<Image
					// @ts-ignore
					src={(book as Book)?.imageLinks?.thumbnail || ""}
					alt={sliceText((book as Book).title, 50)}
					fallbackSrc="/no-thumbnail.png"
					minW={["100px", "130px", "130px"]}
					maxW={["100px", "130px", "130px"]}
					h={["150px", "180px", "180px"]}
					mr={["2", "6", "6"]}
				/>
				<Flex direction="column" mt="3">
					<Heading as="h4" size="md" isTruncated>
						{sliceText((book as Book).title, 50)}
					</Heading>
					<Text color="gray.700" fontSize="md" isTruncated>
						{(book as Book).authors?.length > 0
							? sliceText((book as Book).authors[0], 75)
							: "Anonymous"}
					</Text>
					<Text fontSize="sm" color="gray.500" noOfLines={5}>
						{(book as Book).description
							? sliceText((book as Book).description, 100)
							: "No Description Available..."}
					</Text>
				</Flex>
			</Flex>
			<MoreOptionsMenu data={book} />
		</Flex>
	);
};

export default ListViewBook;
