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
          html {
            background-color: rgb(237, 242, 247);
            border-top: 5px solid #2ff8bc;
            box-sizing: border-box;
          }

          body {
            background: transparent;
          }

          *,
          *:before,
          *:after {
            font-family: aileronregular;
          }

          @font-face {
            font-family: "aileronultralight";
            src: url("/fonts/aileron-ultralight.woff2") format("woff2"),
              url("/fonts/aileron-ultralight.woff") format("woff");
            font-weight: 100;
          }

          @font-face {
            font-family: "aileronlight";
            src: url("/fonts/aileron-light.woff2") format("woff2"),
              url("/fonts/aileron-light.woff") format("woff");
            font-weight: 200;
          }

          @font-face {
            font-family: "aileronthin";
            src: url("/fonts/aileron-thin.woff2") format("woff2"),
              url("/fonts/aileron-thin.woff") format("woff");
            font-weight: 300;
          }

          @font-face {
            font-family: "aileronregular";
            src: url("/fonts/aileron-regular.woff2") format("woff2"),
              url("/fonts/aileron-regular.woff") format("woff");
            font-weight: 400;
          }

          @font-face {
            font-family: "aileronheavy";
            src: url("/fonts/aileron-heavy.woff2") format("woff2"),
              url("/fonts/aileron-heavy.woff") format("woff");
            font-weight: 600;
          }

          @font-face {
            font-family: "aileronsemibold";
            src: url("/fonts/aileron-semibold.woff2") format("woff2"),
              url("/fonts/aileron-semibold.woff") format("woff");
            font-weight: 700;
          }

          @font-face {
            font-family: "aileronbold";
            src: url("/fonts/aileron-bold.woff2") format("woff2"),
              url("/fonts/aileron-bold.woff") format("woff");
            font-weight: 800;
          }

          @font-face {
            font-family: "aileronblack";
            src: url("/fonts/aileron-black.woff2") format("woff2"),
              url("/fonts/aileron-black.woff") format("woff");
            font-weight: 900;
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
