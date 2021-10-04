import { Input, InputGroup } from "@chakra-ui/input";

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
		</InputGroup>
	);
};

export default SearchInput;
