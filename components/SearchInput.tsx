import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";

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
        <IconButton
          variant="outline"
          aria-label="Search"
          icon={<SearchIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
