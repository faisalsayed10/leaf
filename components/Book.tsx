import { Image } from "@chakra-ui/image";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Work } from "@util/types";
import Link from "next/link";
import React from "react";

interface Props {
  book: Work;
}

const Book: React.FC<Props> = ({ book }) => {
  return (
    <Link href={book.key}>
      <Box maxW="130px" mr="8" cursor="pointer">
        <Image
          src={
            book.cover_edition_key
              ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`
              : `/no-cover.jpg`
          }
          alt={book.title}
          // fallbackSrc="/no-cover.jpg"
          crossOrigin="anonymous"
          objectFit="cover"
          minW="130px"
          h="200px"
          m="0 auto"
          mb="4"
          fallback={
            <Flex
              align="center"
              justify="center"
              flexDir="column"
              minW="130px"
              h="200px"
              border="1px solid #000"
            >
              <Text isTruncated={true} as="h3" fontSize="md" textAlign="center">
                {book.title.split("").slice(0, 10).join("")}...
              </Text>
              <Text isTruncated={true} as="p" fontSize="sm" textAlign="center">
                {book.authors[0].name.split("").slice(0, 10).join("")}...
              </Text>
            </Flex>
          }
        />
        <Text isTruncated={true} as="h3" fontSize="md" textAlign="center">
          {book.title}
        </Text>
      </Box>
    </Link>
  );
};

export default Book;
