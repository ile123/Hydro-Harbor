"use client";

import Image from "next/image";
import AddToCart from "@/components/add-to-cart";
import AddToFavorites from "@/components/add-to-favorite";
import { ProductListItemProps } from "@/types/props/ProductListItemProps";
import Link from "next/link";
import RemoveFromCart from "@/components/remove-from-cart";
import { useAppContext } from "@/context/app-context";

export default function ProductListItem({
  id,
  name,
  price,
  imageUrl,
  manufacturer,
  isFavorite,
  onFavoriteToggle,
}: ProductListItemProps) {

  const { getProductAmountFromCart } = useAppContext();

  return (
    <div className="bg-white dark:bg-[#222831] shadow-md rounded-lg p-4 flex flex-col items-center h-96 ring">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="object-cover w-48 h-48"
      />
      <Link
        href={`/products/${id}`}
        className="text-xl text-dark dark:text-white font-bold mt-4 hover:underline underline-offset-8"
      >
        {name}
      </Link>
      <p className="text-dark dark:text-white mt-2">${price.toFixed(2)}</p>
      <p className="text-dark dark:text-white mb-4">{manufacturer}</p>
      <div className="flex justify-center space-x-8">
        <RemoveFromCart id={id} />
        <AddToCart id={id} name={name} price={price} imageUrl={imageUrl} />
        <AddToFavorites
          id={id}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
        {getProductAmountFromCart(id) > 0 && <h3 className="text-dark dark:text-white text-3xl pt-1">({getProductAmountFromCart(id)})</h3>}
      </div>
    </div>
  );
}
