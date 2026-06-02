import jwt, { type SignOptions } from "jsonwebtoken";

import { Types } from "mongoose";

type Payload = {
  userId: Types.ObjectId;
};

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;

const generateAccessToken = (payload: Payload): string => {
  return jwt.sign(payload, accessSecret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  } as SignOptions);
};

const generateRefreshToken = (payload: Payload): string => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  } as SignOptions);
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret);
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
