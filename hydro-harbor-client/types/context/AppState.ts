import { CartProduct } from "../product/CartProduct";

export type AppState = {
  user: { fullName: string, email: string } | null;
  cart: CartProduct[];
};
