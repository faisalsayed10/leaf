import { Container } from "@chakra-ui/layout";
import Layout from "@components/Layout";
import SearchInput from "@components/SearchInput";
import { useEffect, useState } from "react";
import _ from "underscore";

interface Props {}

// intitle: Returns results where the text following this keyword is found in the title.
// inauthor: Returns results where the text following this keyword is found in the author.
// inpublisher: Returns results where the text following this keyword is found in the publisher.
// subject: Returns results where the text following this keyword is listed in the category list of the volume.
// isbn: Returns results where the text following this keyword is the ISBN number.

// Filter By: (&filter=)
// free-ebooks
// paid-ebooks
// ebooks
// books - Returns only results that are books.
// magazines - Returns results that are magazines.

// Sort By: (&orderBy=)
// relevance - Returns results in order of the relevance of search terms (this is the default).
// newest - Returns results in order of most recently to least recently published.

// Pagination:
// &startIndex= - The position in the collection at which to start. The index of the first item is 0.
// &maxResults= - The maximum number of results to return. The default is 10, and the maximum allowable value is 40.

const Search: React.FC<Props> = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    getValue();

    return () => {
      getValue.cancel();
    };
  }, [value]);

  const getValue = _.debounce(() => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      value
    )}+subject:adventure&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    console.log(value);
  }, 1000);

  return (
    <Layout>
      <Container my="4" maxW="container.sm">
        <SearchInput value={value} setValue={setValue} />
      </Container>
    </Layout>
  );
};

export default Search;
