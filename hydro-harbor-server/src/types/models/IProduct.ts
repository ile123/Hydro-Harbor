import { IManufactuer } from "./IManufacturer";

export type IProduct = {
  name: string;
  price: number;
  description: string;
  manufacturer: IManufactuer;
  imageUrl: string;
};
