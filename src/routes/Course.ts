import { protectedAuth, restrictTo } from './../controllers/Auth';

import { getAllCourses, createOneCourse, updateOneCourse, getOneCourse } from "../controllers/Course";
import express from "express";
const router = express.Router();
router
    .route("/")
    .get(getAllCourses)
    .post(protectedAuth, restrictTo('instructors', 'admin'), createOneCourse)
    .patch(protectedAuth, restrictTo('instructors', 'admin'), updateOneCourse)
    .delete(protectedAuth, restrictTo('instructors', 'admin'))
router
    .route("/:id")
    .get(getOneCourse)


export default router;
