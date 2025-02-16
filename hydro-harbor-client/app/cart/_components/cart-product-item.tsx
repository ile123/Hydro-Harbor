import AddToCart from "@/components/add-to-cart";
import Card from "@/components/card";
import RemoveFromCart from "@/components/remove-from-cart";
import { CartProductItemProps } from "@/types/props/CartProductItemProps";
import Image from "next/image";

export default function CartProductItem({ product }: CartProductItemProps) {
  return (
    <>
      <Card className="bg-white dark:bg-[#222831] shadow-md rounded-lg p-4 flex flex-col items-center h-96">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover w-48 h-48 mx-auto mb-4"
        />
        <h3 className="text-center text-2xl font-semibold mb-2 text-dark dark:text-white">
          Name: {product.name}
        </h3>
        <h3 className="text-center text-xl text-dark dark:text-white mb-4">
          Price: {product.price}
        </h3>
        <div className="flex items-center justify-center space-x-4">
          <RemoveFromCart id={product.id} />
          <AddToCart
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
          <h3 className="text-lg text-dark dark:text-white">
            ({product.quantity})
          </h3>
        </div>
      </Card>
    </>
  );
}
