import { login, register, restrictTo, changedPassword, protectedAuth } from './../controllers/Auth';
import { SIGN_IN, REGISTER, CHANGED_PASSWORD, UPDATE_ME } from './../constants/API/Auth';

import express from 'express';
import { getUserById, deleteUser, updateMe, getUser } from '../controllers/User';

const router = express.Router();


router.get(`/`, protectedAuth, getUser)
router.patch(`${CHANGED_PASSWORD}`, protectedAuth, changedPassword)
router.post(`${SIGN_IN}`, login)
router.post(`${REGISTER}`, register)
router.post(`${UPDATE_ME}`, protectedAuth, updateMe)
router.use(restrictTo('admin'))
router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)

export default router;