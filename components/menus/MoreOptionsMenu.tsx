import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import AuthModal from "@components/modals/AuthModal";
import CreateListModal from "@components/modals/CreateListModal";
import { Book, List, ListType } from "@prisma/client";
import { toCapitalizedWords } from "@util/helpers";
import { Item } from "@util/types";
import axios from "axios";
import copy from "copy-to-clipboard";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiCopy, BiHeart } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { CgRemoveR } from "react-icons/cg";
import { FiMoreVertical } from "react-icons/fi";
import { useSWRConfig } from "swr";
import ListMenu from "./ListMenu";

interface Props {
  data: Item | Book;
}

const MoreOptionsMenu: React.FC<Props> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [session, isSessionLoading] = useSession();
  const router = useRouter();
  const [bookData, setBookData] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateList,
    onOpen: onOpenCreateList,
    onClose: onCloseCreateList,
  } = useDisclosure();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    setBookData({
      gbookId: (data as Book)?.gbookId || data?.id,
      title: (data as Book)?.title || (data as Item)?.volumeInfo?.title,
      description:
        (data as Book)?.description || (data as Item)?.volumeInfo?.description,
      authors: (data as Book)?.authors || (data as Item)?.volumeInfo?.authors,
      publishedDate:
        (data as Book)?.publishedDate ||
        (data as Item)?.volumeInfo?.publishedDate,
      previewLink:
        (data as Book)?.previewLink || (data as Item)?.volumeInfo?.previewLink,
      imageLinks:
        (data as Book)?.imageLinks || (data as Item)?.volumeInfo?.imageLinks,
    });
  }, [data]);

  const addBookToList = async (listId?: string, listType?: ListType) => {
    try {
      setLoading(true);
      const res = axios.post<List>("/api/list/add", {
        listId,
        listType,
        ...bookData,
      });

      toast.promise(
        res,
        {
          loading: "Adding to your list ⏳",
          success: ({ data }) => `Added to ${toCapitalizedWords(data.name)}`,
          error: `Aw man! An error occurred while adding. Maybe, try again later? 😭`,
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeBookFromList = async () => {
    if (!bookData) {
      console.log("No book data");
      return;
    }

    const listName = router.asPath.split("/")[2];
    let listType: ListType;
    let listId: string;

    switch (listName) {
      case "future":
        listType = "wantToRead";
        break;
      case "current":
        listType = "currentlyReading";
        break;
      case "past":
        listType = "alreadyRead";
        break;
      default:
        listType = "normal";
        listId = listName;
    }

    const key = listId
      ? `/api/list?id=${listId}`
      : `/api/list?type=${listType}`;

    const { data } = await axios.get<List & { books: Book[] }>(key);

    mutate(
      key,
      data.books.filter((book) => book.gbookId != bookData.gbookId),
      false
    );

    await axios.post<List>("/api/list/remove", {
      listId,
      listType,
      gbookId: bookData.gbookId,
    });

    mutate(key);

    toast.success(`Book removed successfully!`);
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="more-options"
          icon={<FiMoreVertical />}
        />
        <MenuList>
          <MenuItem
            icon={<BiHeart size="18" />}
            onClick={() => {
              if (isSessionLoading) return;
              session?.user ? addBookToList(null, "wantToRead") : onOpen();
            }}
            disabled={loading}
          >
            Want To Read
          </MenuItem>
          <MenuItem
            icon={<BsBookmark size="18" />}
            onClick={() => {
              if (isSessionLoading) return;
              session?.user
                ? addBookToList(null, "currentlyReading")
                : onOpen();
            }}
            disabled={loading}
          >
            Currently Reading
          </MenuItem>
          <MenuItem
            icon={<BiCheck size="18" />}
            onClick={() => {
              if (isSessionLoading) return;
              session?.user ? addBookToList(null, "alreadyRead") : onOpen();
            }}
            disabled={loading}
          >
            Already Read
          </MenuItem>
          <MenuDivider />
          <ListMenu
            data={bookData}
            buttonText="Add To Playlist"
            onOpen={onOpenCreateList}
            addBookToList={addBookToList}
          />
          <MenuDivider />
          <MenuItem
            icon={<BiCopy size="18" />}
            onClick={() => {
              copy(
                `http://localhost:3000/book/${
                  (data as Book)?.gbookId || data?.id
                }`
              );
              toast("Copied to Clipboard!", { icon: "✅" });
            }}
          >
            Copy Link
          </MenuItem>
          {router.route.startsWith("/list") && (
            <>
              <MenuDivider />
              <MenuItem
                icon={<CgRemoveR size="18" />}
                onClick={removeBookFromList}
              >
                Remove from this List
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      <AuthModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
      <CreateListModal
        onClose={onCloseCreateList}
        isOpen={isOpenCreateList}
        book={bookData}
      />
    </>
  );
};

export default MoreOptionsMenu;
