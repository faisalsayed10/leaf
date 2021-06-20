import React from "react";
import {
  Heading,
  Image,
  Text,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from "@chakra-ui/react";
import Link from "next/link";
import { SearchItem } from "@util/types";
import { sliceText } from "@util/helpers";
import { FiMoreVertical } from "react-icons/fi";
import { BiBookAlt, BiBook, BiCopy } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";

interface Props {
  book: SearchItem;
}

const ListViewBook: React.FC<Props> = ({ book }) => {
  return (
    <Flex justify="space-between" width="100%" my="4">
      <Link href={`/book/${book.id}`}>
        <Flex cursor="pointer">
          <Image
            src={book.volumeInfo?.imageLinks?.thumbnail || ""}
            alt={sliceText(book.volumeInfo.title, 50)}
            objectFit="cover"
            minW="130px"
            maxW="130px"
            h="200px"
            mr="6"
          />
          <Flex direction="column" mt="3">
            <Heading as="h4" size="md">
              {sliceText(book.volumeInfo.title, 50)}
            </Heading>
            <Text color="gray.700" fontSize="md">
              {book.volumeInfo.authors?.length > 0
                ? sliceText(book.volumeInfo.authors[0], 75)
                : "Anonymous"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {book.volumeInfo.description
                ? sliceText(book.volumeInfo.description, 100)
                : "No Description Available..."}
            </Text>
          </Flex>
        </Flex>
      </Link>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="more-options"
          icon={<FiMoreVertical />}
        />
        <MenuList>
          <MenuItem icon={<BiBookAlt size="18" />}>Want To Read</MenuItem>
          <MenuItem icon={<BsBookmark size="18" />}>Currently Reading</MenuItem>
          <MenuItem icon={<BiBook size="18" />}>Already Read</MenuItem>
          <MenuDivider />
          <MenuItem icon={<MdPlaylistAdd size="18" />}>Add To Playlist</MenuItem>
          <MenuDivider />
          <MenuItem icon={<BiCopy size="18" />}>Copy Link</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ListViewBook;
