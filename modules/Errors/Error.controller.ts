import IError from './Error.interface'

import { Request, Response, NextFunction } from 'express';
const sendErrorDev = (err: IError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

export default (err: IError, _: Request, res: Response, _1: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        console.log("Here is error controller")
        console.log(error)
    }

}