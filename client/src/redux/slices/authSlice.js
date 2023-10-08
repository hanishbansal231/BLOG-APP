import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || null,
    data: localStorage.getItem('data') || {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action?.payload;
        },
    },
});
export const { setData } = authSlice.actions;
export default authSlice.reducer;