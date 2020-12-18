import { login, register, restrictTo } from './../controllers/Auth';
import { SIGN_IN, REGISTER } from './../constants/API/Auth';

import express from 'express';
import { getAllUser } from '../controllers/User';

const router = express.Router();
router.post(`${SIGN_IN}`, login)
router.post(`${REGISTER}`, register)

router.use(restrictTo('admin'))
router.get('/user', getAllUser)
export default router;