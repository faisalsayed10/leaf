import { Box, Flex, Text } from "@chakra-ui/layout";
import { readableTitle } from "@util/helpers";
import { SearchItem } from "@util/types";
import Link from "next/link";
import React from "react";
import Book from "./Book";

interface Props {
  title: string;
  link: string;
  books: SearchItem[];
}

const GenreRow: React.FC<Props> = ({ title, link, books }) => {
  return (
    <Box my="8">
      <Link href={`/genre/${link}`}>
        <Text
          display="inline"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          fontSize="2xl"
        >
          {readableTitle(title)}
        </Text>
      </Link>
      <Flex mt="4">
        {books?.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Flex>
    </Box>
  );
};

export default GenreRow;
