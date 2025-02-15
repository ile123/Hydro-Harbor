"use client";

import { AppContextType } from "@/types/context/AppContextType";
import { AppState } from "@/types/context/AppState";
import { CartProduct } from "@/types/product/CartProduct";
import { ChildrenProp } from "@/types/props/ChildrenProps";
import { createContext, useState, useContext } from "react";

const defaultState: AppContextType = {
  globalState: { user: null, cart: [] },
  setGlobalState: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

const AppContext = createContext(defaultState);

export function AppProvider({ children }: ChildrenProp) {
  const [globalState, setGlobalState] = useState<AppState>({
    user: null,
    cart: [],
  });

  const addToCart = (item: CartProduct) => {
    setGlobalState((prevState) => {
      const existingItem = prevState.cart.find(
        (cartItem: CartProduct) => cartItem.id === item.id
      );
      if (existingItem) {
        return {
          ...prevState,
          cart: prevState.cart.map((cartItem: CartProduct) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      } else {
        return {
          ...prevState,
          cart: [...prevState.cart, item],
        };
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    const item = globalState.cart.find((item) => item.id === itemId);
    if (item?.quantity === 1) {
      setGlobalState((prevState) => ({
        ...prevState,
        cart: prevState.cart.filter((item: CartProduct) => item.id !== itemId),
      }));
    } else {
      setGlobalState((prevState) => ({
        ...prevState,
        cart: prevState.cart.map((cartItem: CartProduct) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ),
      }));
    }
  };

  const clearCart = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      cart: [],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        globalState,
        setGlobalState,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
