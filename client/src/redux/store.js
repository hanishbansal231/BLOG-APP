import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/slices/authSlice'
import blogReducer from '../redux/slices/BlogSlice'
const store = configureStore({
    reducer:{
        auth:authReducer,
        blog:blogReducer
    }
});


export default store;