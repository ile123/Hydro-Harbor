import { ProductListProps } from "@/types/props/ProductListProps";
import ProductListItem from "./product-list-item";

export default function ProductList({
  products,
  onFavoriteToggle,
}: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[40rem] overflow-y-auto p-4 bg-gray-50 dark:bg-[#282C34]">
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          manufacturer={product.manufacturer}
          isFavorite={product.isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
}
