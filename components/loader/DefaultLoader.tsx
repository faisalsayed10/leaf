import { SimpleGrid } from "@chakra-ui/layout";
import { PulseSpinner } from "react-spinners-kit";

const DefaultLoader = () => (
	<SimpleGrid placeItems="center" h="60vh">
		<PulseSpinner size={60} color="#000" />
	</SimpleGrid>
);

export default DefaultLoader;
