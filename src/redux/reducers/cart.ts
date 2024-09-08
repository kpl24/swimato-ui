import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
    _id: string,
    quantity: number,
}

type RestaurantIDType = {
    restaurant_id: string
}

export type CartReducerType = {
    cart: CartItemType[],
    restaurant_id: string | null,
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
        setRestaurantId: (state, action: PayloadAction<RestaurantIDType>) => ({ ...state, restaurant_id: action.payload.restaurant_id }),
        removeRestaurantId: (state) => ({ ...state, restaurant_id: null }),
        updateCartItem: (state, action: PayloadAction<CartItemType>) => {
            const updatedCart = state.cart.map(item => item._id === action.payload._id ? action.payload : item);
            return { ...state, cart: updatedCart }
        },
        removeCartItem: (state, action: PayloadAction<CartItemType>) => {
            const updatedCart = state.cart.filter(item => item._id !== action.payload._id);
            return { ...state, cart: updatedCart }
        },
    },
});

export const { addCartItem, updateCartItem, removeCartItem, setRestaurantId, removeRestaurantId } = userSlice.actions;

export default userSlice.reducer;