import mongoose, { Model } from "mongoose";
import { IUser } from "../types/IUser";

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchases: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    purchaseDate: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema, "users");

export default User;