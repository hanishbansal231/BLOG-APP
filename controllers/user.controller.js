import AppError from "../utils/error.util.js";
import User from '../models/user.model.js';
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    httpOnly: true,
    secure: true,
}
const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find({}).populate('blogs').exec();
        if (!user) {
            return next(new AppError('User registration failed, Please try again', 400));
        }
        return res.status(200).json({
            success: true,
            message: 'Find All User Successfully...',
            user,
        });
    } catch (e) {
        next(AppError(e.message, 500));
    }
}

const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return next(new AppError('All field are mandatory...', 403));
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return next(new AppError('User is already Register please try to login', 401));
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        if (!user) {
            return next(new AppError('User registration failed, Please try again', 400));
        }

        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Registered User Successfully',
            user,
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(password);
        if (!email || !password) {
            return next(new AppError('All field are mandatory...', 403));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Email or Password does not matched', 400));
        }

        const token = await user.generateJWTToken();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: 'Login Successfully...',
            user,
        });


    } catch (e) {
        return next(new AppError(e.message, 500));
    }
}


export {
    getAllUser,
    signUp,
    login
}