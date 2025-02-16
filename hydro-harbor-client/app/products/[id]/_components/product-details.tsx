"use client";

import Card from "@/components/card";
import { fetchProductById } from "@/lib/product";
import { Product } from "@/types/product/Product";
import { ProductProps } from "@/types/props/ProductProps";
import { useEffect, useState } from "react";
import Image from "next/image";
import AddToCart from "@/components/add-to-cart";
import RemoveFromCart from "@/components/remove-from-cart";
import { useAppContext } from "@/context/app-context";

export default function ProductDetails({ id }: ProductProps) {
  const [fetchedProduct, setFetchedProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    manufacturer: "",
    description: "",
    imageUrl: "",
    isFavorite: false,
  });

  const { getProductAmountFromCart } = useAppContext();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProductById(id);
        if (response.status === 200) {
          setFetchedProduct(response.data);
        } else {
          console.error("Failed to fetch product:", response.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  return (
    <>
      <Card className="ring">
        {fetchedProduct.id === "" ? (
          <h3>Loading...</h3>
        ) : (
          <div className="p-4">
            <Image
              src={fetchedProduct.imageUrl}
              alt={fetchedProduct.name}
              width={200}
              height={200}
              className="object-cover w-48 h-48 mx-auto"
            />
            <h1 className="text-3xl font-bold mt-4 text-black dark:text-white text-center">
              {fetchedProduct.name}
            </h1>
            <p className="text-lg mt-2 text-black dark:text-white">
              {fetchedProduct.price.toFixed(2)} $
            </p>
            <p className="mb-4 text-black dark:text-white">
              {fetchedProduct.manufacturer}
            </p>
            <p className="mb-4 text-black dark:text-white">
              {fetchedProduct.description}
            </p>
            <div className="flex justify-center space-x-8">
              <RemoveFromCart id={fetchedProduct.id} />
              <AddToCart
                id={fetchedProduct.id}
                name={fetchedProduct.name}
                price={fetchedProduct.price}
                imageUrl={fetchedProduct.imageUrl}
              />
              {getProductAmountFromCart(id) > 0 && <h3 className="text-dark dark:text-white text-3xl pt-1">({getProductAmountFromCart(id)})</h3>}
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
