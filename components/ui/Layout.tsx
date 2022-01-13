import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import useMedia from "use-media";
import Navbar from "./Navbar";
import ProSidebarSection from "./ProSidebar";
import Tabbar from "./Tabbar";
import Head from "next/head";

type Props = {
	children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
	const isMoreThan400 = useMedia({ minWidth: 400 });

	return (
		<>
			<Head>
				<title>Leaf</title>
			</Head>
			<Box height="5px" bgColor="#2ff8bc" pos="sticky" top="0" zIndex="100" />
			<Navbar />
			{isMoreThan400 ? (
				<Flex bgColor="#edf2f7">
					<ProSidebarSection />
					<Box w="100%">{children}</Box>
				</Flex>
			) : (
				<>
					<Box w="100%" h="full" bgColor="#edf2f7">
						{children}
					</Box>
					<Tabbar />
				</>
			)}
		</>
	);
};

export default Layout;
