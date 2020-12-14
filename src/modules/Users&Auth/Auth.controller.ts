import { IUser } from './User.interface';
import express, { Request, Response, NextFunction } from 'express'
import status from 'http-status';
import { Controller, Response as HttpResponse } from '@shyn123/express-rest';
import CatchAsync from '../../utils/CatchAsync'
import { Register, Login } from './Auth.interface';
import UserModel from './User.model';
import jwt from 'jsonwebtoken';
class AuthController implements Controller {
    public path = '/user';
    public router = express.Router();
    private user = UserModel

    constructor() {
        this.initializeRoutes();
    }
    public initializeRoutes = () => {

        this.router.post(`${this.path}/register`, this.register)
    }
    private signToken = (id: string) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }
    private createSendToken = (user: IUser, httpStatus: number, res: Response) => {
        const token = this.signToken(user._id);
        const cookieOptions = {
            httpOnly: true,
            secure: false
        };
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
        }
        user.password = undefined;
        return HttpResponse(
            res,
            {
                message: 'Register completed',
                accessToken: token,
                data: {
                    user,
                }
            },
            httpStatus
        );
    }
    private register = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, nickName, confirmPassword }: Register = req.body;
        const newUser = await this.user.create({
            email,
            password,
            nickName,
            confirmPassword
        })

        this.createSendToken(newUser, status.CREATED, res)
    })

    private login = async (req: Request, res: Response) => {
        const { email, password }: Login = req.body;

    }

}

export default AuthController;