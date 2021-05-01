import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiBook, BiBookAlt, BiBookContent } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { MdLibraryBooks } from "react-icons/md";
import HomeIcon from "./icons/HomeIcon";
import SearchIcon from "./icons/SearchIcon";

interface Props {}

const IconProps = {
  boxSize: 7,
  mr: "5",
};

const Sidebar: React.FC<Props> = () => {
  const router = useRouter();
  const ButtonProps = (href: string) => ({
    fontSize: "lg",
    cursor: "pointer",
    mb: "1",
    ml: "2",
    py: "2",
    px: "6",
    _hover: { bgColor: "gray.200", borderRadius: "2xl" },
    transitionDuration: "100ms",
    className: router.route === href ? "active__sidebar" : null,
  });

  return (
    <Flex
      flexDir="column"
      alignItems="start"
      top="20%"
      left="5"
      w="fit-content"
      pos="fixed"
    >
      <Link href="/">
        <Text {...ButtonProps("/")}>
          <HomeIcon {...IconProps} />
          Home
        </Text>
      </Link>
      <Link href="/search">
        <Text {...ButtonProps("/search")}>
          <SearchIcon {...IconProps} />
          Search
        </Text>
      </Link>
      <br />
      <Link href="/subjects">
        <Text {...ButtonProps("/subjects")}>
          <Icon as={MdLibraryBooks} {...IconProps} />
          Genres
        </Text>
      </Link>
      <Link href="/random">
        <Text {...ButtonProps("/random")}>
          <Icon as={BiBookContent} {...IconProps} />
          Random Book
        </Text>
      </Link>
      <br />
      <Link href="/future">
        <Text {...ButtonProps("/future")}>
          <Icon as={BiBookAlt} {...IconProps} />
          Want To Read
        </Text>
      </Link>
      <Link href="/present">
        <Text {...ButtonProps("/present")}>
          <Icon as={BsBookmark} {...IconProps} />
          Currently Reading
        </Text>
      </Link>
      <Link href="/past">
        <Text {...ButtonProps("/past")}>
          <Icon as={BiBook} {...IconProps} />
          Already Read
        </Text>
      </Link>
    </Flex>
  );
};

export default Sidebar;
