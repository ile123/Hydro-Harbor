import mongoose, { Model } from "mongoose";
import { IUser } from "../types/models/IUser";

const userSchema = new mongoose.Schema<IUser>(
  {
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
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchase" }],
    favorites: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        dateAddedToFavorites: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema, "users");

export default User;
