import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { useUser } from "@auth0/nextjs-auth0";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (error) console.log(error);

  return (
    <Flex alignItems="center" justifyContent="space-between" p="2" mx="6">
      <Link href="/">
        <Text className="bold">Libook</Text>
      </Link>
      <Text>Browse</Text>
      <SearchInput />
      {!isLoading && user ? (
        <>
          <Link href="/profile">
            <Avatar />
          </Link>
          <Link href="/api/auth/logout">
            <a>Log Out</a>
          </Link>
        </>
      ) : (
        <Link href="/api/auth/login">
          <Text>Log&nbsp;In</Text>
        </Link>
      )}
    </Flex>
  );
};

export default Header;
