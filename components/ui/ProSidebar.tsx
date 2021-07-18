import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiBook, BiBookAlt } from "react-icons/bi";
import { BsBookmark, BsList } from "react-icons/bs";
import { MdLibraryBooks } from "react-icons/md";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import useMedia from "use-media";
import Home from "../icons/Home";
import Login from "../icons/Login";
import Search from "../icons/Search";

interface Props {}

const IconProps = {
  boxSize: 5,
};

const ProSidebarSection = (props: Props) => {
  const router = useRouter();
  const isLessThan700 = useMedia({ maxWidth: 700 });

  return (
    <Box className="sidebar-parent">
      <ProSidebar
        collapsed={isLessThan700}
        style={{
          position: "sticky",
          top: "57px",
          height: "calc(100vh - 57px)",
          zIndex: 10,
        }}
      >
        <SidebarContent>
          <Menu iconShape="round">
            <MenuItem
              active={router.route === "/"}
              icon={<Home {...IconProps} />}
              onClick={() => router.push("/")}
            >
              Home
            </MenuItem>
            <MenuItem
              active={router.route.startsWith("/search")}
              icon={<Search {...IconProps} />}
              onClick={() => router.push("/search")}
            >
              Search
            </MenuItem>
            <MenuItem
              active={router.route.startsWith("/genre")}
              icon={<Icon as={MdLibraryBooks} {...IconProps} />}
              onClick={() => router.push("/genre")}
            >
              Genres
            </MenuItem>
          </Menu>
          <Menu iconShape="round">
            <MenuItem
              active={router.route.startsWith("/future")}
              icon={<Icon as={BiBookAlt} {...IconProps} />}
              onClick={() => router.push("/future")}
            >
              Want To Read
            </MenuItem>
            <MenuItem
              active={router.route.startsWith("/current")}
              icon={<Icon as={BsBookmark} {...IconProps} />}
              onClick={() => router.push("/current")}
            >
              Currently Reading
            </MenuItem>
            <MenuItem
              active={router.route.startsWith("/past")}
              icon={<Icon as={BiBook} {...IconProps} />}
              onClick={() => router.push("/past")}
            >
              Already Read
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="round">
            <MenuItem
              onClick={() => router.push("/signin")}
              icon={<Login {...IconProps} />}
            >
              Log In
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </Box>
  );
};

export default ProSidebarSection;
