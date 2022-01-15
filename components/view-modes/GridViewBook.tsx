import { Book } from ".prisma/client";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import MoreOptionsMenu from "@components/menus/MoreOptionsMenu";
import { sliceText } from "@util/helpers";
import { Item } from "@util/types";
import { useRouter } from "next/router";
import React from "react";

interface Props {
	book: Item | Book;
}

const GridViewBook: React.FC<Props> = ({ book }) => {
	const router = useRouter();
	return (book as Item).volumeInfo !== undefined ? (
		<Box maxW="130px" cursor="pointer" onClick={() => router.push(`/book/${book.id}`)}>
			<Image
				src={(book as Item).volumeInfo?.imageLinks?.thumbnail || ""}
				alt={sliceText((book as Item).volumeInfo.title, 50)}
				fallbackSrc="/no-thumbnail.png"
				minW="130px"
				h="180px"
			/>
			<Flex align="center" justifyContent="space-between" w="full">
				<Text isTruncated={true} fontSize="sm" textAlign="center">
					{(book as Item).volumeInfo.title}
				</Text>
				<MoreOptionsMenu data={book} />
			</Flex>
		</Box>
	) : (
		<Box
			maxW="130px"
			cursor="pointer"
			onClick={() => router.push(`/book/${(book as Book).gbookId}`)}
		>
			<Image
				// @ts-ignore
				src={(book as Book)?.imageLinks?.thumbnail || ""}
				alt={sliceText((book as Book).title, 50)}
				fallbackSrc="/no-thumbnail.png"
				minW="130px"
				h="180px"
			/>
			<Flex align="center" justifyContent="space-between" w="full">
				<Text isTruncated={true} fontSize="sm" textAlign="left">
					{(book as Book).title}
				</Text>
				<MoreOptionsMenu data={book} />
			</Flex>
		</Box>
	);
};

export default GridViewBook;
