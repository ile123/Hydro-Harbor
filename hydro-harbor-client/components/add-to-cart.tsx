"use client";

import { useAppContext } from "@/context/app-context";
import { CartProduct } from "@/types/product/CartProduct";

export default function AddToCart({
  id,
  name,
  price,
  imageUrl,
}: Pick<CartProduct, "id" | "name" | "price" | "imageUrl">) {
  const { addToCart } = useAppContext();

  const addProductToCartHandler = () => {
    addToCart({
      id: id,
      name: name,
      imageUrl: imageUrl,
      price: price,
      quantity: 1,
    } as CartProduct);
  };

  return (
    <>
      <button onClick={addProductToCartHandler} className="text-dark dark:text-white text-5xl hover:text-blue-500">+</button>
    </>
  );
}
