import { useDisclosure } from "@chakra-ui/hooks";
import { Badge, Box } from "@chakra-ui/layout";
import CreateListModal from "@components/modals/CreateListModal";
import { ListWithBooks } from "@util/types";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  list?: ListWithBooks;
  isGeneric?: true;
}

const ListCard: React.FC<Props> = ({ list, isGeneric }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      onClick={() => (isGeneric ? onOpen() : router.push(`/list/${list.id}`))}
      w="200px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bgColor={isGeneric ? "gray.50" : "white"}
      cursor="pointer"
    >
      <Box p="4" minH="100">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {isGeneric
              ? "Add"
              : (list?.books?.length || 0) +
                (list?.books?.length === 1 ? ` book` : ` books`)}
          </Badge>
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            ml="2"
            textTransform="uppercase"
          >
            {isGeneric ? "New List" : list.name}
          </Box>
        </Box>

        <Box color="gray.500">
          {isGeneric ? "Create a new list" : list.description}
        </Box>
      </Box>
      <CreateListModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ListCard;
