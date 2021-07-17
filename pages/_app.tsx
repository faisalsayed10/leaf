import React from "react";
import { Provider } from "next-auth/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "@lib/theme";
import "@styles/index.css"

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
