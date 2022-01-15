import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@components/ui/Layout";
import { fetcher } from "@lib/fetcher";
import theme from "@lib/theme";
import "@styles/index.css";
import { Provider } from "next-auth/client";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import "react-pro-sidebar/dist/css/styles.css";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps, router }) {
	const LayoutComponent = /(\/signin)|(\/signout)|(\/verify)/.test(router.pathname)
		? Fragment
		: Layout;

	return (
		<Provider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				{/* <CSSReset /> */}
				<SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
					<LayoutComponent>
						<Component {...pageProps} />
						<Toaster position="top-right" toastOptions={{ duration: 5000 }} />
					</LayoutComponent>
				</SWRConfig>
			</ChakraProvider>
		</Provider>
	);
}
