import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    balance: Number,
  },
  { timestamps: true },
);

const accountModel = mongoose.model("account", accountSchema);

export default accountModel;
