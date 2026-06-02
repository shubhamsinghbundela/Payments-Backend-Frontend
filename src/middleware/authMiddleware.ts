import { type Request, type Response, type NextFunction } from "express";
import userModel from "../model/user";
import ApiError from "../utils/apiError";
import { verifyAccessToken } from "../utils/jwt";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.token as string;

    if (!token) {
      throw ApiError.unauthorized("Access token missing");
    }

    const decode = verifyAccessToken(token);

    const userExists = await userModel.findOne({
      _id: decode.userId,
    });

    if (!userExists) {
      throw ApiError.notFound("User Not found");
    }

    req.userId = decode.userId;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
