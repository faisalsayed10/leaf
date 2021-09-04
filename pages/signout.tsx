import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";

const Signout: React.FC = () => {
  const router = useRouter();

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
          my={8}
          fontSize="3xl"
        >
          Are you sure you want to sign out?
        </Text>
        <Button
          onClick={() => signOut({ callbackUrl: process.env.DEPLOY_URL || "http://localhost:3000" })}
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
