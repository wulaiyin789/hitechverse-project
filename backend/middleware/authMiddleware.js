import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// MODEL
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            console.error(err);
            res.status(401);
            throw new Error('Not authorized. Token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized. No token found');
    }
});

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorisated as an admin.');
    }
}

export { protect, admin };
