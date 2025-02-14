import Card from "@/components/card";
import { ProductListProps } from "@/types/product/ProductListProps";
import Image from "next/image";

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
          />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-700">{product.price}</p>
          <p className="text-gray-500">{product.manufacturer}</p>
        </Card>
      ))}
    </div>
  );
}
