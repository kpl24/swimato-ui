import { createSlice } from "@reduxjs/toolkit";

export type AppReducerType = {
    filter: {
        location: {
            city: string
        },
        name: string
    }
}

export type updateFilterParams = {
    payload: {
        location: {
            city: string
        },
        name: string
    }
}

const initialState: AppReducerType = {
    filter: {
        location: {
            city: "sangli"
        },
        name: ""
    }
};

export const userSlice = createSlice({
    name: "appDetails",
    initialState,
    reducers: {
        updateFilter: (state, action: updateFilterParams) => {
            state.filter = action.payload;
        },
        resetFilter: (state) => {
            state.filter = {location: {city: "sangli"}, name: ""};
        }
    },
});

export const { updateFilter, resetFilter } = userSlice.actions;

export default userSlice.reducer;