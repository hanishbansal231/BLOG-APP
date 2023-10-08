import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogData: [],
    checkEdit: false,
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setEdit: (state, action) => {
            state.checkEdit = action?.payload;
        },
        setBlogData: (state, action) => {
            console.log(action);
            state.blogData = action?.payload;
        }
    },
});
export const { setEdit, setBlogData } = blogSlice.actions;
export default blogSlice.reducer;