import { Request, Response, NextFunction } from 'express';

type funcAsync = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any>>

export default (fn: funcAsync) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
