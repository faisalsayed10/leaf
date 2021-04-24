import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import React from "react";

interface Props {}

const SearchInput: React.FC<Props> = (props) => {
  return (
    <>
      <InputGroup>
        <Input placeholder="Search books" />
        <InputRightElement><IconButton aria-label="Search" icon={<SearchIcon />} /></InputRightElement>
      </InputGroup>
    </>
  );
};

export default SearchInput;
