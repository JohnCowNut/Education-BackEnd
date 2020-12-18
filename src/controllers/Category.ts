import { Request, Response, NextFunction } from "express";
import CatchAsync from "../utils/CatchAsync";
import ICategory from "@/types/Interfaces/Category.interface";
import Category from "../models/Categories";

export const createCategory = CatchAsync(
  async (req: Request, res: Response, _: NextFunction) => {
    const { name }: ICategory = req.body;
    const category = await Category.create({ name });
    res.status(200).json({
      message: "success",
      data: {
        category,
      },
    });
  }
);


