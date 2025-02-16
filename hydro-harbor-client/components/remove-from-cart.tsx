"use client";

import { useAppContext } from "@/context/app-context";
import { CartProduct } from "@/types/product/CartProduct";

export default function RemoveFromCart({ id }: Pick<CartProduct, "id">) {
  const { removeFromCart } = useAppContext();

  const removeProductFromCartHandler = () => {
    removeFromCart(id);
  };

  return (
    <>
      <button
        onClick={removeProductFromCartHandler}
        className="text-dark dark:text-white text-5xl hover:text-red-500 pb-1"
      >
        -
      </button>
    </>
  );
}
