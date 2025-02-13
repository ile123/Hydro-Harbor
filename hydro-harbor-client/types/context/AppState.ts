import { CartProduct } from "../product/CartProduct";

export type AppState = {
  user: { fullName: string } | null;
  cart: CartProduct[];
};
