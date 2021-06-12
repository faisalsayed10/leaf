import React from "react";
import { Heading, Image, Text, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { SearchItem } from "@util/types";
import { sliceText } from "@util/helpers";

interface Props {
  book: SearchItem;
}

const ListViewBook: React.FC<Props> = ({ book }) => {
  return (
    <Link href={`/book/${book.id}`}>
      <Flex justify="space-between" width="100%">
        <Flex align="center">
          <Image
            src={book.volumeInfo?.imageLinks?.thumbnail || ""}
            alt={sliceText(book.volumeInfo.title, 50)}
            objectFit="cover"
            minW="130px"
            maxW="130px"
            h="200px"
            mr="6"
          />
          <Flex direction="column">
            <Heading as="h4" size="md">
              {sliceText(book.volumeInfo.title, 50)}
            </Heading>
            <Text color="gray.700" fontSize="md">
              {book.volumeInfo.authors?.length > 1 ? sliceText(book.volumeInfo.authors[0], 75) : "Anonymous"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {book.volumeInfo.description
                ? sliceText(book.volumeInfo.description, 100)
                : "No Description Available..."}
            </Text>
          </Flex>
        </Flex>
        <Button>HAM</Button>
      </Flex>
    </Link>
  );
};

export default ListViewBook;
