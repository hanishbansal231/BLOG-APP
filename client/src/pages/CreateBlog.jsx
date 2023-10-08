import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateMyBlogs } from "../services/operations/blogAPI";
function CreateBlog() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [previewImage, setPreviewImage] = useState('');
    const { checkEdit } = useSelector((state) => state.blog);
    const { blogData } = useSelector((state) => state.blog);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    function handleUserInput(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handelUserImage(e) {
        e.preventDefault();
        const uploadFile = e.target.files[0];
        if (uploadFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadFile);
            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            });
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (checkEdit) {
            if (!formData.title || !formData.description || !previewImage) {
                toast.error('All field are mandatory...');
                return;
            }
            const formDatas = new FormData();
            formDatas.append('title', formData.title);
            formDatas.append('description', formData.description);
            formDatas.append('image', previewImage);
            dispatch(updateMyBlogs(isLoggedIn, blogData._id, formDatas, navigate));
        } else {
            if (!formData.title || !formData.description || !previewImage) {
                toast.error('All field are mandatory...');
                return;
            }
            const formDatas = new FormData();
            formDatas.append('title', formData.title);
            formDatas.append('description', formData.description);
            formDatas.append('image', previewImage);
            dispatch(createBlog(formDatas, isLoggedIn, navigate));
        }
    }

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <form noValidate onSubmit={onFormSubmit} className="bg-red-400 min-w-[30em] rounded-sm p-3">
                <h2 className="text-center text-2xl font-semibold">
                    {
                        checkEdit
                            ?
                            'Edit Blog'
                            :
                            'Create Blog'
                    }
                </h2>
                <div className="flex flex-col gap-2 mb-2">
                    <label className="text-lg" htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        placeholder="Enter Title"
                        className="py-3 px-1 rounded-sm border outline-0"
                        onChange={handleUserInput}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg" htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.value}
                        placeholder="Enter Description"
                        className="py-3 px-1 rounded-sm border outline-0 resize-none h-[100px]"
                        onChange={handleUserInput}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {
                        previewImage
                            ?
                            (
                                <img
                                    src={previewImage}
                                    className="text-lg bg-red-200 flex items-center justify-center cursor-pointer mt-3 h-[150px]"
                                    alt={formData.title}
                                />
                            )
                            :
                            (
                                <>
                                    <label className="text-lg bg-red-200 flex items-center justify-center cursor-pointer mt-3 h-[150px]" htmlFor="image">Select Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="hidden"
                                        onChange={handelUserImage}
                                    />
                                </>
                            )
                    }
                </div>
                <button
                    type="submit"
                    className="w-full bg-yellow-400 mt-5 py-3 rounded-sm cursor-pointer text-white text-xl font-semibold hover:bg-yellow-500 transition-all duration-300"
                >
                    {checkEdit ? 'Edit Blog' : 'Create Account'}

                </button>
            </form >
        </div >
    );
}

export default CreateBlog;