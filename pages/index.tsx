import React from "react";
import Layout from "../components/ui/Layout";
import GridViewBook from "@components/view-modes/GridViewBook";
import { useSession } from "next-auth/client";
import useSWR, { cache } from "swr";
import { fetcher } from "@lib/fetcher";
import { Box, Container, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import DefaultLoader from "@components/loader/DefaultLoader";
import { SearchItem } from "@util/types";

type Props = {};

const HomePage: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  const { data, error, isValidating } = useSWR<SearchItem[]>(
    "/api/feed",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: !cache.has("/api/feed"),
    }
  );

  if (error) return <div>failed to load</div>;
  if (isValidating)
    return (
      <Layout pageTitle="Recommended">
        <Container my="4" maxW="container.sm">
          <DefaultLoader />
        </Container>
      </Layout>
    );

  return (
    <Layout pageTitle="Recommended">
      <SimpleGrid minChildWidth="130px" gap={3} my="8" mx="6" placeItems="center">
        {data
          ?.filter((item) => item.volumeInfo.hasOwnProperty("imageLinks"))
          ?.map((book) => (
            <GridViewBook key={book.id} book={book} />
          ))}
      </SimpleGrid>
    </Layout>
  );
};

export default HomePage;
