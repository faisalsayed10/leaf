import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Work } from "@util/types";
import React from "react";
import Book from "./Book";

interface Props {
  title: string;
  books: Work[];
}

const SubjectSection: React.FC<Props> = ({ title, books }) => {
  const upperCaseTitle = (title: string) =>
    title?.split(" ")
      .map((elem) => elem[0].toUpperCase() + elem.slice(1))
      .join(" ");

  return (
    <Box mx={['4', '8', '16']} my="8">
      <Text as="h1" fontSize="2xl">
        {upperCaseTitle(title)}
      </Text>
      <Flex>
        {books.map((book) => (
          <Book key={book.key} book={book} />
        ))}
      </Flex>
    </Box>
  );
};

export default SubjectSection;
