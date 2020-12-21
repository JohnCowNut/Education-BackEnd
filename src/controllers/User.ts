import { IUser, userRequest } from '../types/Interfaces/User.interface';

import { Request, Response, NextFunction } from 'express'

import User from '../models/Users';
import CatchAsync from '../utils/CatchAsync';
import AppError from '../utils/AppError';


export const getUser = (req: Request & userRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: 'success',
        user: req.user

    })
}
export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find()
    res.status(200).json({
        message: 'success',
        data: {
            users,
        }
    })
}


// Admin
export const getUserById = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return next(new AppError('IdUser Is invalid', 401));
    }
    res.status(200).json({
        message: 'success',
        data: {
            user,
        }
    })
})

export const deleteUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById(id).select('+active');
    if (!user) {
        return next(new AppError('IdUser Is invalid', 401));
    }
    user.active = false;
    user.save();
    res.status(200).json({
        message: 'Active false success',
    })
})


const filterObj = (obj: IUser, ...allowedFields: string[]) => {
    const newObj: any = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

export const updateMe = CatchAsync(async (req: Request & userRequest, res: Response, next: NextFunction) => {
    // 1) Create error if users POTSs password data

    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use / updateMyPassword.',
                400
            )
        );
    }
    // 2) Filtered out unwanted fields names that are not allowed to be update
    const filteredBody = filterObj(req.body, 'name', 'email');
    // 3) Update user document
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    });
});