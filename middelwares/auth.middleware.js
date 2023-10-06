import jwt from 'jsonwebtoken';
import AppError from '../utils/error.util.js';
import asyncHandler from './asyncHandler.middleware.js';
const isLoggedIn = asyncHandler(async (req, res, next) => {
    try {
        const token = 
        req.cookies.token ||
        req.body.token ||
        (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
        if (!token) {
            next(new AppError('Unauthenticated, please login again', 401))
        }

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;
        next();
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
});

export {
    isLoggedIn
}