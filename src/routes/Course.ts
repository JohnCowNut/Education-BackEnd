import { protectedAuth } from './../controllers/Auth';

import { getAllCourses, createCourse, updateCourse } from "../controllers/Course";
import express from "express";
const router = express.Router();
router
    .route("/")
    .get(getAllCourses)
    .post(protectedAuth, createCourse)
    .patch(protectedAuth, updateCourse)
router
    .route("/:id")
// .get(getCourse)
// .patch()

export default router;
