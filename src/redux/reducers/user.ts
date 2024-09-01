import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../constants/types";

type UserReducerType = {
	user: User | null,
}

const initialState: UserReducerType = {
	user: null,
};

export const userSlice = createSlice({
	name: "userDetails",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = null;
		}
	},
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;