import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.models';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateToken';

export const getLoggedInUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.userId;
    try {
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
};

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res
                .status(400)
                .json({ message: 'Please fill in all the fields!' });
        }
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res
                .status(409)
                .json({ message: 'User with this email already exists' });
        }

        const passwordHashed = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            fullName,
            email,
            password: passwordHashed
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
        }

        res.status(200).json(newUser);
    } catch (error) {
        console.log('---Error in register controller!---', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

export const signInController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json(user);
    } catch (error) {
        console.log('---Error in sign in controller!---', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

export const logOutController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.cookie('jwt_token', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const myProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.userId;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordCheck = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!passwordCheck) {
            return res
                .status(400)
                .json({ error: 'Your current Password is incorrect!' });
        }
        if (newPassword !== confirmNewPassword) {
            return res
                .status(400)
                .json({ error: 'New passwords do not match' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.log('Error in myProfile controller', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
