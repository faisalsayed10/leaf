import { Box } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { SUBJECTS } from "@lib/constants";
import { getRandom } from "@util/helpers";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const randomSubjects = getRandom(SUBJECTS, 5);

  const fetchBooks = () => {
    setLoading(true);
    randomSubjects.forEach(async (subject) => {
      const res = await axios.get(
        `https://openlibrary.org/subjects/${subject}.json?limit=20`
      );
      data[subject] = await res.data;
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Box>
        {loading && <Skeleton />}
        {/* {data !== {} && Object.keys(data).map((key) => (
          <p key={key}>{JSON.stringify(data[key])}</p>
        ))} */}
      </Box>
    </>
  );
};

export default Main;
