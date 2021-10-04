import { Book, List, ListType } from ".prisma/client";
import { Container, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import DefaultLoader from "@components/loader/DefaultLoader";
import GridListSwitch from "@components/ui/GridListSwitch";
import NoBooksFound from "@components/ui/NoBooksFound";
import Unauthorized from "@components/ui/Unauthorized";
import GridViewBook from "@components/view-modes/GridViewBook";
import ListViewBook from "@components/view-modes/ListViewBook";
import { toCapitalizedWords } from "@util/helpers";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const ListPage = () => {
	const router = useRouter();
	const type = router.query.type;
	const [listType, setListType] = useState<ListType>();
	const [loaded, setLoaded] = useState<boolean>(false);
	const { data, error, isValidating } = useSWR<List & { books: Book[] }>(
		listType ? `/api/list?type=${listType}` : null
	);
	const [checked, setChecked] = useState(true);

	useEffect(() => {
		if (loaded) return;
		if (isValidating) {
			setLoaded(true);
		}
	}, [isValidating, loaded]);

	useEffect(() => {
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
					<title>{listType && `Libook — ${toCapitalizedWords(listType)}`}</title>
				</Head>
				<Unauthorized />
			</>
		);

	if (loaded && (!data || data?.books?.length < 1)) return <NoBooksFound />;

	return (
		<>
			<Head>
				<title>{listType && `Libook — ${toCapitalizedWords(listType)}`}</title>
			</Head>
			<Container
				maxW={["container.sm", "container.sm", "container.lg"]}
				minH="100vh"
				py={4}
				px={{ base: 3, lg: 8 }}>
				<Flex align="center" justify="space-between">
					<Text as="span" display="inline" fontSize="lg">
						{data?.books?.length} results
					</Text>
					<GridListSwitch checked={checked} handleChange={setChecked} />
				</Flex>
				<SimpleGrid
					columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
					spacingX={{ base: 3, lg: 5 }}
					spacingY={10}
					mt={6}
					placeItems={data?.books?.length > 4 ? "center" : "normal"}>
					{data?.books?.map((book) => {
						return checked ? (
							<GridViewBook key={book.id} book={book} />
						) : (
							<ListViewBook key={book.id} book={book} />
						);
					})}
				</SimpleGrid>
			</Container>
		</>
	);
};

export default ListPage;
