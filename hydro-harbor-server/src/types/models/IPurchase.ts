import mongoose from "mongoose";

export type IPurchase = {
  user: mongoose.Schema.Types.ObjectId;
  products: [
    {
      quantity: number;
      product: mongoose.Schema.Types.ObjectId;
    }
  ];
  totalAmount: number;
  purchaseDate: Date;
};
