import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextLocalStorageBackend from "i18next-localstorage-backend";
import I18NextChainedBackend from "i18next-chained-backend";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const i18n = i18next
    .createInstance({
        debug: process.env.NODE_ENV === "development",
        saveMissing: process.env.NODE_ENV === "development",
        load: "currentOnly",
        defaultNS: "common",
        fallbackNS: "common",
        ns: ["common", "title", "api", "payment"],
        fallbackLng: "zh-cn",
        backend: {
            backends: [I18NextLocalStorageBackend, I18NextHttpBackend],
            backendOptions: [
                {
                    expirationTime: 24 * 60 * 60 * 1000, // 1 days
                },
                {
                    loadPath: "/locales/{{lng}}/{{ns}}.json",
                },
            ],
        },
        supportedLngs: ["zh-CN", "en-US"],
    })
    .use(I18nextBrowserLanguageDetector)
    .use(I18NextChainedBackend)
    .use(initReactI18next);

const languages: Record<string, string | undefined> = {
    "zh-cn": "中文",
    "en-us": "English",
};

export const getLanguageName = (lang: string) => {
    return languages[lang.toLowerCase()] || lang;
};

i18n.init();

export default i18n;
