import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.models';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.jwt_token;

        if (!token) {
            return res
                .status(401)
                .json({ error: 'Unauthorized - No Token Provided' });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        if (!decoded || typeof decoded.userId !== 'string') {
            return res
                .status(401)
                .json({ error: 'Unauthorized - Invalid Token' });
        }

        const user = await UserModel.findById(decoded.userId).select(
            '-password'
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default authMiddleware;
