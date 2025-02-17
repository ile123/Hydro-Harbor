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
  getProductAmountFromCart: () => 0,
  getTotalProductAmountFromCart: () => 0,
  getTotalPriceFromCart: () => 0,
};

const AppContext = createContext(defaultState);

export function AppProvider({ children }: ChildrenProp) {
  const [globalState, setGlobalState] = useState<AppState>({
    user: null,
    cart: [],
  });

  /**
   * This function takes a object of type CartProduct, if it is already present in the cart the quantity is incremented by 1, if it is not present then it will add it to the cart.
   * @param {String} itemId - The product id.
   */

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

  /**
   * This function takes a itemId, finds the product and decreases the quantity from inside the cart, if the quantity is 1 then it is removed from the cart.
   * @param {String} itemId - The product id.
   */

  const removeFromCart = (itemId: string) => {
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

  /**
   * This function clears the entire cart and makes it empty.
   */

  const clearCart = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      cart: [],
    }));
  };

  /**
   * This function takes a productId, finds the product with that id inside the cart and returns the quantity.
   * @param {String} productId - The products id.
   * @returns {Number} A number representing the quantity of product inside the cart.
   */

  const getProductAmountFromCart = (productId: string): number => {
    const product = globalState.cart.find(
      (item: CartProduct) => item.id === productId
    );
    return product ? product.quantity : 0;
  };

  /**
   * This function returns the total quantity of all products from the cart.
   * @returns {Number} A number representing the total quantity of all products inside the cart.
   */

  const getTotalProductAmountFromCart = (): number => {
    return globalState.cart.reduce(
      (total, item: CartProduct) => total + item.quantity,
      0
    );
  };

  /**
   * This function returns the total price of the entire cart.
   * @returns {Number} A number representing the total price of all products in the cart.
   */

  const getTotalPriceFromCart = (): number => {
    return globalState.cart.reduce(
      (total, item: CartProduct) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <AppContext.Provider
      value={{
        globalState,
        setGlobalState,
        addToCart,
        removeFromCart,
        clearCart,
        getProductAmountFromCart,
        getTotalProductAmountFromCart,
        getTotalPriceFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
