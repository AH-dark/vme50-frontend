import { Action, configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import viewUpdate from "./reducer/viewUpdate";
import api from "services/api";

const store = configureStore({
    reducer: {
        viewUpdate,
        [api.reducerPath]: api.reducer,
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk).concat(api.middleware),
});

export default store;

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
