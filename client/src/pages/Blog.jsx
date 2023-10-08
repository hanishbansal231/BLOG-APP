import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../services/operations/blogAPI";

function Blog(){
    const dispatch = useDispatch();
    const [blogs,setBlogs] = useState([]);
    const {isLoggedIn} = useSelector((state) => state.auth);
    async function getAllBlog(){
        const result = await dispatch(allBlogs(isLoggedIn));
        setBlogs(result);
    }
    console.log(blogs);
    useEffect(() => {
        getAllBlog();
    },[]);
    return (
        <div>
        {
            blogs && (
                blogs.map((item, idx) => (
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

export default Blog;