import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Signout: React.FC = () => {
  const router = useRouter();

  return (
    <Flex
      bg="linear-gradient(to left, #8e9eab, #eef2f3)"
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
          my={8}
          fontSize="3xl"
        >
          Are you sure you want to sign out?
        </Text>
        <Button
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
          colorScheme="red"
          mb={2}
        >
          Yes, Sign Out
        </Button>
        <Button onClick={() => router.push("/")} colorScheme="gray" mb={8}>
          No, Go Back
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signout;
