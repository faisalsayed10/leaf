import { Box, Grid, SimpleGrid, Text } from "@chakra-ui/layout";
import Layout from "@components/Layout";
import { SUBJECTS } from "@lib/constants";
import { upperCaseTitle } from "@util/helpers";
import React from "react";
import { GiBookshelf } from "react-icons/gi";
import Head from "next/head";
import Link from "next/link";

interface Props {}

const subjects: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>Subjects</title>
      </Head>
      <Layout>
        <SimpleGrid columns={5} my="16" spacing={6} placeItems="center">
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
                  h="200px"
                >
                  <GiBookshelf size={100} style={{ margin: "0 auto" }} />
                  <Text fontSize="md" fontFamily="semibold" align="center">
                    {upperCaseTitle(
                      subject.replace(/__/gi, " & ").replace(/_/gi, " ")
                    )}
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
