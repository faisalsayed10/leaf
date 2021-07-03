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
import { useSession } from "next-auth/client";

const Header: React.FC = () => {
  const [session, loading] = useSession();
  if (loading) return <p>loading</p>

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
      zIndex='100'
    >
      <Link href="/">
        <Text cursor="pointer" fontWeight="500" fontSize="2xl">
          Libook
        </Text>
      </Link>
      {!loading && session ? (
        <Menu placement="bottom">
          <MenuButton
            as={Avatar}
            aria-label="Profile"
            cursor="pointer"
            height="40px"
            width="40px"
            name={session?.user?.name}
            src={session?.user?.image}
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
              <Link href="/api/auth/signout">
                <MenuItem>Log Out</MenuItem>
              </Link>
            </MenuGroup>
          </MenuList>
        </Menu>
      ) : (
        <Link href="/api/auth/signin">
          <Button variant="outline" colorScheme="gray">Login</Button>
        </Link>
      )}
    </Flex>
  );
};

export default Header;
