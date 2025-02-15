import { AppState } from "./AppState";

export type AppContextType = {
  globalState: AppState;
  setGlobalState: React.Dispatch<React.SetStateAction<AppState>>;
  addToCart: (item: {
    id: string;
    name: string;
    quantity: number;
    imageUrl: string;
  }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};
