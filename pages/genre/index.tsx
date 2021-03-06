import { Container, Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { groupedGenres } from "@lib/constants";
import { readableTitle } from "@util/helpers";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment } from "react";
import { MdLibraryBooks } from "react-icons/md";

const Genres = () => {
	return (
		<>
			<Head>
				<title>Leaf — Genres</title>
			</Head>
			<Container maxW={["container.sm", "container.sm", "container.md"]} py={4}>
				{Object.entries(groupedGenres).map(([key, value]) => {
					return (
						<Fragment key={key}>
							<Heading as="h2" size="lg" my={4} color="gray.500">
								{key.toUpperCase()}
							</Heading>
							<Wrap spacing={4} align="center">
								{value.map((genre, i) => {
									return (
										<WrapItem as={Link} href={`/genre/${genre}`} key={i}>
											<Flex
												_hover={{ transform: "scale(1.05)" }}
												transitionDuration="300ms"
												cursor="pointer"
												border="0.5px solid #CBD5E0"
												p="1"
												align="center">
												<MdLibraryBooks size={16} style={{ margin: "0 auto", display: "inline" }} />
												<Text fontSize="md" px="1" align="center">
													{readableTitle(genre)}
												</Text>
											</Flex>
										</WrapItem>
									);
								})}
							</Wrap>
						</Fragment>
					);
				})}
			</Container>
		</>
	);
};

export default Genres;
