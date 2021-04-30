import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import HomeIcon from "./icons/HomeIcon";
import SearchIcon from "./icons/SearchIcon";
import { MdLibraryBooks } from "react-icons/md";
import { GiSecretBook } from "react-icons/gi";
import { BiBook, BiBookAlt } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";

interface Props {}

const ButtonProps = {
  fontSize: "lg",
  w: "100%",
};

const IconProps = {
  boxSize: 7,
  mr: "2",
};

// What All Do I need?
// 1. Home
// 2. Search
// ----------------
// 3. All Subjects
// 4. Random Book For You
// ----------------
// 5. Want To Read
// 6. Currently Reading
// 7. Already Read

const Sidebar: React.FC<Props> = () => {
  return (
    <Flex flexDir="column" alignItems="start" w="fit-content">
      <Button as="a" {...ButtonProps} href="/">
        <HomeIcon {...IconProps} />
        Home
      </Button>
      <Button as="a" {...ButtonProps} href="/search">
        <SearchIcon {...IconProps} />
        Search
      </Button>
      <br />
      <Button as="a" {...ButtonProps} href="/subjects">
        <Icon as={MdLibraryBooks} {...IconProps} />
        Genres
      </Button>
      <Button as="a" {...ButtonProps} href="/random">
        <Icon as={GiSecretBook} {...IconProps} />
        Random Book
      </Button>
      <br />
      <Button as="a" {...ButtonProps} href="/future">
        <Icon as={BiBookAlt} {...IconProps} />
        Want To Read
      </Button>
      <Button as="a" {...ButtonProps} href="/present">
        <Icon as={BsBookmark} {...IconProps} />
        Currently Reading
      </Button>
      <Button as="a" {...ButtonProps} href="/past">
        <Icon as={BiBook} {...IconProps} />
        Already Read
      </Button>
    </Flex>
  );
};

export default Sidebar;
