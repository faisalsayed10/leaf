import { Container, Flex, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import Layout from "@components/ui/Layout";
import { GENRES } from "@lib/constants";
import { readableTitle } from "@util/helpers";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { MdLibraryBooks } from "react-icons/md";

interface Props {}

const genres: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>All Genres</title>
      </Head>
      <Layout pageTitle="Genres">
        <Container
          maxW={["container.sm", "container.sm", "container.md"]}
          my={4}
        >
          <Wrap spacing={4} align="center">
            {GENRES.map((genre, i) => {
              return (
                <WrapItem as={Link} href={`/genre/${genre}`} key={i}>
                  <Flex
                    _hover={{ transform: "scale(1.05)" }}
                    transitionDuration="300ms"
                    cursor="pointer"
                    borderRadius="5px"
                    border="1px solid #CBD5E0"
                    p="1"
                    align="center"
                  >
                    <MdLibraryBooks
                      size={16}
                      style={{ margin: "0 auto", display: "inline" }}
                    />
                    <Text fontSize="md" px="1" align="center">
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
