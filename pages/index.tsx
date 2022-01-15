import { Container, SimpleGrid } from "@chakra-ui/react";
import DefaultLoader from "@components/loader/DefaultLoader";
import GridViewBook from "@components/view-modes/GridViewBook";
import { Item } from "@util/types";
import React from "react";
import useSWRImmutable from "swr/immutable";

const HomePage = () => {
	const { data, error, isValidating } = useSWRImmutable<Item[]>("/api/feed");

	if (error) return <h3>failed to load</h3>;
	if (isValidating)
		return (
			<Container py="4" maxW="container.sm" h="100vh">
				<DefaultLoader />
			</Container>
		);

	return (
		<SimpleGrid
			minChildWidth="140px"
			gap={[1, 2, 6]}
			rowGap="6"
			py="4"
			mx={["2", "5", "8"]}
			placeItems="center"
		>
			{data?.map((book) => (
				<GridViewBook key={book.id} book={book} />
			))}
		</SimpleGrid>
	);
};

export default HomePage;
