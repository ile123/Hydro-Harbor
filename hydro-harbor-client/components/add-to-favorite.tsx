"use client";

import { AddProductToFavoriteProps } from "@/types/props/AddProductToFavoriteProps";
import HeartIcon from "./icon/hearth-icon";
import { addProductToFavorite } from "@/lib/product";

export default function AddToFavorites({
  id,
  isFavorite,
  onFavoriteToggle,
}: AddProductToFavoriteProps) {
  const addProductToFavoriteHandler = async () => {
    addProductToFavorite(id);
    onFavoriteToggle(id);
  };

  return (
    <>
      <button
        onClick={addProductToFavoriteHandler}
        className={isFavorite ? "text-red-500" : "text-gray-500"}
      >
        <HeartIcon />
      </button>
    </>
  );
}
