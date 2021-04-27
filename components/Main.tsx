import { Box, Flex } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { SUBJECTS } from "@lib/constants";
import { getRandom } from "@util/helpers";
import { Subject, SubjectsData } from "@util/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SubjectSection from "./SubjectSection";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const [randomSubjects, setRandomSubjects] = useState(getRandom(SUBJECTS, 5));
  const [subjectData, setSubjectData] = useState<SubjectsData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = () => {
    setLoading(true);
    randomSubjects.forEach(async (subject) => {
      const res = await axios.get<Subject>(
        `https://openlibrary.org/subjects/${subject}.json?limit=5`
      );
      setSubjectData((prev) => {
        return [...prev, { name: subject, value: res.data }];
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    setSubjectData([]);
    fetchBooks();
  }, []);

  return (
    <>
      <Flex alignItems="center" flexDir="column" justify="center">
        {subjectData.map(subject => (
          <SubjectSection key={subject.name} link={subject.name} title={subject.value.name} books={subject.value.works} />
        ))}
      </Flex>
    </>
  );
};

export default Main;
