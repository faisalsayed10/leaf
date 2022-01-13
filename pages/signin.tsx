import React from "react";
import { signIn, getSession, getProviders, getCsrfToken } from "next-auth/client";
import { Box, Flex, Text, Button, Input, chakra, Image, Icon } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";
import { BsLightningFill } from "react-icons/bs";

const errors = {
	Signin: "Try signing with a different account.",
	OAuthSignin: "Try signing with a different account.",
	OAuthCallback: "Try signing with a different account.",
	OAuthCreateAccount: "Try signing with a different account.",
	EmailCreateAccount: "Try signing with a different account.",
	Callback: "Try signing with a different account.",
	OAuthAccountNotLinked: "Email already exists with a different provider.",
	EmailSignin: "Check your email address.",
	CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
	default: "Unable to sign in."
};

const SignIn = ({ providers, csrfToken }) => {
	const { error } = useRouter().query;

	return (
		<Flex className="auth-image" w="full" h="100vh" alignItems="center" justifyContent="center">
			<Flex
				flexDir="column"
				align="stretch"
				p={8}
				pb={4}
				px={10}
				rounded="lg"
				shadow="lg"
				bg="white"
				w="450px">
				<Image
					src="/libook_logo_white.png"
					alt="Leaf™ logo"
					maxW="250px"
					display="block"
					m="0 auto"
				/>
				<Text fontWeight="bold" align="center" color="gray.700">
					Create an account or log in
				</Text>
				<Button my={6} onClick={() => signIn(providers.google.id)} colorScheme="red">
					<FaGoogle />
					<chakra.span ml={2}>Continue with Google</chakra.span>
				</Button>
				<Text align="center" fontSize="sm" mb={2}>
					or continue with email
				</Text>
				<Box as="form" method="post" action="/api/auth/signin/email">
					<Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
					<Input required placeholder="Email address" type="email" id="email" name="email" />
					<Button mt={3} mb={8} type="submit" w="100%">
						Continue
					</Button>
				</Box>
				{error && <SignInError error={error} />}
				<Text fontSize="x-small" align="center">
					By continuing, you acknowledge that you have read, understood, and agreed to our terms and
					condition.
				</Text>
			</Flex>
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
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};
	}

	return {
		props: {
			providers,
			csrfToken
		}
	};
}

const SignInError = ({ error }) => {
	const errorMessage = error && (errors[error] ?? errors.default);
	return (
		<Flex
			maxW="sm"
			w="full"
			mx="auto"
			bg="gray.800"
			shadow="md"
			rounded="lg"
			overflow="hidden"
			mb={8}>
			<Flex justifyContent="center" alignItems="center" w={12} bg="red.500">
				<Icon as={BsLightningFill} color="white" boxSize={6} />
			</Flex>

			<Box mx={-3} py={2} px={4}>
				<Box mx={3}>
					<chakra.span color="red.400" fontWeight="bold">
						Error
					</chakra.span>
					<chakra.p color="gray.200" fontSize="small">
						{errorMessage}
					</chakra.p>
				</Box>
			</Box>
		</Flex>
	);
};
