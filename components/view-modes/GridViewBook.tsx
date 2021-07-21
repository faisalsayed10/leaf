import { Image } from "@chakra-ui/image";
import { Box, Text } from "@chakra-ui/layout";
import { sliceText } from "@util/helpers";
import { Item } from "@util/types";
import Link from "next/link";
import React from "react";

interface Props {
  book: Item;
}

const Book: React.FC<Props> = ({ book }) => {
  return (
    <Link href={`/book/${book.id}`}>
      <Box maxW="140px" cursor="pointer">
        <Image
          src={book.volumeInfo?.imageLinks?.thumbnail || ""}
          alt={sliceText(book.volumeInfo.title, 50)}
          fallbackSrc="/no-thumbnail.png"
          minW="145px"
          h="200px"
          m="0 auto"
          mb="4"
        />
        <Text isTruncated={true} as="h3" fontSize="md" textAlign="center">
          {book.volumeInfo.title}
        </Text>
      </Box>
    </Link>
  );
};

export default Book;
