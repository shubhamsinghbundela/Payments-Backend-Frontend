import { type Response } from "express";
class ApiResponse {
  static ok(res: Response, message: string, data: any = null) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }
}

export default ApiResponse;
