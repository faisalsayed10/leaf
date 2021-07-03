import React from "react";
import { Provider } from "next-auth/client";
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

          .chakra-collapse {
            overflow: visible !important;
          }

          *:focus {
            box-shadow: none !important;
          }

          // React Autosuggest Styles

          .react-autosuggest__container {
            position: relative;
          }

          .react-autosuggest__suggestions-container {
            display: none;
            max-height: 300px;
            overflow-y: auto;
          }

          .react-autosuggest__suggestions-container--open {
            display: block;
            position: absolute;
            top: 51px;
            width: 280px;
            border: 1px solid #aaa;
            background-color: #fff;
            font-family: Helvetica, sans-serif;
            font-weight: 300;
            font-size: 16px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            z-index: 2;
          }

          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 10px 20px;
          }

          .react-autosuggest__suggestion--highlighted {
            background-color: #ddd;
          }

          .highlight {
            font-weight: bold;
          }
        `}
      />
      {children}
    </>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
