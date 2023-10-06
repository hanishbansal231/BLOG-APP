import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editTrue: false,
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setEdit:(state,action) => {
            state.editTrue = action?.payload;
        }
    },
});
export const {  } = blogSlice.actions;
export default blogSlice.reducer;