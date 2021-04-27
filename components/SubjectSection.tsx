import { Box, Flex, Text } from "@chakra-ui/layout";
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
  const upperCaseTitle = (title: string) =>
    title
      ?.split(" ")
      .map((elem) => elem[0].toUpperCase() + elem.slice(1))
      .join(" ");

  return (
    <Box my="8">
      <Link href={`/subjects/${link}`}>
        <Text display="inline" cursor="pointer" _hover={{ textDecoration: "underline" }} fontSize="2xl">{upperCaseTitle(title)}</Text>
      </Link>
      <Flex>
        {books.map((book) => (
          <Book key={book.key} book={book} />
        ))}
      </Flex>
    </Box>
  );
};

export default SubjectSection;
