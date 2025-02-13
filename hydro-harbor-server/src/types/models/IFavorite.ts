import { Types } from "mongoose";

export type IFavorite = {
  product: Types.ObjectId;
  dateAddedToFavorites: Date;
};
