// To get TypeScript to know what req and res
import { type Request, type Response } from "express";

import * as userService from "../service/user.ts";

import type { SignupInput } from "../types/user";

//Request<{}, {}, SignupInput> -> I don't care about URL params or response body types, but I want req.body to have the shape of SignupInput.
const signup = async (req: Request<{}, {}, SignupInput>, res: Response) => {
  const user = await userService.signup(req.body);
  res.status(200).json({
    message: "User get created",
    user,
  });
};

export { signup };
