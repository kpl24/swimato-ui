import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
    _id: string,
    quantity: number,
}

type FilterType = {
    location: {
        city: string
    },
    name: string
}

export type AppReducerType = {
    filter: FilterType,
    cart: CartItemType[],
    restaurant_id: string,
}

const initialState: AppReducerType = {
    filter: {
        location: {
            city: ""
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
        updateFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload;
        },
        addCartItem: (state, action: PayloadAction<CartItemType>) => {
            state.cart = [...state.cart, action.payload];
        },
        setRestaurantId: (state, action: PayloadAction<{ restaurant_id: string }>) => {
            state.restaurant_id = action.payload.restaurant_id;
        },
        removeRestaurantId: (state) => {
            state.restaurant_id = ''
        },
        updateCartItem: (state, action: PayloadAction<CartItemType>) => {
            state.cart = state.cart.map(item => item._id === action.payload._id ? action.payload : item);
        },
        removeCartItem: (state, action: PayloadAction<CartItemType>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload._id);
        },
        resetFilter: (state) => {
            state.filter = { location: { city: "sangli" }, name: "" };
        }
    },
});

export const { updateFilter, resetFilter, addCartItem, updateCartItem, removeCartItem, setRestaurantId, removeRestaurantId } = userSlice.actions;

export default userSlice.reducer;