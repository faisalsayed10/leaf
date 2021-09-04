import { useRouter } from "next/router";
import { Book, List, ListType } from ".prisma/client";
import Image from "next/image";
import { Container, Flex, Heading, Text } from "@chakra-ui/layout";
import DefaultLoader from "@components/loader/DefaultLoader";
import Unauthorized from "@components/ui/Unauthorized";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { toCapitalizedWords } from "@util/helpers";

const BoxProps = {
	background: "rgba(255,255,255,0.25)",
	boxShadow: "10px 5px 40px -10px rgba(0,0,0,0.2)",
	borderRadius: "5px",
	style: {
		backdropFilter: "blur(5px)",
		WebkitBackdropFilter: "blur(5px)",
	},
};

const ListPage = () => {
	const router = useRouter();
	const type = router.query.type;
	const [listType, setListType] = useState<ListType>();
	const { data, error, isValidating } = useSWR<List & { books: Book[] }>(
		listType ? `/api/list?type=${listType}` : null
	);

	useEffect(() => {
		console.log(type);
		if (type === "future") setListType("wantToRead");
		else if (type === "current") setListType("currentlyReading");
		else if (type === "past") setListType("alreadyRead");
		else setListType("normal");
	}, [type]);

	if (isValidating && !data)
		return (
			<Container py="4" maxW="container.sm" h="100vh">
				<DefaultLoader />
			</Container>
		);

	if ((data as any)?.message === "Unauthorized")
		return (
			<>
				<Head>
					<title>
						{listType && `Libook — ${toCapitalizedWords(listType)}`}
					</title>
				</Head>
				<Unauthorized />
			</>
		);

	return (
		<>
			<Head>
				<title>{listType && `Libook — ${toCapitalizedWords(listType)}`}</title>
			</Head>
			<Container maxW={["container.sm", "container.sm", "container.md"]} my={4}>
				<Flex minH="85vh" alignItems="center" justifyContent="center">
					<Flex
						{...BoxProps}
						justify="space-evenly"
						align="center"
						flexDir="column"
						mx={6}
						p={8}
					>
						{(!data || !data?.books) && (
							<>
								<Heading as="h3" fontSize="lg" my={3}>
									No Books Found
								</Heading>
								<Text px="4">
									Hmm... Apparently it seems that you have no books in this list
									🧐
								</Text>
								<Text px="4" mb={3}>
									Head over to the Homepage and start adding some books 📚
								</Text>
								<Image
									src="/no-data.svg"
									width="256px"
									height="250px"
									priority
								/>
							</>
						)}
						{data?.books?.map((book) => (
							<p>{book.title}</p>
						))}
					</Flex>
				</Flex>
			</Container>
		</>
	);
};

export default ListPage;
