import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import Layout from "@components/Layout";
import { SUBJECTS } from "@lib/constants";
import { readableSubject } from "@util/helpers";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ImBooks } from "react-icons/im";

interface Props {}

const subjects: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>Subjects</title>
      </Head>
      <Layout>
        <Container backgroundColor="white" borderRadius="lg" boxShadow="lg">
          <Text
            fontSize="3xl"
            mt="8"
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="500"
            align="center"
          >
            All Subjects
          </Text>
          <Wrap my="8" spacing={6} align="center" justify="center">
            {SUBJECTS.map((subject, i) => {
              return (
                <WrapItem as={Link} href={`/subjects/${subject}`} key={i}>
                  <Flex
                    borderRadius="md"
                    _hover={{ transform: "scale(1.05)" }}
                    transitionDuration="300ms"
                    cursor="pointer"
                    border="2px solid rgb(237, 242, 247)"
                    p="3"
                  >
                    <ImBooks
                      size={24}
                      style={{ margin: "0 auto", display: "inline" }}
                    />
                    <Text fontSize="md" fontWeight="500" px="1" align="center">
                      {readableSubject(subject)}
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

export default subjects;
