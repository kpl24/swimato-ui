import { createSlice } from "@reduxjs/toolkit";

export type CartItemType = {
    _id: string,
    quantity: number,
    restaurant_id?: string
}

export type AppReducerType = {
    filter: {
        location: {
            city: string
        },
        name: string
    },
    cart: CartItemType[],
    restaurant_id: string,
}

export type updateFilterParams = {
    payload: {
        location: {
            city: string
        },
        name: string
    }
}

export type updateCartParamType = {
    payload: CartItemType
}

const initialState: AppReducerType = {
    filter: {
        location: {
            city: "sangli"
        },
        name: ""
    },
    cart: [],
    restaurant_id: ''
};

export const userSlice = createSlice({
    name: "appDetails",
    initialState,
    reducers: {
        updateFilter: (state, action: updateFilterParams) => {
            state.filter = action.payload;
        },
        addCartItem: (state, action: updateCartParamType) => {
            state.cart = [...state.cart, action.payload];
            state.restaurant_id = action.payload.restaurant_id || ''
        },
        updateCartItem: (state, action: updateCartParamType) => {
            state.cart = state.cart.map(item => item._id === action.payload._id ? action.payload : item)
        },
        removeCartItem: (state, action: updateCartParamType) => {
            state.cart = state.cart.filter(item => item._id !== action.payload._id);
        },
        resetFilter: (state) => {
            state.filter = { location: { city: "sangli" }, name: "" };
        }
    },
});

export const { updateFilter, resetFilter, addCartItem, updateCartItem, removeCartItem } = userSlice.actions;

export default userSlice.reducer;