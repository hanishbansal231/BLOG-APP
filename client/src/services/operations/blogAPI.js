import { toast } from 'react-hot-toast';
import { BLOG_ENDPOINT } from '../apis';
import { apiConnector } from '../apiConnector';


export function createBlog(data, token, navigate) {
    return async () => {
        const toastId = toast.loading('Loading...');
        try {
            console.log("TOKEN", token);
            const response = await apiConnector('POST', BLOG_ENDPOINT.CREATE_BLOG, data, {
                Authorization: `Bearer ${token}`
            });
            console.log(response);
        } catch (Error) {
            console.log(Error);
        }
        toast.dismiss(toastId);
    }
}