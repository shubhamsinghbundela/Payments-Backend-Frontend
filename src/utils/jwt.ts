import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";

import { Types } from "mongoose";

type Payload = {
  userId: Types.ObjectId;
};

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;

const generateAccessToken = (payload: Payload): string => {
  try {
    return jwt.sign(payload, accessSecret, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    } as SignOptions);
  } catch (error) {
    throw error;
  }
};

const generateRefreshToken = (payload: Payload): string => {
  try {
    return jwt.sign(payload, refreshSecret, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    } as SignOptions);
  } catch (error) {
    throw error;
  }
};

const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, accessSecret) as JwtPayload;
  } catch (error) {
    throw error;
  }
};

const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, refreshSecret) as JwtPayload;
  } catch (error) {
    throw error;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
