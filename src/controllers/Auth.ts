
import { IUser } from '../types/User.interface';
import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Users'
import { Register, Login } from '../types/Auth.interface';
import status from 'http-status'
import AppError from '../utils/AppError';
import CatchAsync from '../utils/CatchAsync';

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
const createSendToken = (user: IUser, httpStatus: number, res: Response) => {
    const token = signToken(user._id);
    const cookieOptions = {
        httpOnly: true,
        secure: false
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    user.password = undefined;
    res.status(httpStatus).json({
        message: 'Register completed',
        accessToken: token,
        data: {
            user,
        }
    })

}
export const register = CatchAsync(async (req: Request, res: Response, _: NextFunction) => {
    const { email, password, confirmPassword, nickName }: Register = req.body;
    const newUser = await User.create({
        email,
        password,
        nickName,
        confirmPassword
    })
    createSendToken(newUser, 201, res);
});
export const login = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: Login = req.body;
    if (!email || !password) {
        return next(new AppError('Email and password is not empty', +status[400]));
    }
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password);
    if (!user || !correct) {
        return next(new AppError('Incorrect email or password', +status[401]))
    }
    return createSendToken(user, status.CREATED, res);
})