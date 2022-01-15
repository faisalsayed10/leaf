import {
	Flex,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useDisclosure
} from "@chakra-ui/react";
import Home from "@components/icons/Home";
import Search from "@components/icons/Search";
import CreateListModal from "@components/modals/CreateListModal";
import { List } from "@prisma/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { BiCheck, BiHeart } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { CgMore } from "react-icons/cg";
import { GrAdd } from "react-icons/gr";
import { MdLibraryBooks, MdPlaylistAdd } from "react-icons/md";
import useSWR from "swr";

const Tabbar = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	const { data } = useSWR<List[]>(session?.user ? "/api/lists" : null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex pos="sticky" bottom={0} bgColor="white" borderTop="1px solid #E2E8F0">
			<IconButton
				flex="1"
				bgColor="transparent"
				icon={<Home boxSize="28px" />}
				{...(router.route === "/" ? { borderBottom: "3px solid", borderColor: "blue.400" } : {})}
				borderRadius="0"
				onClick={() => router.push("/")}
				aria-label="home"
			/>
			<IconButton
				flex="1"
				bgColor="transparent"
				icon={<Search boxSize="28px" />}
				{...(router.route.startsWith("/search")
					? { borderBottom: "3px solid", borderColor: "blue.400" }
					: {})}
				borderRadius="0"
				onClick={() => router.push("/search")}
				aria-label="search"
			/>
			<IconButton
				flex="1"
				bgColor="transparent"
				icon={<Icon as={MdLibraryBooks} boxSize="28px" />}
				{...(router.route.startsWith("/genre")
					? { borderBottom: "3px solid", borderColor: "blue.400" }
					: {})}
				borderRadius="0"
				onClick={() => router.push("/genre")}
				aria-label="my-lists"
			/>
			{/* TODO: show more options here */}
			<Menu>
				<MenuButton
					as={IconButton}
					flex="1"
					bgColor="transparent"
					icon={<Icon as={CgMore} boxSize="28px" />}
					borderRadius="0"
					aria-label="my-profile"
				/>
				<MenuList>
					<MenuItem
						icon={<Icon as={BiHeart} boxSize="5" />}
						onClick={() => router.push("/list/future")}
					>
						Want To Read
					</MenuItem>
					<MenuItem
						icon={<Icon as={BsBookmark} boxSize="5" />}
						onClick={() => router.push("/list/current")}
					>
						Currently Reading
					</MenuItem>
					<MenuItem
						icon={<Icon as={BiCheck} boxSize="5" />}
						onClick={() => router.push("/list/past")}
					>
						Already Read
					</MenuItem>
					<MenuDivider />
					{data?.length > 0 ? (
						<MenuItem
							onClick={() => router.push("/lists")}
							icon={<Icon as={MdPlaylistAdd} boxSize="5" />}
						>
							Your Lists
						</MenuItem>
					) : (
						<MenuItem onClick={onOpen} icon={<Icon as={GrAdd} boxSize="5" />}>
							Create a List
						</MenuItem>
					)}
				</MenuList>
			</Menu>
			<CreateListModal onClose={onClose} isOpen={isOpen} />
		</Flex>
	);
};

export default Tabbar;
