import accountModel from "../model/account";
import userModel from "../model/user";
import type { SignupInput } from "../types/user";
import ApiError from "../utils/apiError";
import bcrypt from "bcrypt";

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

export { signup };
