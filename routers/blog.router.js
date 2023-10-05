import { Router } from "express";
import { getAllBlog, createBlog, editBlog, getBlogById, deleteBlog, getUserBlog } from "../controllers/blog.controller.js";
import { isLoggedIn } from "../middelwares/auth.middleware.js";
import upload from "../middelwares/multer.middleware.js";
const router = Router();

router.get('/getallblog', isLoggedIn, getAllBlog);
router.get('/getblog/:id', getBlogById);
router.get('/userblog/:id', getUserBlog);
router.post('/createblog', isLoggedIn, upload.single('image'), createBlog);
router.put('/editblog/:id', upload.single('image'), editBlog);
router.delete('/deleteblog/:id', deleteBlog);

export default router;