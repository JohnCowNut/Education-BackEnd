import express, { Request, Response } from 'express'
import status from 'http-status';
import { Controller, Response as HttpResponse } from '@shyn123/express-rest';
import UserModel from './User.model'
import { Register } from './Auth.interface';
class UserController implements Controller {
    public path = '/user';
    public router = express.Router();
    private user = UserModel
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = async () => {

        this.router.get(`${this.path}`, await this.allUser);
        this.router.post(`${this.path}/register`, this.register)
    }
    private allUser = async () => {
        return this.user.find()
    }
    private register = async (req: Request, res: Response) => {
        const { email, password, nickName, confirmPassword }: Register = req.body;
        const newUser = new this.user({
            email,
            password,
            nickName,
            confirmPassword
        })
        await newUser.save()
        return HttpResponse(
            res,
            { message: 'Register completed', accessToken: "dasdas" },
            status.CREATED
        );
    }
    private login = async (req: Request, res: Response) => {

    }

}
export default UserController 