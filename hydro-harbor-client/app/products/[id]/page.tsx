"use client";

import { ProductProps } from "@/types/props/ProductProps";
import ProductDetails from "./_components/ProductDetails";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<ProductProps>();

  if (!params.id) {
    return <h3>Loading...</h3>;
  }

  return <ProductDetails id={params.id} />;
}
