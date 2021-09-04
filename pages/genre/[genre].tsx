import { Container, SimpleGrid, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import DefaultLoader from "@components/loader/DefaultLoader";
import GridListSwitch from "@components/ui/GridListSwitch";
import GridViewBook from "@components/view-modes/GridViewBook";
import ListViewBook from "@components/view-modes/ListViewBook";
import { fetcher } from "@lib/fetcher";
import useManualSWR from "@lib/useManualSWR";
import { readableTitle } from "@util/helpers";
import { SearchResponse } from "@util/types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {}

const Genre: React.FC<Props> = () => {
	const router = useRouter();
	const genre = router.query.genre as string;
	const [checked, setChecked] = useState(true);
	const { data, isValidating, error } = useManualSWR<SearchResponse>(
		genre ? `/api/genre/${genre}` : null,
		fetcher
	);

	if (error) console.error(error);
	if (isValidating) return <DefaultLoader />;

	return (
		<>
			<Head>
				<title>{readableTitle(genre)}</title>
			</Head>
			<Container maxW="container.sm" my="4" px="4">
				<Flex align="center" justify="space-between">
					<Text as="span" display="inline" fontSize="lg">
						{data?.totalItems} results
					</Text>
					<GridListSwitch
						checked={checked}
						handleChange={(bool) => setChecked(bool)}
					/>
				</Flex>
				<SimpleGrid
					columns={checked ? 4 : 1}
					spacing={6}
					placeItems="center"
					mt="6"
				>
					{data?.items
						?.filter((item) => item.volumeInfo.hasOwnProperty("imageLinks"))
						?.map((book) => {
							return checked ? (
								<GridViewBook key={book.etag} book={book} />
							) : (
								<ListViewBook key={book.etag} book={book} />
							);
						})}
				</SimpleGrid>
			</Container>
		</>
	);
};

export default Genre;
