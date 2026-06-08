// To get TypeScript to know what req and res
import { type Request, type Response, type NextFunction } from "express";

import * as userService from "../service/user.ts";

import type { SignupInput } from "../types/user";
import ApiResponse from "../utils/apiResponse.ts";
import ApiError from "../utils/apiError.ts";

//Request<{}, {}, SignupInput> -> I don't care about URL params or response body types, but I want req.body to have the shape of SignupInput.
const signup = async (
  req: Request<{}, {}, SignupInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.signup(req.body);
    ApiResponse.ok(res, "User successfully Created", user);
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken, user } = await userService.signin(
      req.body,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.ok(res, "Signin Successful", { accessToken, user });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = await userService.refresh(req.cookies.refreshToken);

    ApiResponse.ok(res, "Token refreshed successfully", { accessToken });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }
    const { user } = await userService.getMe(userId);

    ApiResponse.ok(res, "User get successfully", { user });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("refreshToken");

    ApiResponse.ok(res, "Logout Success");
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }

    const data = await userService.getAllUsers(userId);

    ApiResponse.ok(res, "Users fetched successfully", data);
  } catch (error) {
    next(error);
  }
};

export { signup, signin, refresh, getMe, logout, getAllUsers };
