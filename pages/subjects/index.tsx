import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
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
        <SimpleGrid columns={5} my="8" spacing={6} placeItems="center">
          {SUBJECTS.map((subject, i) => {
            return (
              <Link key={i} href={`/subjects/${subject}`}>
                <Box
                  borderRadius="md"
                  boxShadow="lg"
                  _hover={{ transform: "scale(1.05)" }}
                  transitionDuration="300ms"
                  cursor="pointer"
                  bgColor="white"
                  w="130px"
                  h="150px"
                >
                  <ImBooks size={72} style={{ margin: "0 auto" }} />
                  <Text fontSize="md" fontWeight="500" px="1" align="center">
                    {readableSubject(subject)}
                  </Text>
                </Box>
              </Link>
            );
          })}
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default subjects;
