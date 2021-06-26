import { Box, Flex, Text } from "@chakra-ui/layout";
import { readableTitle } from "@util/helpers";
import { SearchItem } from "@util/types";
import Link from "next/link";
import React from "react";
import Book from "./GridViewBook";

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
          ml="4"
          display="inline"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          fontSize="xl"
        >
          {readableTitle(title)}
        </Text>
      </Link>
      <Flex mt="2" justify="space-evenly" w="container.md">
        {books
          ?.filter((item) => item.volumeInfo.hasOwnProperty("imageLinks"))
          ?.slice(0, 5)
          ?.map((book) => (
            <Book key={book.etag} book={book} />
          ))}
      </Flex>
    </Box>
  );
};

export default GenreRow;
