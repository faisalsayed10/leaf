import { List } from ".prisma/client";
import { Box, Icon, useDisclosure } from "@chakra-ui/react";
import CreateListModal from "@components/modals/CreateListModal";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { BiCheck, BiHeart, BiUser } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { MdLibraryBooks, MdPlaylistAdd } from "react-icons/md";
import {
	Menu,
	MenuItem,
	ProSidebar,
	SidebarContent,
	SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import useSWR from "swr";
import useMedia from "use-media";
import Home from "../icons/Home";
import Login from "../icons/Login";
import Search from "../icons/Search";

interface Props {}

const IconProps = {
	boxSize: 5,
};

const ProSidebarSection = (props: Props) => {
	const [session, loading] = useSession();
	const router = useRouter();
	const isLessThan700 = useMedia({ maxWidth: 700 });
	const { data, error, isValidating } = useSWR<List[]>(
		session?.user ? "/api/lists" : null
	);
	const { isOpen, onOpen, onClose } = useDisclosure();

	if (error) console.error(error);

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
							active={router.asPath.startsWith("/list/future")}
							icon={<Icon as={BiHeart} {...IconProps} />}
							onClick={() => router.push("/list/future")}
						>
							Want To Read
						</MenuItem>
						<MenuItem
							active={router.asPath.startsWith("/list/current")}
							icon={<Icon as={BsBookmark} {...IconProps} />}
							onClick={() => router.push("/list/current")}
						>
							Currently Reading
						</MenuItem>
						<MenuItem
							active={router.asPath.startsWith("/list/past")}
							icon={<Icon as={BiCheck} {...IconProps} />}
							onClick={() => router.push("/list/past")}
						>
							Already Read
						</MenuItem>
					</Menu>
					<Menu>
						{data?.length > 0 ? (
							<MenuItem
								onClick={() => router.push("/lists")}
								icon={<Icon as={MdPlaylistAdd} {...IconProps} />}
							>
								Your Lists
							</MenuItem>
						) : (
							<MenuItem
								onClick={onOpen}
								icon={<Icon as={GrAdd} {...IconProps} />}
							>
								Create a List
							</MenuItem>
						)}
					</Menu>
				</SidebarContent>
				<SidebarFooter>
					<Menu iconShape="round">
						{!loading && session?.user ? (
							<MenuItem icon={<Icon as={BiUser} {...IconProps} />}>
								{session.user.name}
							</MenuItem>
						) : loading ? (
							<MenuItem>Just a Second...</MenuItem>
						) : (
							<MenuItem
								onClick={() => router.push("/signin")}
								icon={<Login {...IconProps} />}
							>
								Log In
							</MenuItem>
						)}
					</Menu>
				</SidebarFooter>
			</ProSidebar>
			<CreateListModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
		</Box>
	);
};

export default ProSidebarSection;
