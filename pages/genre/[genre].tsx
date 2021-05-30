import { Container, SimpleGrid, Text } from "@chakra-ui/layout";
import Book from "@components/Book";
import Layout from "@components/Layout";
import { BASE_URL } from "@lib/constants";
import { readableTitle } from "@util/helpers";
import { SearchResponse } from "@util/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: SearchResponse;
}

const ContainerProps = {
  py: "3",
  mb: "5",
  background: "rgba(255,255,255,0.25)",
  boxShadow: "10px 5px 40px -10px rgba(0,0,0,0.2)",
  borderRadius: "5px",
  style: {
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
  },
};

const Genre: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const genre = router.query.genre as string;

  console.log(data);

  return (
    <>
      <Head>
        <title>{readableTitle(genre)}</title>
      </Head>
      <Layout>
        <Container maxW="container.sm" {...ContainerProps} my="4" px="4">
          <Text
            fontSize="3xl"
            mt="4"
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
          <SimpleGrid columns={4} spacing={6} placeItems="center">
            {data.items
              .filter((item) => item.volumeInfo.hasOwnProperty("imageLinks"))
              .map((book) => (
                <Book key={book.id} book={book} />
              ))}
          </SimpleGrid>
        </Container>
      </Layout>
    </>
  );
};

export default Genre;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<SearchResponse>(
    `${BASE_URL}/volumes?q=subject:${context.params.genre}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=30`
  );

  return {
    props: { data },
  };
};
