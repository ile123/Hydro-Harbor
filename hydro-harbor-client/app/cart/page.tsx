"use client";

import Card from "@/components/card";
import { useAppContext } from "@/context/app-context";
import CartProductItem from "./_components/cart-product-item";
import CartProductOptions from "./_components/cart-product-options";
import { buyProducts } from "@/lib/cart";
import { useState } from "react";

export default function UserCart() {
  const { globalState, getTotalPriceFromCart, clearCart } = useAppContext();
  const [message, setMessage] = useState("No Products found, please add some.");

  const buyHandler = async () => {
    const { status } = await buyProducts(globalState.cart);
    if (status === 200) {
      setMessage("Products have been bought.");
      clearCart();
    }
  };

  return (
    <>
      {globalState.cart.length === 0 ? (
        <h3>{message}</h3>
      ) : (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-4xl">Products to buy</h3>
            <h3 className="text-2xl">Total: {getTotalPriceFromCart().toFixed(2)} $</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[30rem] overflow-y-auto p-4 bg-[#eeeeee] dark:bg-[#282C34]">
            {globalState.cart.map((item, index) => (
              <CartProductItem key={index} product={item} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <CartProductOptions onBuy={buyHandler} />
          </div>
        </Card>
      )}
    </>
  );
}
