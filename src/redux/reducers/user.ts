import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../constants/types";

type UserReducerType = {
	user: UserType | null,
	token: string
}

const initialState: UserReducerType = {
	user: null,
	token: ""
};

export const userSlice = createSlice({
	name: "userDetails",
	initialState,
	reducers: {
		setUser: (state, action) => ({ ...state, user: action.payload.user, token: action.payload.token }),
		removeUser: (state) => ({ ...state, user: null, token: "" }),
	},
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;