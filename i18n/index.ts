import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextLocalStorageBackend from "i18next-localstorage-backend";
import I18NextChainedBackend from "i18next-chained-backend";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const i18n = i18next
    .createInstance({
        debug: process.env.NODE_ENV === "development",
        load: "languageOnly",
        defaultNS: "common",
        ns: ["common", "title", "api", "payment"],
        backend: {
            backends: [I18NextLocalStorageBackend, I18NextHttpBackend],
            backendOptions: [
                {
                    expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
                },
                {
                    loadPath: "/locales/{{lng}}/{{ns}}.json",
                },
            ],
        },
        fallbackNS: "common",
        fallbackLng: "zh",
        saveMissing: true,
    })
    .use(I18nextBrowserLanguageDetector)
    .use(I18NextChainedBackend)
    .use(initReactI18next);

i18n.init();

export default i18n;
