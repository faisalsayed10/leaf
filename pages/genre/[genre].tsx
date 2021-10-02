import { Container, SimpleGrid, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import DefaultLoader from "@components/loader/DefaultLoader";
import GridListSwitch from "@components/ui/GridListSwitch";
import GridViewBook from "@components/view-modes/GridViewBook";
import ListViewBook from "@components/view-modes/ListViewBook";
import useManualSWR from "@lib/useManualSWR";
import { readableTitle } from "@util/helpers";
import { SearchResponse } from "@util/types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {}

const Genre: React.FC<Props> = () => {
  const router = useRouter();
  const genre = router.query.genre as string;
  const [checked, setChecked] = useState(true);
  const { data, isValidating, error } = useManualSWR<SearchResponse>(
    genre ? `/api/genre/${genre}` : null
  );

  if (error) console.error(error);
  if (isValidating) return <DefaultLoader />;

  return (
    <>
      <Head>
        <title>Libook {genre ? `- ${readableTitle(genre)}` : ""}</title>
      </Head>
      <Container
        maxW={["container.sm", "container.sm", "container.md"]}
        my="4"
        px="4"
      >
        <Flex align="center" justify="space-between">
          <Text as="span" display="inline" fontSize="lg">
            {data?.totalItems} results
          </Text>
          <GridListSwitch checked={checked} handleChange={setChecked} />
        </Flex>
        <SimpleGrid
          columns={checked ? 1 : null}
          mt="6"
          minChildWidth={checked ? "140px" : null}
          gap={[1, 2, 3]}
          placeItems="center"
        >
          {data?.items
            ?.filter((item) => item.volumeInfo.hasOwnProperty("imageLinks"))
            ?.map((book) => {
              return checked ? (
                <GridViewBook key={book.etag} book={book} />
              ) : (
                <ListViewBook key={book.etag} book={book} />
              );
            })}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Genre;
