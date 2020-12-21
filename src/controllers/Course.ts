import AppError from '../utils/AppError';
import status from "http-status";
import { Request, Response, NextFunction } from "express";
import CatchAsync from "../utils/CatchAsync";
import Course from "../models/Course";
import ICourse from "../types/Interfaces/Course.interface";
export const getAllCourses = CatchAsync(
  async (_: Request, res: Response, _1: NextFunction) => {
    const course = await Course.find();
    res.status(status.ACCEPTED).json({
      message: "success",
      length: course.length,
      data: {
        course,
      },
    });
  }
);
export const createOneCourse = CatchAsync(
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
export const updateOneCourse = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await Course.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!course) {
      return next(new AppError('No documentation found with that ID', 404));
    }
    res.status(200).json({
      message: "status",
      data: {
        course,
      },
    });
  }
)

export const deleteOneCourse = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id)
  if (!course) {
    return next(new AppError('IdUser Is invalid', 401));
  }
  res.status(200).json({
    message: 'Active false success',
  })
})

export const getOneCourse = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const course = await Course.findById(id)
  if (!course) {
    return next(new AppError('IdUser Is invalid', 401));
  }
  res.status(200).json({
    message: 'Active false success',
    data: {
      course,
    }
  })
})