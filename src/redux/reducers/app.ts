import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterType = {
    location: {
        city: string
    },
    name: string
}

export type AppReducerType = {
    filter: FilterType,
}

const initialState: AppReducerType = {
    filter: {
        location: {
            city: ""
        },
        name: ""
    },
};

export const userSlice = createSlice({
    name: "appDetails",
    initialState,
    reducers: {
        updateFilter: (state, action: PayloadAction<FilterType>) => ({ ...state, filter: action.payload }),
        resetFilter: (state) => ({ ...state, filter: { location: { city: "sangli" }, name: "" } }),
    },
});

export const { updateFilter, resetFilter } = userSlice.actions;

export default userSlice.reducer;