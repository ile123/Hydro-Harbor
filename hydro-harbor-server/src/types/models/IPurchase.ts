import { Types } from "mongoose";

export type IPurchase = {
  product: Types.ObjectId;
  purchaseDate: Date;
};
