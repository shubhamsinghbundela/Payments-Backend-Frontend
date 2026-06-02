import mongoose from "mongoose";

import accountModel from "../model/account";
import ApiError from "../utils/apiError";
import type { transferInput } from "../types/account";

const transfer = async (userId: string, { to, amount }: transferInput) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const senderAccount = await accountModel.findOne({ userId }, null, {
      session,
    });

    if (!senderAccount) {
      throw new ApiError(404, "Sender account not found");
    }

    const receiverAccount = await accountModel.findOne({ userId: to }, null, {
      session,
    });

    if (!receiverAccount) {
      throw new ApiError(404, "Receiver account not found");
    }

    if (senderAccount.balance && senderAccount.balance < amount) {
      throw new ApiError(400, "Insufficient balance");
    }

    await accountModel.updateOne(
      { userId },
      {
        $inc: {
          balance: -amount,
        },
      },
      { session },
    );

    await accountModel.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      },
      { session },
    );

    await session.commitTransaction();

    return {
      success: true,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export { transfer };
