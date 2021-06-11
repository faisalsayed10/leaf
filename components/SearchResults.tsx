import { SimpleGrid } from "@chakra-ui/layout";
import { SearchResponse } from "@util/types";
import React from "react";
import Book from "./Book";

interface Props {
  results?: SearchResponse;
  loading: boolean;
}

// Change View - Grid | List

const SearchResults: React.FC<Props> = ({ results, loading }) => {
  if (loading) return (
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

  console.log(results);

  return (
    <SimpleGrid columns={4} spacing={6} placeItems="center" mt="4">
      {results?.items.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </SimpleGrid>
  );
};

export default SearchResults;
