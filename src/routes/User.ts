import { login, register } from './../controllers/Auth';
import { SIGN_IN, REGISTER } from './../constants/API/Auth';

import express from 'express';
import { getAllUser } from '../controllers/User';

const router = express.Router();

router.post('/user', getAllUser)
router.post(`${SIGN_IN}`, login)
router.post(`${REGISTER}`, register)
export default router;