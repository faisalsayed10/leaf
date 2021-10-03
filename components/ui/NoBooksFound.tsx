import { Flex, Heading, Text } from "@chakra-ui/layout";
import Image from "next/image";
import React from "react";

const BoxProps = {
  background: "rgba(255,255,255,0.25)",
  boxShadow: "10px 5px 40px -10px rgba(0,0,0,0.2)",
  borderRadius: "5px",
};

const NoBooksFound: React.FC = () => {
  return (
    <Flex minH="85vh" alignItems="center" justifyContent="center">
      <Flex
        {...BoxProps}
        justify="space-evenly"
        align="center"
        flexDir="column"
        mx={6}
        p={8}
      >
        <Heading as="h3" fontSize="lg" my={3}>
          No Books Found
        </Heading>
        <Text px="4">
          Hmm... Apparently it seems that you have no books in this list 🧐
        </Text>
        <Text px="4" mb={3}>
          Head over to the Homepage and start adding some books 📚
        </Text>
        <Image
          src="/no-data.svg"
          width="256px"
          height="250px"
          priority
          alt="No Books Found"
        />
      </Flex>
    </Flex>
  );
};

export default NoBooksFound;
