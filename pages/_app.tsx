import React, { Fragment } from "react";
import { Provider } from "next-auth/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "@lib/theme";
import "react-pro-sidebar/dist/css/styles.css";
import "@styles/index.css";
import Layout from "@components/ui/Layout";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import { fetcher } from "@lib/fetcher";

export default function App({ Component, pageProps, router }) {
  const LayoutComponent = /(\/signin)|(\/signout)|(\/verify)/.test(
    router.pathname
  )
    ? Fragment
    : Layout;

  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <SWRConfig value={{ fetcher }}>
          <LayoutComponent>
            <Component {...pageProps} />
            <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
          </LayoutComponent>
        </SWRConfig>
      </ChakraProvider>
    </Provider>
  );
}
