import { Book } from ".prisma/client";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import MoreOptionsMenu from "@components/ui/MoreOptionsMenu";
import { sliceText } from "@util/helpers";
import { Item } from "@util/types";
import Link from "next/link";
import React from "react";

interface Props {
	book: Item | Book;
}

const ListViewBook: React.FC<Props> = ({ book }) => {
	return (book as Item).volumeInfo !== undefined ? (
		<Flex justify="space-between" width="100%" mb="2">
			<Link href={`/book/${book.id}`}>
				<Flex cursor="pointer">
					<Image
						src={(book as Item).volumeInfo?.imageLinks?.thumbnail || ""}
						alt={sliceText((book as Item).volumeInfo.title, 50)}
						fallbackSrc="/no-thumbnail.png"
						minW="145px"
						maxW="145px"
						h="200px"
						mr="6"
					/>
					<Flex direction="column" mt="3">
						<Heading as="h4" size="md">
							{sliceText((book as Item).volumeInfo.title, 50)}
						</Heading>
						<Text color="gray.700" fontSize="md">
							{(book as Item).volumeInfo.authors?.length > 0
								? sliceText((book as Item).volumeInfo.authors[0], 75)
								: "Anonymous"}
						</Text>
						<Text fontSize="sm" color="gray.500">
							{(book as Item).volumeInfo.description
								? sliceText((book as Item).volumeInfo.description, 100)
								: "No Description Available..."}
						</Text>
					</Flex>
				</Flex>
			</Link>
			<MoreOptionsMenu />
		</Flex>
	) : (
		<Flex justify="space-between" width="100%" mb="2">
			<Link href={`/book/${(book as Book).gbookId}`}>
				<Flex cursor="pointer">
					<Image
						// @ts-ignore
						src={(book as Book)?.imageLinks?.thumbnail || ""}
						alt={sliceText((book as Book).title, 50)}
						fallbackSrc="/no-thumbnail.png"
						minW="145px"
						maxW="145px"
						h="200px"
						mr="6"
					/>
					<Flex direction="column" mt="3">
						<Heading as="h4" size="md">
							{sliceText((book as Book).title, 50)}
						</Heading>
						<Text color="gray.700" fontSize="md">
							{(book as Book).authors?.length > 0
								? sliceText((book as Book).authors[0], 75)
								: "Anonymous"}
						</Text>
						<Text fontSize="sm" color="gray.500">
							{(book as Book).description
								? sliceText((book as Book).description, 100)
								: "No Description Available..."}
						</Text>
					</Flex>
				</Flex>
			</Link>
			<MoreOptionsMenu />
		</Flex>
	);
};

export default ListViewBook;
