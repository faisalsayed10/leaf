import React from "react";
import { Provider } from "next-auth/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "@lib/theme";
import "react-pro-sidebar/dist/css/styles.css";
import "@styles/index.css";
import Layout from "@components/ui/Layout";

export default function App({ Component, pageProps, router }) {
	return (
		<Provider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<CSSReset />
				{router.pathname === "/signin" ||
				router.pathname === "/signout" ||
				router.pathname === "/verify" ? (
					<Component {...pageProps} />
				) : (
					<Layout pageTitle='title'>
						<Component {...pageProps} />
					</Layout>
				)}
			</ChakraProvider>
		</Provider>
	);
}
