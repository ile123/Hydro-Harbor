"use client";

import Card from "@/components/card";
import { fetchProductsByOrder } from "@/lib/product";
import { OrderProduct } from "@/types/product/OrderProduct";
import { ProductOrderProps } from "@/types/props/ProductOrderProps";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OrderProductsList({ orderId }: ProductOrderProps) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await fetchProductsByOrder(orderId);
      if (status === 200) {
        setProducts(data);
      }
    };

    fetchData();
  }, [orderId]);

  return (
    <>
      <Card className="w-96 h-96 overflow-y-auto">
        {products.length === 0 ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            {products.map((item: OrderProduct, key) => (
              <div key={key} className="mb-4 bg-white dark:bg-[#222831] shadow-md py-4 ring">
                <Link
                  href={`/products/${item.id}`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-cover w-48 h-48 mx-auto mb-4"
                  />
                  <h3 className="text-center">Name: {item.name}</h3>
                  <h3 className="text-center">Price: {item.price.toFixed(2)} $</h3>
                  <h3 className="text-center">Quantity: {item.quantity}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
