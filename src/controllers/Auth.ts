import { DecodeProtected } from "../types/Interfaces/Auth.interface";

import { IUser } from "../types/Interfaces/User.interface";
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import { Register, Login } from "../types/Interfaces/Auth.interface";
import status from "http-status";
import AppError from "../utils/AppError";
import CatchAsync from "../utils/CatchAsync";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user: IUser, httpStatus: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOptions = {
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  user.password = undefined;
  res.status(httpStatus).json({
    message: "Register completed",
    accessToken: token,
    data: {
      user,
    },
  });
};
export const register = CatchAsync(
  async (req: Request, res: Response, _: NextFunction) => {
    const { email, password, confirmPassword, nickName }: Register = req.body;
    const newUser = await User.create({
      email,
      password,
      nickName,
      confirmPassword,
    });
    createSendToken(newUser, 201, res);
  }
);
export const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: Login = req.body;
    if (!email || !password) {
      return next(
        new AppError("Email and password is not empty", +status[400])
      );
    }
    const user = await User.findOne({ email }).select("+password");
    const correct = await user.correctPassword(password, user.password);
    if (!user || !correct) {
      return next(new AppError("Incorrect email or password", +status[401]));
    }
    return createSendToken(user, status.CREATED, res);
  }
);

/// type for user ============================================@params: {u}
export const protectedAuth = CatchAsync(
  async (req: Request & { user: object }, _: Response, next: NextFunction) => {
    // 1) getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // check token
    if (!token) {
      return next(
        new AppError(
          "Your are not logged in! Please log in to get access. ",
          401
        )
      );
    }

    // 2) Varification token
    const decoded: DecodeProtected = (await jwt.verify(
      token,
      process.env.JWT_SECRET
    )) as DecodeProtected;
    // 3) Check if user still exits

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The token belonging to this token does no longer exits",
          status.NETWORK_AUTHENTICATION_REQUIRED
        )
      );
    }
    // 4) Check user change password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password ! please login again",
          status.NETWORK_AUTHENTICATION_REQUIRED
        )
      );
    }
    req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request & { user: { role: 'admin' | 'instructors' | 'user' } }, _: Response, next: NextFunction) => {

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You  do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
