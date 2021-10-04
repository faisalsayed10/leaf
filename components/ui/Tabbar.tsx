import { Flex, Icon, IconButton } from "@chakra-ui/react";
import Home from "@components/icons/Home";
import Search from "@components/icons/Search";
import User from "@components/icons/User";
import { BsList } from "react-icons/bs";

const Tabbar = () => {
	return (
		<Flex pos="sticky" bottom={0} bgColor="white" borderTop="1px solid #E2E8F0">
			<IconButton flex="1" bgColor="transparent" icon={<Home boxSize="28px" />} aria-label="home" />
			<IconButton
				flex="1"
				bgColor="transparent"
				icon={<Search boxSize="28px" />}
				aria-label="search"
			/>
			<IconButton
				flex="1"
				bgColor="transparent"
				icon={<Icon as={BsList} boxSize="28px" />}
				aria-label="my-lists"
			/>
			<IconButton
				flex="1"
				bgColor="transparent"
				icon={<Icon as={User} boxSize="28px" />}
				aria-label="my-profile"
			/>
		</Flex>
	);
};

export default Tabbar;
