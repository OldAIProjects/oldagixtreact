import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import darkTheme from "../styles/theme/darkTheme";
import createEmotionCache from "../utility/createEmotionCache";

import { Provider } from "react-redux";

import store from "../lib/store";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>AGIXT</title>
          <link
            rel="icon"
            href="https://josh-xt.github.io/AGiXT/images/AGiXT-gradient-flat.svg"
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={darkTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
