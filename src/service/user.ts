import { password } from "bun";
import accountModel from "../model/account";
import userModel from "../model/user";
import type { SigninInput, SignupInput } from "../types/user";
import ApiError from "../utils/apiError";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import type { Types } from "mongoose";

const signup = async ({
  email,
  password,
  firstName,
  lastName,
}: SignupInput) => {
  const userExist = await userModel.findOne({
    email,
  });

  if (userExist) {
    throw ApiError.forbidden("User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await accountModel.create({
    userId: newUser._id,
    balance: 100,
  });

  return {
    userId: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };
};

const signin = async ({ email, password }: SigninInput) => {
  const userExist = await userModel.findOne({
    email: email,
  });

  if (!userExist) {
    throw ApiError.forbidden("User Not Found");
  }

  const correctPassword = await bcrypt.compare(password, userExist.password);

  if (correctPassword) {
    const accessToken = generateAccessToken({ userId: userExist._id });
    const refreshToken = generateRefreshToken({ userId: userExist._id });
    return {
      accessToken,
      refreshToken,
      user: {
        userId: userExist._id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
      },
    };
  } else {
    throw ApiError.forbidden("Password is invalid");
  }
};

const refresh = async (token: string) => {
  if (!token) {
    throw ApiError.unauthorized("Refresh token missing");
  }

  const decoded = verifyRefreshToken(token);

  const userExists = await userModel.findOne({
    _id: decoded.userId,
  });

  if (!userExists) {
    throw ApiError.notFound("User Not found");
  }

  const accessToken = generateAccessToken({
    userId: userExists._id,
  });

  return { accessToken };
};

const getMe = async (userId: string) => {
  if (!userId) {
    throw ApiError.notFound("user not found");
  }

  const userExist = await userModel.findOne({
    _id: userId,
  });

  if (!userExist) {
    throw ApiError.notFound("User Not found");
  }

  return {
    user: {
      userId: userExist._id,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      email: userExist.email,
    },
  };
};
export { signup, signin, refresh, getMe };
