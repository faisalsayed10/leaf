import { Flex, SimpleGrid, Container } from "@chakra-ui/layout";
import { fetcher } from "@lib/fetcher";
import { FeedData } from "@util/types";
import React from "react";
import useSWR, { cache } from "swr";
import GenreRow from "./GenreRow";
import { RotateSpinner } from "react-spinners-kit";
import DefaultLoader from "./loader/DefaultLoader";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const { data, error, isValidating } = useSWR<FeedData[]>(
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
      <Container my="4" maxW="container.sm">
        <DefaultLoader />
      </Container>
    );

  console.log(data);

  return (
    <>
      <Flex alignItems="center" flexDir="column" justify="center" m="0 auto">
        {data.map((genre) => (
          <GenreRow
            key={genre.name}
            link={genre.name}
            title={genre.name}
            books={genre.value.items}
          />
        ))}
      </Flex>
    </>
  );
};

export default Main;
