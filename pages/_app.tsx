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
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "~/i18n";

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
    const { t } = useTranslation("title");
    const { data: siteInfo } = useGetSiteInfoQuery();

    const siteName = useMemo(() => {
        return siteInfo?.site_name || "Random Donate";
    }, [siteInfo]);
    const viewTitle = useAppSelector((state) => state.viewUpdate.title);
    const title = useMemo(
        () => (viewTitle === null ? siteName : `${t(viewTitle)} - ${siteName}`),
        [viewTitle, siteName]
    );

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <I18nextProvider i18n={i18n}>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <meta name={"description"} content={siteInfo?.site_description} />
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
            </I18nextProvider>
        </CacheProvider>
    );
};

export default wrapper.withRedux(App);
