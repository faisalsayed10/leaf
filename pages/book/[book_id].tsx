import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import AddToList from "@components/book-sections/AddToListButtons";
import BookPageInfo from "@components/book-sections/BookPageInfo";
import BuyOptions from "@components/book-sections/BuyOptions";
import Categories from "@components/book-sections/Categories";
import DefaultLoader from "@components/loader/DefaultLoader";
import useManualSWR from "@lib/useManualSWR";
import { sliceText } from "@util/helpers";
import { Item } from "@util/types";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ReadMoreLess from "react-read-more-read-less";
import striptags from "striptags";

interface Props {}

const BoxProps = {
  py: "3",
  mb: "5",
  background: "rgba(255,255,255,0.25)",
  boxShadow: "10px 5px 40px -10px rgba(0,0,0,0.2)",
  borderRadius: "5px",
};

const BookPage: React.FC<Props> = () => {
  const router = useRouter();
  const id = router.query.book_id;
  const { data, isValidating, error } = useManualSWR<Item>(
    id ? `/api/book/${id}` : null
  );

  if (error) console.error(error);
  if (isValidating && !data) return <DefaultLoader />;

  return (
    <>
      <Head>
        <title>
          Libook {data?.volumeInfo.title && `— ${data?.volumeInfo.title}`}
        </title>
      </Head>
      <Container mt="8">
        <Flex {...BoxProps} justify="space-evenly" align="center">
          <Image
            src={data?.volumeInfo.imageLinks?.thumbnail}
            fallbackSrc="/no-thumbnail.png"
            maxW="145px"
            mx="4"
            alt={sliceText(data?.volumeInfo.title, 50)}
          />
          <Box w="50%">
            <Text fontSize="xl" fontWeight="500" align="center">
              {sliceText(data?.volumeInfo.title, 100)}
            </Text>
            {data?.volumeInfo.subtitle && (
              <Text fontSize="md" color="gray.700" align="center">
                {sliceText(data?.volumeInfo.subtitle, 200)}
              </Text>
            )}
            <Text
              fontSize="md"
              fontWeight="400"
              color="gray.500"
              align="center"
            >
              {data?.volumeInfo.authors
                ? data?.volumeInfo.authors.map((author, i) => {
                    const length = data?.volumeInfo.authors.length;
                    return (
                      author + (length > 1 && i !== length - 1 ? ", " : "")
                    );
                  })
                : "Anonymous"}
            </Text>
          </Box>
        </Flex>
        <Box {...BoxProps}>
          <AddToList data={data} />
        </Box>
        <Box {...BoxProps}>
          <Text px="4">
            <strong>Description:</strong>{" "}
            {data?.volumeInfo.description ? (
              <ReadMoreLess
                charLimit={250}
                readMoreText={"Read more ⌄"}
                readLessText={"Read less ⌃"}
                readMoreClassName="readmoreless"
                readLessClassName="readmoreless"
              >
                {striptags(data?.volumeInfo.description, null, " ")}
              </ReadMoreLess>
            ) : (
              `No description available`
            )}
          </Text>
        </Box>
        <Box px="4" {...BoxProps}>
          <BookPageInfo volumeInfo={data?.volumeInfo} />
        </Box>
        <Box {...BoxProps}>
          <BuyOptions
            previewLink={`${
              data?.saleInfo.buyLink || data?.volumeInfo.previewLink
            }&kptab=getbook`}
            searchStringWithAuthor={`${data?.volumeInfo.title} ${
              data?.volumeInfo.authors ? data?.volumeInfo.authors[0] : ""
            }`}
            searchString={`${data?.volumeInfo.title}`}
          />
        </Box>
        {data?.volumeInfo.categories && (
          <Box {...BoxProps}>
            <Categories categories={data?.volumeInfo.categories} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default BookPage;
