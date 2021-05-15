import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import AddToList from "@components/AddToList";
import BuyOptions from "@components/BuyOptions";
import Categories from "@components/Categories";
import Layout from "@components/Layout";
import { readableTitle, upperCaseTitle } from "@util/helpers";
import { SearchItem } from "@util/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";

interface Props {
  data: SearchItem;
}

const BoxProps = {
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

const BookPage: React.FC<Props> = ({ data }) => {
  const [thumbnail] = useState(
    data.volumeInfo.imageLinks.medium ||
      data.volumeInfo.imageLinks.small ||
      data.volumeInfo.imageLinks.thumbnail
  );

  console.log(data);

  return (
    <>
      <Head>
        <title>Libook | {data.volumeInfo.title}</title>
      </Head>
      <Layout>
        <Container mt="8" borderRadius="lg">
          <Flex {...BoxProps} justify="space-evenly" align="center">
            <Image src={thumbnail} maxW="100px" />
            <Box>
              <Text fontSize="2xl" fontWeight="500" align="center">
                {data.volumeInfo.title}
              </Text>
              {data.volumeInfo.subtitle && (
                <Text
                  fontSize="lg"
                  mt="8"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  color="gray.600"
                  align="left"
                >
                  {data.volumeInfo.subtitle}
                </Text>
              )}
              <Text
                fontSize="md"
                fontWeight="400"
                color="gray.600"
                align="left"
              >
                {data.volumeInfo.authors.map(
                  (author) =>
                    author + (data.volumeInfo.authors.length > 1 ? ", " : "")
                )}
              </Text>
            </Box>
          </Flex>
          <Box {...BoxProps}>
            <AddToList />
          </Box>
          <Box {...BoxProps}>
            <Text px="4">
              <strong>Description:</strong>{" "}
              {`${data.volumeInfo.description}...` ||
                `No description available`}
            </Text>
          </Box>
          <Box px="4" {...BoxProps}>
            {data.volumeInfo.language && (
              <Text>
                <strong>Language:</strong>{" "}
                {upperCaseTitle(data.volumeInfo.language)}
              </Text>
            )}
            {data.volumeInfo.pageCount && (
              <Text>
                <strong>No. of pages:</strong> {data.volumeInfo.pageCount}
              </Text>
            )}
            {data.volumeInfo.publisher && (
              <Text>
                <strong>Publisher:</strong> {data.volumeInfo.publisher}
              </Text>
            )}
            {data.volumeInfo.publishedDate && (
              <Text>
                <strong>Published Date:</strong> {data.volumeInfo.publishedDate}
              </Text>
            )}
            {data.volumeInfo.industryIdentifiers.length > 0 &&
              data.volumeInfo.industryIdentifiers.map((identifier) => (
                <Text>
                  <strong>{readableTitle(identifier.type)}:</strong>{" "}
                  {identifier.identifier}
                </Text>
              ))}
          </Box>
          <Box {...BoxProps}>
            <BuyOptions />
          </Box>
          {data.volumeInfo.categories && (
            <Box {...BoxProps}>
              <Categories categories={data.volumeInfo.categories} />
            </Box>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default BookPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<SearchItem>(
    `https://www.googleapis.com/books/v1/volumes/${context.params.book_id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );

  return {
    props: { data },
  };
};
