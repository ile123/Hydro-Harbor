import { AppState } from "./AppState";

export type AppContextType = {
  globalState: AppState;
  setGlobalState: React.Dispatch<React.SetStateAction<AppState>>;
  addToCart: (item: {
    id: number;
    name: string;
    quantity: number;
    imageUrl: string;
  }) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};
