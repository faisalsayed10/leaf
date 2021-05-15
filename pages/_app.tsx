import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import theme from "@lib/theme";

const GlobalStyle: React.FC = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap");

          html {
            background-color: rgb(237, 242, 247);
            border-top: 5px solid #2ff8bc;
            box-sizing: border-box;
          }

          * {
            font-family: "Karla", sans-serif;
          }

          body {
            background: transparent;
          }

          .active__sidebar {
            background-color: var(--chakra-colors-gray-200);
            border-radius: var(--chakra-radii-lg);
            font-weight: 600;
          }

          .readmoreless {
            color: var(--chakra-colors-gray-500);
            margin-left: 2px;
          }

          .readmoreless:hover {
            text-decoration: underline;
          }
        `}
      />
      {children}
    </>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}
