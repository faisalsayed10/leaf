import React from "react";
import {
  signIn,
  getSession,
  getProviders,
  getCsrfToken,
} from "next-auth/client";
import { Box, Flex, Text, Button, Input } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const SignIn = ({ providers, csrfToken }) => {

  console.log(providers);

  return (
    <Flex
      bg="linear-gradient(to left, #8e9eab, #eef2f3)"
      p={50}
      w="full"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg="white"
        maxW="2xl"
      >
        <p>libook logo here</p>
        <Text>Create an account or log in</Text>
        <Button my={8} onClick={() => signIn(providers.google.id)}>
          <FaGoogle />
          Continue with Google
        </Button>
        <Text>or continue with email</Text>
        <Box as="form" method="post" action="/api/auth/signin/email">
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            required
            placeholder="Email Address"
            type="email"
            id="email"
            name="email"
          />
          <Button my={8} type="submit">Continue</Button>
        </Box>
        <Text>
          By continuing, you acknowledge that you have read, understood, and
          agree to our terms and condition
        </Text>
      </Box>
    </Flex>
  );
};

export default SignIn;

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
