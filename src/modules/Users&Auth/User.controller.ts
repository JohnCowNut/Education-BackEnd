import express from 'express'

import { Controller, Response as HttpResponse } from '@shyn123/express-rest';
import UserModel from './User.model'

class UserController implements Controller {
    public path = '/user';
    public router = express.Router();
    private user = UserModel
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes = async () => {
        this.router.get(`${this.path}`, await this.allUser);
    }
    private allUser = async () => {
        return this.user.find()
    }


}
export default UserController 