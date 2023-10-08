import { toast } from 'react-hot-toast';
import { BLOG_ENDPOINT } from '../apis';
import { apiConnector } from '../apiConnector';


export function createBlog(data, token, navigate) {
    return async () => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', BLOG_ENDPOINT.CREATE_BLOG, data, {
                Authorization: `Bearer ${token}`
            });
            console.log(response);
            navigate('/myblogs');
        } catch (Error) {
            console.log(Error);
        }
        toast.dismiss(toastId);
    }
}

export function myBlogs(token) {
    return async () => {
        const toastId = toast.loading('Loading...');
        let result = []
        try {
            const response = await apiConnector('GET', BLOG_ENDPOINT.MY_BLOG, null, {
                Authorization: `Bearer ${token}`
            });
            if (!response?.data?.success) {
                console.log('Error Data not found');
            }
            result = response?.data?.blog?.blogs;
        } catch (Error) {
            console.log(Error);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function deleteMyBlogs(token, id) {
    return async () => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('DELETE', `${BLOG_ENDPOINT.DELETE_MY_BLOG}${id}`, null, {
                Authorization: `Bearer ${token}`
            });
            console.log(response);
        } catch (Error) {
            console.log(Error);
        }
        toast.dismiss(toastId);
    }
}

export function updateMyBlogs(token, id, data, navigate) {
    return async () => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('PUT', `${BLOG_ENDPOINT.UPDATE_MY_BLOG}${id}`, data, {
                Authorization: `Bearer ${token}`
            });
            console.log(response);
            navigate('/myblogs');

        } catch (Error) {
            console.log(Error);
        }
        toast.dismiss(toastId);
    }
}

export function allBlogs(token) {
    return async () => {
        const toastId = toast.loading('Loading...');
        let result = [];
        try {
            const response = await apiConnector('GET',BLOG_ENDPOINT.ALL_BLOG,null, {
                Authorization: `Bearer ${token}`
            });
            result = response?.data?.blog;

        } catch (Error) {
            console.log(Error);
        }
        toast.dismiss(toastId);
        return result;
    }
}