import mongoose from 'mongoose';
import { UserType } from '../shared/types';

export const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

const UserModel = mongoose.model<UserType>('User', userSchema);

export default UserModel;
