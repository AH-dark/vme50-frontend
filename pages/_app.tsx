import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "~/theme";

const _app: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default _app;
