import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex } from "@chakra-ui/layout";
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

interface Props {}

// &langRestrict= two-letter ISO-639-1 code (en, fr)

// Pagination:
// &startIndex= - The position in the collection at which to start. The index of the first item is 0.
// &maxResults= - The maximum number of results to return. The default is 10, and the maximum allowable value is 40.

const Search: React.FC<Props> = () => {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(true);
  const { register, getValues, watch, setValue, formState } =
    useForm<SearchFormInputs>();
  const { author, publisher, subject, isbn, filter, sort } = watch();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const { data, mutate, isValidating, error } = useManualSWR<SearchResponse>(
    url ? "/api/search" + `/${url}` : null,
    fetcher
  );

  if (error) console.error(error);

  useEffect(() => {
    const url = router.asPath.split("url=")[1];
    if (!router.asPath.split("url=")[1]) return;

    setUrl(url);
    refillInputs(url, setQuery, setValue);
  }, []);

  useEffect(() => {
    fetchData();

    return () => {
      fetchData.cancel();
    };
  }, [query, author, publisher, subject, isbn, filter, sort]);

  const fetchData = _.debounce(async () => {
    if (query.trim() === "") return;

    const url = buildSearchURL(`q=${encodeURIComponent(query)}`, getValues());
    setUrl(url);

    router.push(`/search?url=${url}`, undefined, { shallow: true });
  }, 1000);

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
                    <Input
                      {...register("subject")}
                      variant="flushed"
                      placeholder="Genre"
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
          />
        </Container>
      </Layout>
    </>
  );
};

export default Search;
