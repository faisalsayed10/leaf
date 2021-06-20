import { SimpleGrid } from "@chakra-ui/layout";
import { RotateSpinner } from "react-spinners-kit";

const DefaultLoader = () => (
  <SimpleGrid placeItems="center" h="60vh" w="full">
    <RotateSpinner size={60} color="#5befbd" />
  </SimpleGrid>
);

export default DefaultLoader;
