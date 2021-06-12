import { SimpleGrid } from "@chakra-ui/layout";
import { SearchResponse } from "@util/types";
import React from "react";
import GridViewBook from "./GridViewBook";
import ListViewBook from "./ListViewBook";

interface Props {
  results?: SearchResponse;
  loading: boolean;
  type: string;
}

// Change View - Grid | List

const SearchResults: React.FC<Props> = ({ results, loading, type }) => {
  if (loading)
    return (
      <SimpleGrid placeItems="center" h="60vh">
        <p>loading</p>
      </SimpleGrid>
    );
  if ((results && !results.items) || results?.items.length < 1)
    return (
      <SimpleGrid placeItems="center" h="60vh">
        <p>No results found</p>
      </SimpleGrid>
    );

  return type === "GRID" ? (
    <SimpleGrid columns={4} spacing={6} placeItems="center" mt="12">
      {results?.items.map((book) => (
        <GridViewBook key={book.id} book={book} />
      ))}
    </SimpleGrid>
  ) : (
    <SimpleGrid columns={1} spacing={6} placeItems="center" mt="12">
      {results?.items.map((book) => (
        <ListViewBook key={book.id} book={book} />
      ))}
    </SimpleGrid>
  );
};

export default SearchResults;
