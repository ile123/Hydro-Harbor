import { ProductsResponseData } from "./ProductsResponseData";

export type ProductsResponse = {
  status: number;
  data?: ProductsResponseData;
  errorMessage?: string;
};
