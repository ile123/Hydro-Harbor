"use client";

import { useAppContext } from "@/context/app-context";
import { CartProduct } from "@/types/product/CartProduct";

export default function AddToCart({
  id,
  name,
  imageUrl,
}: Pick<CartProduct, "id" | "name" | "imageUrl">) {
  const { addToCart } = useAppContext();

  const addProductToCartHandler = () => {
    addToCart({
      id: id,
      name: name,
      imageUrl: imageUrl,
      quantity: 1,
    } as CartProduct);
  };

  return (
    <>
      <button onClick={addProductToCartHandler} className="text-dark dark:text-white text-4xl hover:text-blue-500">Add to cart +</button>
    </>
  );
}
