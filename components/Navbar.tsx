import { useUser } from "@auth0/nextjs-auth0";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import Link from "next/link";
import React from "react";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  const { user, error, isLoading } = useUser();
  if (error) console.log(error);

  return (
    <Flex
      bgColor="white"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
      pos="sticky"
      top="0"
      p="2"
      px="6"
    >
      <Link href="/">
        <Text cursor="pointer" fontWeight="500" fontSize="2xl">
          Libook
        </Text>
      </Link>
      {!isLoading && user ? (
        <Menu placement="bottom">
          <MenuButton
            as={Avatar}
            aria-label="Profile"
            cursor="pointer"
            height="40px"
            width="40px"
            name={user?.nickname}
            src={user?.picture}
            variant="ghost"
          />
          <MenuList>
            <MenuGroup title="Account">
              <Link href="/profile">
                <MenuItem>My Profile</MenuItem>
              </Link>
              <Link href="/lists">
                <MenuItem>My Lists</MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <Link href="/faq">
                <MenuItem>FAQ</MenuItem>
              </Link>
              <Link href="/api/auth/logout">
                <MenuItem>Log Out</MenuItem>
              </Link>
            </MenuGroup>
          </MenuList>
        </Menu>
      ) : (
        <Link href="/api/auth/login">
          <Button variant="outline" colorScheme="gray">Login</Button>
        </Link>
      )}
    </Flex>
  );
};

export default Header;
