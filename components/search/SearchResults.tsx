import { SimpleGrid } from "@chakra-ui/layout";
import { Item, SearchResponse } from "@util/types";
import React, { useEffect, useState } from "react";
import DefaultLoader from "../loader/DefaultLoader";
import GridViewBook from "../view-modes/GridViewBook";
import ListViewBook from "../view-modes/ListViewBook";

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
		<SimpleGrid
			columns={type === "GRID" ? { base: 2, sm: 3, md: 4, lg: 5 } : null}
			spacingX={{ base: 3, lg: 5 }}
			spacingY={5}
			mt={12}
			placeItems={localData?.length > 4 ? "center" : "normal"}
		>
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
