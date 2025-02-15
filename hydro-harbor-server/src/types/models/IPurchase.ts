import mongoose from "mongoose";

export type IPurchase = {
  user: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
  totalAmount: number;
  purchaseDate: Date;
};
