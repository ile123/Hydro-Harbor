import { AppState } from "./AppState";

export type AppContextType = {
  globalState: AppState;
  setGlobalState: React.Dispatch<React.SetStateAction<AppState>>;
  addToCart: (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getProductAmountFromCart: (productId: string) => number;
  getTotalProductAmountFromCart: () => number;
  getTotalPriceFromCart: () => number;
};
