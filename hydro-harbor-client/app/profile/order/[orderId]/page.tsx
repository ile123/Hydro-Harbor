"use client";

import { ProductOrderProps } from "@/types/props/ProductOrderProps";
import { useParams } from "next/navigation";
import OrderProductsList from "./_components/order-products-list";

export default function OrderProducts() {
  const params = useParams<ProductOrderProps>();

  if (!params.orderId) {
    return <h3>Loading...</h3>;
  }

  return <OrderProductsList orderId={params.orderId} />;
}
