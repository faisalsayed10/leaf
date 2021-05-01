import {
  Box,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import Book from "@components/Book";
import Layout from "@components/Layout";
import { upperCaseTitle } from "@util/helpers";
import { GenreExtended } from "@util/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: GenreExtended;
}

const Genre: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{upperCaseTitle(data.name)}</title>
      </Head>
      <Layout>
        <Text
          fontSize="3xl"
          mt="8"
          textTransform="uppercase"
          letterSpacing="wide"
          fontWeight="500"
          align="center"
        >
          {upperCaseTitle(data.name)} -{" "}
          <Text as="span" display="inline" fontSize="xl">
            {data.work_count} books
          </Text>
        </Text>
        <SimpleGrid columns={5} my="8" spacing={6} placeItems="center">
          {data.works.map((work) => (
            <Book key={work.key} book={work} />
          ))}
        </SimpleGrid>
        <Box mx="8">
          <Text as="h1" fontSize="2xl" textTransform="uppercase">
            Related Authors
          </Text>
          <List mt="8">
            {data.authors?.map((author) => (
              <Link href={author.key} key={author.key}>
                <ListItem cursor="pointer" color="blue.800">
                  {author.name} - {author.count} books
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};

export default Genre;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<GenreExtended>(
    `https://openlibrary.org/subjects/${context.params.genre}.json?limit=30&details=true`
  );

  return {
    props: { data },
  };
};
