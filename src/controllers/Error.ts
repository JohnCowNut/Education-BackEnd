import IError from '../types/Error.interface'
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);

    const message = `Invalid input data.${errors.join('.  ')}`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (messageString: string) => {

    const value = messageString.match(/(["'])(.*?[^\\])\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!!`;
    return new AppError(message, 400);
};


const sendErrorDev = (err: IError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorProd = (err: any, res: any) => {
    // Operational , trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        // Programming or other unknown error: don't  leak details
    } else {
        console.error('ERROR !!!', err);
        res.status(500).json({
            status: 'error',
            message: 'Some thing went very wrong'
        });
    }
};
const globalError = (err: IError, _: Request, res: Response, _1: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (err.name === 'CastError') {
            error = handleCastErrorDB(error);
        }
        if (err.code === 11000) {
            error = handleDuplicateFieldsDB(err.message);
        }
        sendErrorProd(error, res);
    }
}

export default globalError;