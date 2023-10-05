import { useState } from "react";
import { toast } from 'react-hot-toast';
import { login } from "../services/operations/authAPI";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    async function onFormSubmit(e) {
        e.preventDefault();
        console.log("Startinh");
        if (!formData.password || !formData.email) {
            toast.error('All field are mandatory...');
            return;
        }
        if (!formData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error('Invalid Email Id');
            return;
        }

        dispatch(login(formData, navigate));
    }

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <form noValidate onSubmit={onFormSubmit} className="bg-red-400 min-w-[30em] rounded-sm p-3">
                <h2 className="text-center text-2xl font-semibold">
                    Register Form
                </h2>
                <div className="flex flex-col gap-2">
                    <label className="text-lg" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        className="py-3 px-1 rounded-sm border outline-0"
                        onChange={handleUserInput}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        className="py-3 px-1 rounded-sm border outline-0"
                        onChange={handleUserInput}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-yellow-400 mt-5 py-3 rounded-sm cursor-pointer text-white text-xl font-semibold hover:bg-yellow-500 transition-all duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;