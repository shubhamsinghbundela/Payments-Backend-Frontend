// To get TypeScript to know what req and res
import { type Request, type Response, type NextFunction } from "express";

import * as accountService from "../service/account.ts";

import ApiResponse from "../utils/apiResponse.ts";
import type { transferInput } from "../types/account.ts";
import ApiError from "../utils/apiError.ts";

const transfer = async (
  req: Request<{}, {}, transferInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }
    const data = await accountService.transfer(userId, req.body);
    ApiResponse.ok(res, "transferDone", data);
  } catch (error) {
    next(error);
  }
};

export { transfer };
