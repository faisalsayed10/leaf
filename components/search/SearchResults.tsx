import { SimpleGrid } from "@chakra-ui/layout";
import { Item, SearchResponse } from "@util/types";
import React, { useState } from "react";
import GridViewBook from "../view-modes/GridViewBook";
import ListViewBook from "../view-modes/ListViewBook";
import { useEffect } from "react";
import DefaultLoader from "../loader/DefaultLoader";

interface Props {
	results?: SearchResponse;
	loading: boolean;
	type: string;
	isSameQuery: boolean;
}

const SearchResults: React.FC<Props> = ({ results, loading, type, isSameQuery }) => {
	const [localData, setLocalData] = useState<Item[]>([]);

	useEffect(() => {
		if (!results) return;
		if (!isSameQuery) {
			setLocalData(results?.items);
			return;
		}
		const allItems = localData.concat(results?.items);
		setLocalData(allItems);
	}, [results]);

	if (loading && localData?.length < 1) return <DefaultLoader />;
	if ((results && !results.items) || results?.items.length < 1)
		return (
			<SimpleGrid placeItems="center" h="60vh">
				<p>No results found</p>
			</SimpleGrid>
		);

	return (
		<SimpleGrid columns={type === "GRID" ? 4 : 1} spacing={6} placeItems="center" mt="12">
			{localData?.map((book) =>
				type === "GRID" ? (
					<GridViewBook key={book.etag} book={book} />
				) : (
					<ListViewBook key={book.etag} book={book} />
				)
			)}
		</SimpleGrid>
	);
};

export default SearchResults;
