import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppState, AppStore } from "./store";

export const useAppDispatch = () => useDispatch<AppStore["dispatch"]>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
