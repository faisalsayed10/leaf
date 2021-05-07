import {
  Box,
  Container,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import Book from "@components/Book";
import Layout from "@components/Layout";
import { readableTitle, upperCaseTitle } from "@util/helpers";
import { SearchResponse } from "@util/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: SearchResponse;
}

const Genre: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const genre = router.query.genre as string;

  return (
    <>
      <Head>
        <title>{readableTitle(genre)}</title>
      </Head>
      <Layout>
        <Container
          maxW="container.sm"
          backgroundColor="white"
          borderRadius="lg"
          boxShadow="lg"
          my="4"
          px="4"
        >
          <Text
            fontSize="3xl"
            mt="8"
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="500"
            align="center"
          >
            {readableTitle(genre)} -{" "}
            <Text as="span" display="inline" fontSize="xl">
              {data.totalItems} results
            </Text>
          </Text>
          {/* <Container my="8"> */}
          <SimpleGrid columns={4} m="4" spacing={6} placeItems="center">
            {data.items.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </SimpleGrid>
          {/* </Container> */}
        </Container>
      </Layout>
    </>
  );
};

export default Genre;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<SearchResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${context.params.genre}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=30`
  );

  return {
    props: { data },
  };
};
