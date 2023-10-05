import { Router } from "express";
import { getAllUser, signUp, login } from "../controllers/user.controller.js";
import  asyncHandler  from "../middelwares/asyncHandler.middleware.js";

const router = Router();

router.get('/alluser', getAllUser);
router.post('/signup', asyncHandler(signUp));
router.post('/login', asyncHandler(login));

export default router;