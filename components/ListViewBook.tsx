import React from "react";
import { Heading, Image, Text, Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { SearchItem } from "@util/types";
import { sliceText } from "@util/helpers";
import { FiMoreVertical } from "react-icons/fi"

interface Props {
  book: SearchItem;
}

const ListViewBook: React.FC<Props> = ({ book }) => {
  return (
    <Flex justify="space-between" width="100%">
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
      <IconButton aria-label="more-options" icon={<FiMoreVertical />} />
    </Flex>
  );
};

export default ListViewBook;
