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
import Layout from "@components/Layout";
import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import Switch from "@components/Switch";
import { BASE_URL } from "@lib/constants";
import { SearchResponse } from "@util/types";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowDropDown } from "react-icons/md";
import _ from "underscore";

interface Props {}

// &langRestrict= two-letter ISO-639-1 code (en, fr)

// Pagination:
// &startIndex= - The position in the collection at which to start. The index of the first item is 0.
// &maxResults= - The maximum number of results to return. The default is 10, and the maximum allowable value is 40.

type Inputs = {
  author: string;
  publisher: string;
  subject: string;
  isbn: string;
  filter: string;
  sort: string;
};

const Search: React.FC<Props> = () => {
  const [value, setValue] = useState("");
  const [searchData, setSearchData] = useState<SearchResponse>();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { register, getValues, watch } = useForm<Inputs>();
  const { author, publisher, subject, isbn, filter, sort } = watch();

  useEffect(() => {
    fetchData();

    return () => {
      fetchData.cancel();
    };
  }, [value, author, publisher, subject, isbn, filter, sort]);

  const fetchData = _.debounce(async () => {
    if (value.trim() === "") return;
    setLoading(true);
    const { author, publisher, isbn, subject, filter, sort } = getValues();
    let url = `${BASE_URL}/volumes?q=${encodeURIComponent(value)}`;

    if (author.trim() !== "") {
      url += `+inauthor:${encodeURIComponent(author)}`;
    }

    if (publisher.trim() !== "") {
      url += `+inpublisher:${encodeURIComponent(publisher)}`;
    }

    if (isbn.trim() !== "") {
      url += `+isbn:${isbn}`;
    }

    if (subject.trim() !== "") {
      url += `+subject:${encodeURIComponent(subject)}`;
    }

    switch (filter) {
      case "&printType=books":
        url += "&printType=books";
        break;
      case "&printType=magazines":
        url += "&printType=magazines";
        break;
      case "&filter=ebooks":
        url += "&filter=ebooks";
        break;
      case "&filter=free-ebooks":
        url += "&filter=free-ebooks";
        break;
      case "&filter=paid-ebooks":
        url += "&filter=paid-ebooks";
        break;
      default:
        break;
    }

    switch (sort) {
      case "&orderBy=relevance":
        url += "&orderBy=relevance";
        break;
      case "&orderBy=newest":
        url += "&orderBy=newest";
        break;
      default:
        break;
    }

    try {
      const { data } = await axios.post<SearchResponse>("/api/search", { url });
      setSearchData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, 1000);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  return (
    <>
      <Head>
        <title>Libook — Search</title>
      </Head>
      <Layout>
        <Container my="4" maxW="container.sm">
          <Box as="form">
            <SearchInput value={value} setValue={setValue} />
            {/* ____________________ */}

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

            {/* ____________________ */}

            <Flex justify="space-between" align="center" mt={2}>
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
            <Switch checked={checked} handleChange={handleChange} />
          </Box>

          {/* ____________________ */}
          <SearchResults results={searchData} loading={loading} />
        </Container>
      </Layout>
    </>
  );
};

export default Search;
