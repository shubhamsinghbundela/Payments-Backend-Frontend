import { type Request, type Response, type NextFunction } from "express";
import ApiError from "../utils/apiError";

interface Error {
  statusCode?: number;
  status?: number;
  message?: string;
  name?: string;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle known (custom) errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
