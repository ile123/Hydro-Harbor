import { useAppContext } from "@/context/app-context";
import { CartProductOptionsProps } from "@/types/props/CartProductOptionsProps";

export default function CartProductOptions({ onBuy }: CartProductOptionsProps) {
  const { clearCart } = useAppContext();

  return (
    <>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={onBuy}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Buy
        </button>
        <button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Clear Cart
        </button>
      </div>
    </>
  );
}
