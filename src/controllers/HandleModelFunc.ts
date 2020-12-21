import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/CatchAsync';
import AppError from '../utils/AppError';

export const createOne = (Model: mongoose.Model<any>) =>
    CatchAsync(async (req: Request, res: Response, _: NextFunction) => {
        const doc = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

export const updateOne = (Model: mongoose.Model<any>) =>
    CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return next(new AppError('No documentation found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

