import Icon from "@chakra-ui/icon";
import React from "react";

const Login = (props) => (
	<Icon
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		display="inline"
		width="44"
		height="44"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="#2c3e50"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
		<path d="M20 12h-13l3 -3m0 6l-3 -3" />
	</Icon>
);

export default Login;
