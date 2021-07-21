import { Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Verify: React.FC = () => {
  return (
    <Flex
      className="auth-image"
      w="full"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        flexDir="column"
        align="stretch"
        p={8}
        pb={4}
        px={10}
        rounded="lg"
        shadow="lg"
        bg="white"
        w="450px"
      >
        <Image
          src="/libook_logo_white.png"
          alt="Libook™ logo"
          maxW="250px"
          display="block"
          m="0 auto"
        />
        <Text
          fontWeight="bold"
          align="center"
          color="gray.700"
          mt={8}
          fontSize="3xl"
        >
          Check Your Email
        </Text>
        <Text align="center" color="gray.600" fontSize="sm" mb={8}>
          A sign in link has been sent to your email address
        </Text>
        <Text fontWeight="bold" align="center" color="gray.700" mb={8}>
          <Link href="/">Back to Homepage</Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Verify;
