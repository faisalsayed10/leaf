import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { readableSubject, upperCaseTitle } from "@util/helpers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {}

const SearchInput: React.FC<Props> = (props) => {
  const router = useRouter();
  const { subject, author } = router.query;
  const [placeholder, setPlaceholder] = useState("Search books");

  useEffect(() => {
    if (subject) {
      // @ts-ignore
      setPlaceholder(`Search books in ${readableSubject(subject)}`);
    } else if (author) {
      setPlaceholder(`Search books from ${author}`);
    }
  }, [router.query]);

  return (
    <>
      <InputGroup maxW="700px">
        <Input placeholder={placeholder} />
        <InputRightElement>
          <IconButton aria-label="Search" icon={<SearchIcon />} />
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default SearchInput;
