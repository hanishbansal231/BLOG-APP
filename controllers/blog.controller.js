import AppError from "../utils/error.util.js"
import Blog from '../models/blog.model.js';
import User from '../models/user.model.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
const getAllBlog = async (req, res, next) => {
    try {
        const blog = await Blog.find({});
        if (!blog) {
            return next(new AppError('Blog are not found...', 402));
        }
        return res.status(200).json({
            success: trWue,
            message: 'Blog Found Successfully...',
            blog,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const createBlog = async (req, res, next) => {
    try {
        const id = req.user.id;
        console.log(req.file);
        const { title, description } = req.body;
        if (!title || !description) {
            return next(new AppError('All field are mandatory', 402));
        }
        const blog = await Blog.create({
            title,
            description,
            image: {
                public_id: 'Dummy',
                secure_url: 'Dummy'
            },
            user: id,
        });
        if (!blog) {
            return next(new AppError('blog not created please try again...', 403));
        }
        if (req.file) {
            console.log(req.file);
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'Blog',
                });
                if (result) {
                    blog.image.public_id = result.public_id;
                    blog.image.secure_url = result.secure_url;
                    fs.rm(`uploads/${req.file.filename}`);

                }
            } catch (e) {
                return next(new AppError(e.message, 500));
            }
        }
        const user = await User.findByIdAndUpdate(id, {
            $push: { blogs: blog._id },
        }, { new: true }).populate('blogs').exec();
        await blog.save();
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Blog Created Successfully',
            blog,
        });
    } catch (e) {
        next(new AppError(e.message, 500));
    }
}

const editBlog = async (req, res, next) => {
    try {
        console.log("Starting")
        const { id } = req.params;
        const { title, description } = req.body;
        const blog = await Blog.findById({ _id: id });
        console.log(blog);
        if (!blog) {
            return next(new AppError('Blog not found...', 403));
        }

        const updateBlog = await Blog.findByIdAndUpdate({ _id: id }, {
            title: title,
            description: description,
            image: {
                public_id: 'Dummy',
                secure_url: 'Dummy',
            }

        });

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'blog'
                });
                if (result) {
                    updateBlog.image.public_id = result.public_id;
                    updateBlog.image.secure_url = result.secure_url;
                    fs.rm(`uploads/${req.file.filename}`);
                }
                await updateBlog.save();
            } catch (e) {
                return next(new AppError(e.message, 500));
            }
        }
        console.log(updateBlog);
        res.status(200).json({
            success: true,
            message: 'Blog updated successfully...',
            blog: updateBlog,
        })


    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById({ _id: id });
        if (!blog) {
            return next(new AppError('Blog not found...', 403));
        }
        return res.status(200).json({
            success: true,
            message: 'Find Blog',
            blog,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById({ _id: id });
        if (!blog) {
            return next(new AppError('Blog not found...', 403));
        }
        await cloudinary.v2.uploader.destroy(blog.image.public_id);
        await Blog.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "Deleted Successfully...",
        })
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

const getUserBlog = async (req, res, next) => {
    try {
        console.log('Starting...');
        // const { id } = req.params;
        const id = req.user.id;
        console.log(id);
        const blog = await User.findById({ _id: id }).populate('blogs').exec();
        return res.status(200).json({
            success: true,
            message: 'Blogs are find...',
            blog
        })
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}

export {
    getAllBlog,
    createBlog,
    editBlog,
    getBlogById,
    deleteBlog,
    getUserBlog
}