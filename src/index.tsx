import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import "flag-icons/sass/flag-icons.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import store from "redux/store";
import theme from "theme";
import i18n from "i18n";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <React.Suspense>
            <Provider store={store}>
                <BrowserRouter>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider theme={theme}>
                            <SnackbarProvider
                                anchorOrigin={{
                                    horizontal: "center",
                                    vertical: "top",
                                }}
                            >
                                <App />
                            </SnackbarProvider>
                        </ThemeProvider>
                    </I18nextProvider>
                </BrowserRouter>
            </Provider>
        </React.Suspense>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
