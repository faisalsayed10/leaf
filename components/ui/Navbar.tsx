import { Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const displayName = session?.user?.name || session?.user?.email.split("@")[0];

  return (
    <Flex
      bgColor="white"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #E2E8F0"
      pos="sticky"
      top="5px"
      py="3"
      px="6"
      zIndex="100"
    >
      <Link href="/">
        <Heading
          textTransform="uppercase"
          fontWeight="bold"
          letterSpacing="1px"
          fontSize="24px"
        >
          Libook
        </Heading>
      </Link>
      {/* {!loading && session ? (
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
              <MenuItem onClick={() => router.push("/api/auth/signout")}>
                Log Out
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      ) : (
        <></>
      )} */}
    </Flex>
  );
};

export default Navbar;
