import { Request, Response, NextFunction } from 'express'

import UserModel from '../models/Users';

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    return await UserModel.find()
}

