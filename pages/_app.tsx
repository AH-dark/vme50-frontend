import type { AppProps } from "next/app";
import React, { useMemo } from "react";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "~/theme";
import wrapper from "~/redux/wrapper";
import createEmotionCache from "~/theme/emotionCache";
import { CacheProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import Head from "next/head";
import { useAppSelector } from "~/redux/hooks";
import { useGetSiteInfoQuery } from "~/service/api";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const fontFamily = [
    "Roboto",
    "Helvetica",
    "Arial",
    "Noto Sans SC",
    "sans-serif",
    "Noto Emoji",
].join(",");

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const title = useAppSelector((state) => state.viewUpdate.title);
    const { data: siteInfo } = useGetSiteInfoQuery();
    const siteName = useMemo(() => {
        return siteInfo?.site_name || "Random Donate";
    }, [siteInfo]);

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <Head>
                <title>{title === null ? siteName : `${title} - ${siteName}`}</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <GlobalStyles
                    styles={{
                        ":root": {
                            fontFamily: fontFamily,
                        },
                    }}
                />
                <SnackbarProvider
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                >
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default wrapper.withRedux(App);
