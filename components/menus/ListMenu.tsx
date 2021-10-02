import { Button, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { List, ListType } from "@prisma/client";
import { useSession } from "next-auth/client";
import React from "react";
import { GrAdd } from "react-icons/gr";
import { MdPlaylistAdd } from "react-icons/md";
import useSWR from "swr";

interface Props {
  onOpen: () => void;
  data: any;
  buttonText?: string;
  addBookToList: (listId?: string, listType?: ListType) => void;
}

const ListMenu: React.FC<Props> = ({
  onOpen,
  data,
  buttonText,
  addBookToList,
}) => {
  const [session, isSessionLoading] = useSession();
  const {
    data: lists,
    error,
    isValidating,
  } = useSWR<List[]>(session ? "/api/lists" : null);

  return (
    <Menu>
      {buttonText ? (
        <MenuButton
          as={Button}
          colorScheme="none"
          color="gray.800"
          fontWeight="400"
          p="0"
          pl="4"
          w="full"
          borderRadius="0"
          className="chakra-menu__menuitem css-13c7rae"
          aria-label="Add to playlist"
          leftIcon={<Icon as={MdPlaylistAdd} boxSize={5} />}
        >
          {buttonText}
        </MenuButton>
      ) : (
        <MenuButton
          borderRadius="md"
          as={IconButton}
          aria-label="Add to playlist"
          icon={<Icon as={MdPlaylistAdd} boxSize={5} />}
        />
      )}
      <MenuList>
        {error && !isValidating && !data ? (
          <MenuItem>Error loading your lists</MenuItem>
        ) : lists?.length > 0 ? (
          <>
            {lists.map((list) => (
              <MenuItem
                key={list.id}
                icon={<Icon as={MdPlaylistAdd} boxSize={5} />}
                onClick={() => addBookToList(list.id, null)}
              >
                {list.name}
              </MenuItem>
            ))}
            <MenuDivider />
            <MenuItem onClick={onOpen} icon={<Icon as={GrAdd} boxSize={5} />}>
              Create a new list
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem isDisabled>No lists found</MenuItem>
            {isSessionLoading ? (
              <>
                <MenuDivider />
                <MenuItem isDisabled>Just a second...</MenuItem>
              </>
            ) : session?.user ? (
              <>
                <MenuDivider />
                <MenuItem onClick={onOpen} icon={<GrAdd />}>
                  Create a new list
                </MenuItem>
              </>
            ) : null}
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default ListMenu;
