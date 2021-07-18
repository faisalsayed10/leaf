import {
  Container, SimpleGrid
} from "@chakra-ui/react";
import DefaultLoader from "@components/loader/DefaultLoader";
import GridViewBook from "@components/view-modes/GridViewBook";
import { fetcher } from "@lib/fetcher";
import { SearchItem } from "@util/types";
import { useSession } from "next-auth/client";
import React from "react";
import useSWR, { cache } from "swr";
import Layout from "../components/ui/Layout";

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
      <Container py="4" maxW="container.sm" h="100vh">
        <DefaultLoader />
      </Container>
    </Layout>
  );

  return (
    <Layout pageTitle="Recommended">
      <SimpleGrid
        minChildWidth="140px"
        gap={[1, 2, 6]}
        rowGap="6"
        py="4"
        mx={["2", "5", "8"]}
        placeItems="center"
      >
        {data
          ?.map((book) => (
            <GridViewBook key={book.id} book={book} />
          ))}
      </SimpleGrid>
    </Layout>
  );
};

export default HomePage;
