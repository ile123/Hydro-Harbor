import { IFavorite } from "./IFavorite";
import { IPurchase } from "./IPurchase";

export type IUser = {
  fullName: string;
  email: string;
  password: string;
  purchases: IPurchase[];
  favorites: IFavorite[];
};
