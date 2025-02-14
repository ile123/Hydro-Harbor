import { Product } from "./Product";

export type ProductsResponseData = {
  result: Product[];
  totalPages: number;
  currentPage: number;
};
