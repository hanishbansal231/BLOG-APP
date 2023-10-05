import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    image: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const Blog = model('Blog', blogSchema);
export default Blog;