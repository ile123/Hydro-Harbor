import mongoose, { Model } from "mongoose";
import { IPurchase } from "../types/models/IPurchase";

const pruchaseSchema = new mongoose.Schema<IPurchase>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        quantity: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    totalAmount: Number,
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Purchase: Model<IPurchase> = mongoose.model<IPurchase>(
  "Purchase",
  pruchaseSchema,
  "purchases"
);

export default Purchase;
