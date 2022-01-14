import { Flex, Icon, IconButton } from "@chakra-ui/react";
import Home from "@components/icons/Home";
import Search from "@components/icons/Search";
import { useRouter } from "next/router";
import { CgMore } from "react-icons/cg";
import { MdLibraryBooks } from "react-icons/md";

const Tabbar = () => {
	const router = useRouter();
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
			<IconButton
				flex="1"
				bgColor="transparent"
				icon={<Icon as={CgMore} boxSize="28px" />}
				borderRadius="0"
				aria-label="my-profile"
			/>
		</Flex>
	);
};

export default Tabbar;
