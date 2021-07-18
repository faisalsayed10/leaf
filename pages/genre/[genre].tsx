import { Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import GridListSwitch from "@components/ui/GridListSwitch";
import GridViewBook from "@components/view-modes/GridViewBook";
import Layout from "@components/ui/Layout";
import ListViewBook from "@components/view-modes/ListViewBook";
import DefaultLoader from "@components/loader/DefaultLoader";
import { fetcher } from "@lib/fetcher";
import useManualSWR from "@lib/useManualSWR";
import { readableTitle } from "@util/helpers";
import { SearchResponse } from "@util/types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

interface Props {}

const Genre: React.FC<Props> = () => {
  const router = useRouter();
  const genre = router.query.genre as string;
  const [checked, setChecked] = useState(true);
  const { data, isValidating, error } = useManualSWR<SearchResponse>(
    genre ? `/api/genre/${genre}` : null,
    fetcher
  );

  if (error) console.error(error);
  if (isValidating)
    return (
      <Layout pageTitle="Genres">
        <DefaultLoader />
      </Layout>
    );

  return (
    <>
      <Head>
        <title>{readableTitle(genre)}</title>
      </Head>
      <Layout pageTitle={readableTitle(genre)}>
        <Container maxW="container.sm" my="4" px="4">
          <Flex align="center" justify="space-between">
            <Text as="span" display="inline" fontSize="lg">
              {data?.totalItems} results
            </Text>
            <GridListSwitch
              checked={checked}
              handleChange={(bool) => setChecked(bool)}
            />
          </Flex>
          <SimpleGrid
            columns={checked ? 4 : 1}
            spacing={6}
            placeItems="center"
            mt="6"
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
      </Layout>
    </>
  );
};

export default Genre;
