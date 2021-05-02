import { Image } from "@chakra-ui/image";
import { Box, Container, List, ListItem, SimpleGrid, Text } from "@chakra-ui/layout";
import Layout from "@components/Layout";
import { upperCaseTitle } from "@util/helpers";
import { Book } from "@util/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  data: Book;
}

const WorkPage: React.FC<Props> = ({ data }) => {
  console.log(data);

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Layout>
        <Container>
          <Image
            src={`https://covers.openlibrary.org/b/id/${data.covers[0]}.jpg`}
            width="356px"
            height="500px"
          />
          <Text
            fontSize="3xl"
            mt="8"
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="500"
            align="center"
          >
            {data.title}
          </Text>
        </Container>
        {/* <Text
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
        </Text> */}
        {/* <SimpleGrid columns={5} my="8" spacing={6} placeItems="center">
          {data.works.map((work) => (
            <Book key={work.key} book={work} />
          ))}
        </SimpleGrid> */}
        {/* <Box mx="8">
          <Text as="h1" fontSize="2xl" textTransform="uppercase">
            Related Authors
          </Text>
          <List mt="8">
            {data.authors?.map((author) => (
              <Link href={author.key}>
                <ListItem cursor="pointer" color="blue.800" key={author.key}>
                  {author.name} - {author.count} books
                </ListItem>
              </Link>
            ))}
          </List>
        </Box> */}
      </Layout>
    </>
  );
};

export default WorkPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<Book>(
    `https://openlibrary.org/books/${context.params.work_id}.json`
  );

  return {
    props: { data },
  };
};
