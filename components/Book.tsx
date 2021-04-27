import { Image } from "@chakra-ui/image";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Work } from "@util/types";
import Link from "next/link";
import React from "react"

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
              ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`
              : `/no-cover.jpg`
          }
          alt={book.title}
          fallbackSrc="/no-cover.jpg"
          crossOrigin="anonymous"
          objectFit="cover"
          w="130px"
          h="200px"
          m="0 auto"
          mb="4"
          // fallback={
          //   <Flex align="center" justify="center" w="130px" h="200px">
          //     <Spinner />
          //   </Flex>
          // }
        />
        <Text isTruncated={true} as="h3" fontSize="md" textAlign="center">
          {book.title}
        </Text>
      </Box>
    </Link>
  );
};

export default Book;
