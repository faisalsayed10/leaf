import { Button } from "@chakra-ui/button";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";

const Unauthorized = () => {
	const router = useRouter();

	return (
		<Flex align="center" justify="center" minH="90vh" maxW="750px" m="0 auto">
			<Flex
				bgColor="#fff"
				border="1px solid #E2E8F0"
				p={[4, 6, 8]}
				mx={8}
				align="center"
				justify="space-evenly"
				flexDir="column">
				<Heading as="h3" fontSize={["lg", "xl", "xl"]} mb={3}>
					You are not Logged In
				</Heading>
				<Text fontSize="lg" px={4} mb={3} align="center">
					Hey there! 👋 It seems that this page needs you to be logged in to view it. You can go
					back if you ended up here accidentally or you can go forward and login with your account!
				</Text>
				<Flex justify="space-evenly" align="center" w="full">
					<Button onClick={() => history.back()}>Go Back</Button>
					<Button colorScheme="red" onClick={() => router.push("/signin")}>
						Log In
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Unauthorized;
