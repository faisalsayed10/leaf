import { Box, Flex, Text } from "@chakra-ui/layout";
import { upperCaseTitle } from "@util/helpers";
import { Work } from "@util/types";
import Link from "next/link";
import React from "react";
import Book from "./Book";

interface Props {
  title: string;
  link: string;
  books: Work[];
}

const SubjectSection: React.FC<Props> = ({ title, link, books }) => {
  return (
    <Box my="8">
      <Link href={`/subjects/${link}`}>
        <Text
          display="inline"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          fontSize="2xl"
        >
          {upperCaseTitle(title)}
        </Text>
      </Link>
      <Flex mt="4">
        {books.map((book) => (
          <Book key={book.key} book={book} />
        ))}
      </Flex>
    </Box>
  );
};

export default SubjectSection;
