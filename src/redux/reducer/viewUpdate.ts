import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ViewUpdateState {
    title: string | null;
}

const initState: ViewUpdateState = {
    title: null,
};

const viewUpdate = createSlice({
    name: "viewUpdate",
    initialState: initState,
    reducers: {
        setTitle(state, action: PayloadAction<string | null>) {
            state.title = action.payload;
        },
    },
});

export const { setTitle } = viewUpdate.actions;
export default viewUpdate.reducer;
