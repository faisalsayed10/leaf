import { Flex } from "@chakra-ui/layout";
import { GENRES } from "@lib/constants";
import { getRandom } from "@util/helpers";
import { Genre, GenresData } from "@util/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GenreRow from "./GenreRow";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const [randomGenres, setRandomGenres] = useState(getRandom(GENRES, 5));
  const [genreData, setGenreData] = useState<GenresData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = () => {
    setLoading(true);
    randomGenres.forEach(async (genre) => {
      const res = await axios.get<Genre>(
        `https://openlibrary.org/subjects/${genre}.json?limit=4`
      );
      setGenreData((prev) => {
        return [...prev, { name: genre, value: res.data }];
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    setGenreData([]);
    fetchBooks();
  }, []);

  return (
    <>
      <Flex alignItems="center" flexDir="column" justify="center">
        {genreData.map(genre => (
          <GenreRow key={genre.name} link={genre.name} title={genre.value.name} books={genre.value.works} />
        ))}
      </Flex>
    </>
  );
};

export default Main;
