import { Button, ButtonGroup } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GrAmazon } from "react-icons/gr";
import { SiEbay } from "react-icons/si";

interface Props {
	previewLink: string;
	searchString: string;
	searchStringWithAuthor: string;
}

//                                 book categ  search term
// Ebay - https://www.ebay.com/sch/267/i.html?_nkw=harry+potter
// Amazon - https://www.amazon.com/s?k=Harry+Potter&rh=n%3A283155&dc

const BuyOptions: React.FC<Props> = ({ previewLink, searchString, searchStringWithAuthor }) => {
	return (
		<>
			<Text fontSize="lg" align="center" fontWeight="600" my="1">
				Buy it on
			</Text>
			<Flex as={ButtonGroup} variant="outline" justify="space-evenly" mb="1">
				<Button
					as={Link}
					href={previewLink}
					aria-label="Google Books"
					leftIcon={<FcGoogle size="24px" />}
					_hover={{ transform: "scale(1.05)" }}
					transitionDuration="300ms"
					cursor="pointer">
					Google Books
				</Button>
				<Button
					as={Link}
					href={`https://www.amazon.com/s?k=${encodeURIComponent(
						searchStringWithAuthor
					)}&rh=n%3A283155&dc`}
					aria-label="Amazon"
					leftIcon={<GrAmazon size="24px" />}
					_hover={{ transform: "scale(1.05)" }}
					transitionDuration="300ms"
					cursor="pointer">
					Amazon
				</Button>
				<Button
					as={Link}
					href={`https://www.ebay.com/sch/267/i.html?_nkw=${encodeURIComponent(searchString)}`}
					aria-label="Ebay"
					leftIcon={<SiEbay size="24px" />}
					_hover={{ transform: "scale(1.05)" }}
					transitionDuration="300ms"
					cursor="pointer">
					Ebay
				</Button>
			</Flex>
		</>
	);
};

export default BuyOptions;
