import { Flex } from "@chakra-ui/layout";
import { Heading, IconButton } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { BiLogOut } from "react-icons/bi";

interface Props {}

const Navbar: React.FC<Props> = () => {
	const [session, loading] = useSession();

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
			<Link href="/" passHref>
				<Heading textTransform="uppercase" fontWeight="bold" letterSpacing="1px" fontSize="24px">
					Leaf
				</Heading>
			</Link>
			{!loading && session ? (
				<IconButton icon={<BiLogOut />} aria-label="icon" onClick={() => signOut()} />
			) : (
				<></>
			)}
		</Flex>
	);
};

export default Navbar;
