import { setData } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { USER_ENDPOINT } from '../apis';
import { toast } from 'react-hot-toast';

export function signUp(data,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', USER_ENDPOINT.REGISTER_USER, data);
            console.log(response?.data?.user);
            // dispatch(setData(response?.data?.user));
            navigate('/login');
        } catch (e) {
            console.log(e);
            console.log(e.message);
        }
        toast.dismiss(toastId);
    }
}


export function login(data,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', USER_ENDPOINT.LOGIN_USER, data);
            console.log(response?.data?.user);
            localStorage.setItem('data',JSON.stringify(response?.data?.user));
            dispatch(setData(response?.data?.user));
            navigate('/');
        } catch (e) {
            console.log(e);
            console.log(e.message);
        }
        toast.dismiss(toastId);
    }
}