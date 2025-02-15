"use client";

import { useAppContext } from "@/context/app-context";
import { CartProduct } from "@/types/product/CartProduct";

export default function RemoveFromCard({ id }: Pick<CartProduct, "id">) {
  const { removeFromCart } = useAppContext();

  const removeProductFromCartHandler = () => {
    removeFromCart(id);
  };

  return (
    <>
      <button onClick={removeProductFromCartHandler}>-</button>
    </>
  );
}
