import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import AddToList from "@components/AddToList";
import BookPageInfo from "@components/BookPageInfo";
import BuyOptions from "@components/BuyOptions";
import Categories from "@components/Categories";
import Layout from "@components/Layout";
import { readableTitle, upperCaseTitle } from "@util/helpers";
import { SearchItem } from "@util/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import ReadMoreLess from "react-read-more-read-less";
import striptags from "striptags";

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
    // data.volumeInfo.imageLinks.medium ||
    //   data.volumeInfo.imageLinks.small ||
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
            <Image src={thumbnail} maxW="100px" mx="4" />
            <Box w="50%">
              <Text fontSize="xl" fontWeight="500" align="center">
                {data.volumeInfo.title}
              </Text>
              {data.volumeInfo.subtitle && (
                <Text fontSize="md" color="gray.700" align="center">
                  {data.volumeInfo.subtitle}
                </Text>
              )}
              <Text
                fontSize="md"
                fontWeight="400"
                color="gray.500"
                align="center"
              >
                {data.volumeInfo.authors.map((author, i) => {
                  const length = data.volumeInfo.authors.length;
                  return author + (length > 1 && i !== length - 1 ? ", " : "");
                })}
              </Text>
            </Box>
          </Flex>
          <Box {...BoxProps}>
            <AddToList />
          </Box>
          <Box {...BoxProps}>
            <Text px="4">
              <strong>Description:</strong>{" "}
              {data.volumeInfo.description ? (
                <ReadMoreLess
                  charLimit={250}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                  readMoreClassName="readmoreless"
                  readLessClassName="readmoreless"
                >
                  {striptags(data.volumeInfo.description, null, " ")}
                </ReadMoreLess>
              ) : (
                `No description available`
              )}
            </Text>
          </Box>
          <Box px="4" {...BoxProps}>
            <BookPageInfo volumeInfo={data.volumeInfo} />
          </Box>
          <Box {...BoxProps}>
            <BuyOptions
              previewLink={`${data.volumeInfo.previewLink}&kptab=getbook`}
              searchStringWithAuthor={`${data.volumeInfo.title} ${data.volumeInfo.authors[0]}`}
              searchString={`${data.volumeInfo.title}`}
            />
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
