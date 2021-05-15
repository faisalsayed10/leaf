import { Button, ButtonGroup } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GrAmazon } from "react-icons/gr";

interface Props {}

const BuyOptions: React.FC = () => {
  return (
    <>
      <Text fontSize="lg" align="center" fontWeight="600" my="1">
        Buy it on
      </Text>
      <Flex as={ButtonGroup} variant="outline" justify="space-evenly" mb="1">
        <Button aria-label="Google Books" leftIcon={<FcGoogle size="24px" />}>
          Google Books
        </Button>
        <Button aria-label="Amazon" leftIcon={<GrAmazon size="24px" />}>
          Search On Amazon
        </Button>
      </Flex>
    </>
  );
};

export default BuyOptions;
