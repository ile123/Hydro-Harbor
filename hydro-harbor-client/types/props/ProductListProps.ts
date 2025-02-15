import { Product } from "../product/Product";

export type ProductListProps = {
  products: Product[];
  onFavoriteToggle: (id: string) => void;
};
