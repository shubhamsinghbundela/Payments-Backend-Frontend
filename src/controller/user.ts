// To get TypeScript to know what req and res
import { type Request, type Response, type NextFunction } from "express";

import * as userService from "../service/user.ts";

import type { SignupInput } from "../types/user";
import ApiResponse from "../utils/apiResponse.ts";

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

export { signup };
