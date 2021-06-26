import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Center } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import Switch from "@components/GridListSwitch";
import Layout from "@components/Layout";
import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import { fetcher } from "@lib/fetcher";
import useManualSWR from "@lib/useManualSWR";
import { buildSearchURL, refillInputs } from "@util/helpers";
import { SearchFormInputs, SearchResponse } from "@util/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowDropDown } from "react-icons/md";
import _ from "underscore";
import { GENRE_SUGGESTIONS } from "@lib/constants";
import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";

interface Props {}

// &langRestrict= two-letter ISO-639-1 code (en, fr)

const Search: React.FC<Props> = () => {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [isSameQuery, setIsSameQuery] = useState(false);
  // Autocomplete states
  const [suggestionValue, setSuggestionValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // form stuff
  const { register, getValues, watch, setValue } = useForm<SearchFormInputs>();
  const { author, publisher, isbn, filter, sort } = watch();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const { data, isValidating, error } = useManualSWR<SearchResponse>(
    url ? `/api/search/${url}` : null,
    fetcher
  );

  if (error) console.error(error);

  useEffect(() => {
    const url = router.asPath.split("url=")[1];
    if (!router.asPath.split("url=")[1]) return;

    setUrl(url);
    refillInputs(url, setQuery, setValue, setSuggestionValue);
  }, []);

  useEffect(() => {
    setIsSameQuery(false);
    setStartIndex(0);
  }, [query]);

  useEffect(() => {
    fetchData();

    return () => {
      fetchData.cancel();
    };
  }, [
    query,
    author,
    publisher,
    suggestionValue,
    isbn,
    filter,
    sort,
    startIndex
  ]);

  const fetchData = _.debounce(async () => {
    if (query.trim() === "") return;

    const url = buildSearchURL(`q=${encodeURIComponent(query)}`, {
      ...getValues(),
      subject: suggestionValue,
    });
    setUrl(url + `&startIndex=${startIndex}`);

    router.push(`/search?url=${url}`, undefined, { shallow: true });
  }, 700);

  function getSuggestions(value: string) {
    const fuse = new Fuse(GENRE_SUGGESTIONS, { keys: ["value", "name"] });
    const results = fuse.search(value);

    return results.map((result) => ({
      value: result.item.value,
      name: result.item.name,
    }));
  }

  return (
    <>
      <Head>
        <title>Libook — Search</title>
      </Head>
      <Layout>
        <Container my="4" maxW="container.sm">
          <Box as="form" pos="relative">
            <SearchInput value={query} setValue={setQuery} />
            <Accordion allowMultiple mt={2}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Advanced Fields:
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Box>
                    <Input
                      {...register("author")}
                      variant="flushed"
                      placeholder="Author"
                    />
                    <Input
                      {...register("publisher")}
                      variant="flushed"
                      placeholder="Publisher"
                    />
                    <Autosuggest
                      suggestions={suggestions}
                      highlightFirstSuggestion={true}
                      onSuggestionsClearRequested={() => setSuggestions([])}
                      onSuggestionsFetchRequested={({ value }) => {
                        setSuggestionValue(value);
                        setSuggestions(getSuggestions(value));
                      }}
                      getSuggestionValue={(suggestion) => suggestion.name}
                      renderSuggestion={(suggestion) => (
                        <span>{suggestion.name}</span>
                      )}
                      inputProps={{
                        placeholder: "Genre",
                        value: suggestionValue,
                        onChange: (_, { newValue }) => {
                          setSuggestionValue(newValue);
                        },
                        className: "chakra-input css-1hrzp7p",
                      }}
                    />
                    <Input
                      {...register("isbn")}
                      variant="flushed"
                      placeholder="ISBN"
                    />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Flex justify="space-between" align="center" my={2}>
              <Select
                icon={<MdArrowDropDown />}
                placeholder="Filter By:"
                cursor="pointer"
                {...register("filter")}
              >
                <option value="&printType=books">Books</option>
                <option value="&printType=magazines">Magazines</option>
                <option value="&filter=ebooks">Ebooks</option>
                <option value="&filter=free-ebooks">Free Ebooks</option>
                <option value="&filter=paid-ebooks">Paid Ebooks</option>
              </Select>
              <Select
                {...register("sort")}
                icon={<MdArrowDropDown />}
                placeholder="Sort By:"
                cursor="pointer"
              >
                <option value="&orderBy=relevance">Relevance</option>
                <option value="&orderBy=newest">Newest</option>
              </Select>
            </Flex>
            <Box pos="absolute" right="0">
              <Switch
                checked={checked}
                handleChange={(bool) => setChecked(bool)}
              />
            </Box>
          </Box>
          <SearchResults
            results={data}
            loading={isValidating}
            type={checked ? "GRID" : "LIST"}
            isSameQuery={isSameQuery}
          />
          {data?.items?.length > 0 && (
            <Center my="6">
              <Button
                onClick={() => {
                  setIsSameQuery(true);
                  setStartIndex((p) => p + 40);
                }}
                variant="unstyled"
                width="60%"
                bgColor="#5befbd"
              >
                Load More
              </Button>
            </Center>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Search;
