import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyBlogs, myBlogs } from "../services/operations/blogAPI";
import { AiFillDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
function MyBlogs() {
    const dispatch = useDispatch();
    const [myBlog, setMyBlog] = useState([]);
    const { isLoggedIn } = useSelector((state) => state.auth);
    async function fetchMyBlog() {
        try {
            const result = await dispatch(myBlogs(isLoggedIn));
            setMyBlog(result);
        } catch (e) {
            console.log(e);
        }
    }
    async function deleteMyBlog(data) {
        try {
            await dispatch(deleteMyBlogs(isLoggedIn,data._id));
            const result = await dispatch(myBlogs(isLoggedIn));
            setMyBlog(result);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchMyBlog();
    }, []);
    return (
        <div>
            {
                myBlog && (
                    myBlog.map((item, idx) => (
                        <div key={idx} className="max-w-[800px] mt-4 mb-4 m-auto border">
                            <div className="p-7 flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold text-2xl">
                                        Title: {item?.title}
                                    </h2>
                                    <p className="text-lg">
                                        Description: {item?.description}
                                    </p>
                                </div>
                                <div className="flex gap-4 font-semibold text-2xl text-red-400">
                                    <span className="cursor-pointer"><BsPencilSquare /></span>
                                    <span onClick={() => deleteMyBlog(item)} className="cursor-pointer"><AiFillDelete /></span>
                                </div>
                            </div>
                            <div className="h-[300px] m-auto mt-4">
                                <img
                                    src={item?.image?.secure_url}
                                    alt={item?.title}
                                    className="w-full h-full border"
                                />
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default MyBlogs;