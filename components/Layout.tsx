import { Flex } from "@chakra-ui/layout";
import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <Header />
    <Flex>
      <Sidebar />
      {children}
    </Flex>
  </>
);

export default Layout;
