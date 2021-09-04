import React, { Fragment } from "react";
import { Provider } from "next-auth/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "@lib/theme";
import "react-pro-sidebar/dist/css/styles.css";
import "@styles/index.css";
import Layout from "@components/ui/Layout";

export default function App({ Component, pageProps, router }) {
	const LayoutComponent = /(\/signin)|(\/signout)|(\/verify)/.test(router.pathname)
		? Fragment
		: Layout;

	return (
		<Provider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<CSSReset />
				<LayoutComponent>
					<Component {...pageProps} />
				</LayoutComponent>
			</ChakraProvider>
		</Provider>
	);
}
