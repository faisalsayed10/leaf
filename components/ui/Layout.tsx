import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import ProSidebarSection from "./ProSidebar";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
  pageTitle: string;
};

const Layout: React.FC<Props> = ({ children, pageTitle }) => (
  <>
    <Box height="5px" bgColor="#2ff8bc" pos="sticky" top="0" zIndex="1000" />
    <Navbar pageTitle={pageTitle} />
    <Flex bgColor="#edf2f7">
      <ProSidebarSection />
      <Box w="100%">{children}</Box>
    </Flex>
  </>
);

export default Layout;
