import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { useUser } from "@auth0/nextjs-auth0";
import SearchInput from "./SearchInput";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ImBooks } from "react-icons/im";
import { GiCardRandom } from "react-icons/gi";

const Header: React.FC = () => {
  const { user, error, isLoading } = useUser();
  if (error) console.log(error);

  return (
    <Flex bgColor="white" alignItems="center" justifyContent="space-around" p="2" px="6">
      <Link href="/">
        <Text fontFamily="semibold" fontSize="2xl">
          Libook
        </Text>
      </Link>
      <Menu>
        <MenuButton
          as={Button}
          aria-label="Options"
          rightIcon={<ChevronDownIcon />}
          variant="ghost"
          fontWeight="normal"
        >
          Browse
        </MenuButton>
        <MenuList>
          <Link href="/subjects">
            <MenuItem icon={<ImBooks size={20} />}>Subjects</MenuItem>
          </Link>
          <Link href="/random">
            <MenuItem icon={<GiCardRandom size={20} />}>
              Random Book For You
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <SearchInput />
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
          <Button fontWeight="400" variant="ghost">Log in</Button>
        </Link>
      )}
    </Flex>
  );
};

export default Header;
