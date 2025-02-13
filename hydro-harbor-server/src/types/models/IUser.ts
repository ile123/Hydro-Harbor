import { IFavorite } from "./models/IFavorite";
import { IPurchase } from "./models/IPurchase";

export type IUser = {
  fullName: string;
  email: string;
  password: string;
  purchases: IPurchase[];
  favorites: IFavorite[];
};
