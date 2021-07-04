import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { MdPlaylistAdd } from "react-icons/md";

interface Props {}

const AddToList: React.FC = () => {
  return (
    <>
      <Text fontSize="lg" align="center" fontWeight="600" my="1">
        Add To List
      </Text>
      <Flex as={ButtonGroup} variant="outline" justify="space-evenly" mb="1" mx='4'>
        <Button>Want To Read</Button>
        <Button>Currently Reading</Button>
        <Button>Already Read</Button>
        <IconButton
          aria-label="Add to playlist"
          icon={<MdPlaylistAdd size="24px" />}
        />
      </Flex>
    </>
  );
};

export default AddToList;
