import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItemType } from "../../constants/types";

export type CartItemType = {
    item: MenuItemType,
    quantity: number,
}

type CartRestaurantType = {
    restaurant_id: string
}

export type CartReducerType = {
    cart: CartItemType[],
    restaurant_id: string | null
}

const initialState: CartReducerType = {
    cart: [],
    restaurant_id: null
};

export const userSlice = createSlice({
    name: "cartDetails",
    initialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<CartItemType>) => ({ ...state, cart: [...state.cart, action.payload] }),
        setRestaurantId: (state, action: PayloadAction<CartRestaurantType>) => ({ ...state, restaurant_id: action.payload.restaurant_id }),
        removeRestaurantId: (state) => ({ ...state, restaurant_id: null }),
        updateCartItem: (state, action: PayloadAction<CartItemType>) => {
            const updatedCart = state.cart.map(cartItem => cartItem.item._id === action.payload.item._id ? action.payload : cartItem);
            return { ...state, cart: updatedCart }
        },
        removeCartItem: (state, action: PayloadAction<CartItemType>) => {
            const updatedCart = state.cart.filter(cartItem => cartItem.item._id !== action.payload.item._id);
            return { ...state, cart: updatedCart }
        },
        resetCart: (state) => ({ ...state, cart: [], restaurant_id: null })
    },
});

export const { addCartItem, updateCartItem, removeCartItem, setRestaurantId, removeRestaurantId, resetCart } = userSlice.actions;

export default userSlice.reducer;