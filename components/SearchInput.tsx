import { IconButton } from "@chakra-ui/button";
import { IoReloadSharp } from "react-icons/io5";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Tooltip } from "@chakra-ui/tooltip";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<Props> = ({ value, setValue }) => {
  return (
    <InputGroup maxW="700px">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outline"
        placeholder={"Search Books"}
      />
      <InputRightElement>
        <Tooltip
          hasArrow
          label="Refetch Search Results"
          bg="gray.300"
          color="black"
          openDelay={300}
        >
          <IconButton
            variant="outline"
            aria-label="Refetch Search Results"
            icon={<IoReloadSharp />} // OR IoReloadSharp
          />
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
