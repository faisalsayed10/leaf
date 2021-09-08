import { IconButton } from "@chakra-ui/button";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from "@chakra-ui/menu";
import React from "react";
import { BiCheck, BiCopy, BiHeart } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";

interface Props {}

const MoreOptionsMenu = () => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="more-options"
				icon={<FiMoreVertical />}
			/>
			<MenuList>
				<MenuItem icon={<BiHeart size="18" />}>Want To Read</MenuItem>
				<MenuItem icon={<BsBookmark size="18" />}>Currently Reading</MenuItem>
				<MenuItem icon={<BiCheck size="18" />}>Already Read</MenuItem>
				<MenuDivider />
				<MenuItem icon={<MdPlaylistAdd size="18" />}>Add To Playlist</MenuItem>
				<MenuDivider />
				<MenuItem icon={<BiCopy size="18" />}>Copy Link</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default MoreOptionsMenu;
