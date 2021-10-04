import { Container, SimpleGrid } from "@chakra-ui/layout";
import ListCard from "@components/cards/ListCard";
import DefaultLoader from "@components/loader/DefaultLoader";
import NoBooksFound from "@components/ui/NoBooksFound";
import Unauthorized from "@components/ui/Unauthorized";
import { ListsWithBooks } from "@util/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const Lists: React.FC = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const { data, error, isValidating } = useSWR<ListsWithBooks>(`/api/lists`);

	useEffect(() => {
		if (loaded) return;
		if (isValidating) {
			setLoaded(true);
		}
	}, [isValidating, loaded]);

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
					<title>Libook — Your Lists</title>
				</Head>
				<Unauthorized />
			</>
		);

	if (loaded && (!data || data?.length < 1)) return <NoBooksFound />;

	return (
		<>
			<Head>
				<title>Libook — Your Lists</title>
			</Head>
			<Container maxW={["container.sm", "container.sm", "container.lg"]} minH="100vh" py={4} px={8}>
				<SimpleGrid
					columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
					spacingX={{ base: 6, lg: 8 }}
					spacingY={10}
					mt={6}
					placeItems={data?.length > 4 ? "center" : "normal"}>
					{data?.map((list) => (
						<ListCard key={list.id} list={list} />
					))}
					<ListCard key="add-list" isGeneric={true} />
				</SimpleGrid>
			</Container>
		</>
	);
};

export default Lists;
