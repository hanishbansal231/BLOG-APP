import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    data: localStorage.getItem('data') || {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setData: (state, action) => {
            console.log(action?.payload);
            state.data = action?.payload;
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn',true);
        },
    },
});
export const { setData } = authSlice.actions;
export default authSlice.reducer;