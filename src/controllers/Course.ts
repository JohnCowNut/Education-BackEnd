import status from "http-status";
import { Request, Response, NextFunction } from "express";
import CatchAsync from "../utils/CatchAsync";
import Course from "../models/Course";
import ICourse from "../types/Interfaces/Course.interface";
export const getAllCourses = CatchAsync(
  async (_: Request, res: Response, _1: NextFunction) => {
    const course = await Course.find();
    console.log(status[200]);
    res.status(status.ACCEPTED).json({
      message: "success",
      length: course.length,
      data: {
        course,
      },
    });
  }
);
export const createCourse = CatchAsync(
  async (req: Request, res: Response, _: NextFunction) => {
    const { title, idUser, categories, price, createAt, description }: ICourse = req.body;
    const course = await Course.create({
      title,
      idUser,
      categories,
      price,
      createAt,
      description
    });
    res.status(200).json({
      message: "status",
      data: {
        course,
      },
    });
  }
);
export const updateCourse = CatchAsync(
  async (req: Request, res: Response, _: NextFunction) => {
    const course = await Course.findByIdAndUpdate(req.body.id, req.body, {
      new: true
    });
    res.status(200).json({
      message: "status",
      data: {
        course,
      },
    });
  }
)
