import { Flex } from "@chakra-ui/layout";
import { fetcher } from "@lib/fetcher";
import { FeedData } from "@util/types";
import React from "react";
import useSWR from "swr";
import GenreRow from "./GenreRow";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const { data, error } = useSWR<FeedData[]>("/api/feed", fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Flex alignItems="center" flexDir="column" justify="center">
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
