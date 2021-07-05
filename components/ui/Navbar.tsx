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
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const displayName = session?.user?.name || session?.user?.email.split("@")[0];

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
      zIndex="100"
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
            name={displayName}
            src={
              session?.user.image ||
              `https://source.boringavatars.com/beam/40/${displayName}?colors=92A1C6,146A7C,F0AB3D,C271B4,C20D90`
            }
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
              <MenuItem onClick={() => router.push('/api/auth/signout')}>Log Out</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      ) : (
        <Button variant="outline" colorScheme="gray" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </Flex>
  );
};

export default Header;
