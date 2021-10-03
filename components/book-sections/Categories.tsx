import { Button } from "@chakra-ui/button";
import { Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { readableTitle } from "@util/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdLibraryBooks } from "react-icons/md";

interface Props {
  categories: string[];
}

const Categories: React.FC<Props> = ({ categories }) => {
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const flattened = categories.map((categ) => categ.split(" / ")).flat();
    const unique = [...new Set(flattened)].map((c) =>
      c.toLowerCase().replace(/\s/gi, "_")
    );
    setUniqueCategories(unique);
  }, [categories]);

  return (
    <>
      <Text fontSize="lg" align="center" fontWeight="600" my="1">
        Related Genres
      </Text>
      <Wrap spacing={3} align="center" justify="start" mx="4">
        {uniqueCategories.map((genre) => (
          <Link href={`/genre/${genre}`} key={genre} passHref>
            <Button
              as={WrapItem}
              leftIcon={<MdLibraryBooks size={24} />}
              variant="outline"
              _hover={{ transform: "scale(1.05)" }}
              transitionDuration="300ms"
              cursor="pointer"
            >
              {readableTitle(genre)}
            </Button>
          </Link>
        ))}
      </Wrap>
    </>
  );
};

export default Categories;
