import { Container, Flex, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import Layout from "@components/Layout";
import { GENRES } from "@lib/constants";
import { readableTitle } from "@util/helpers";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ImBooks } from "react-icons/im";

interface Props {}

const genres: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>All Genres</title>
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
            Genres
          </Text>
          <Wrap my="8" spacing={6} align="center" justify="center">
            {GENRES.map((genre, i) => {
              return (
                <WrapItem as={Link} href={`/genre/${genre}`} key={i}>
                  <Flex
                    borderRadius="md"
                    _hover={{ transform: "scale(1.05)" }}
                    transitionDuration="300ms"
                    cursor="pointer"
                    border="1px solid rgb(237, 242, 247)"
                    p="3"
                  >
                    <ImBooks
                      size={24}
                      style={{ margin: "0 auto", display: "inline" }}
                    />
                    <Text fontSize="md" fontWeight="500" px="1" align="center">
                      {readableTitle(genre)}
                    </Text>
                  </Flex>
                </WrapItem>
              );
            })}
          </Wrap>
        </Container>
      </Layout>
    </>
  );
};

export default genres;
