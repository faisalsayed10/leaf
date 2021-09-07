import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from "@chakra-ui/menu";
import { sliceText } from "@util/helpers";
import { Item } from "@util/types";
import Link from "next/link";
import React from "react";
import { BiCheck, BiCopy, BiHeart } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";

interface Props {
	book: Item;
}

const Book: React.FC<Props> = ({ book }) => {
	return (
		<Box maxW="140px" cursor="pointer">
			<Link href={`/book/${book.id}`}>
				<Image
					src={book.volumeInfo?.imageLinks?.thumbnail || ""}
					alt={sliceText(book.volumeInfo.title, 50)}
					fallbackSrc="/no-thumbnail.png"
					minW="130px"
					h="180px"
					m="0 auto"
				/>
			</Link>
			<Flex align="center">
				<Link href={`/book/${book.id}`}>
					<Text isTruncated={true} fontSize="sm" textAlign="center">
						{book.volumeInfo.title}
					</Text>
				</Link>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="more-options"
						icon={<FiMoreVertical />}
					/>
					<MenuList>
						<MenuItem icon={<BiHeart size="18" />}>Want To Read</MenuItem>
						<MenuItem icon={<BsBookmark size="18" />}>
							Currently Reading
						</MenuItem>
						<MenuItem icon={<BiCheck size="18" />}>Already Read</MenuItem>
						<MenuDivider />
						<MenuItem icon={<MdPlaylistAdd size="18" />}>
							Add To Playlist
						</MenuItem>
						<MenuDivider />
						<MenuItem icon={<BiCopy size="18" />}>Copy Link</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Box>
	);
};

export default Book;
