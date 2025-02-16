import { ProductFilter } from "../product/ProductFilter";

export type ProductFilterProps = {
  filter: ProductFilter;
  setFilter: (filter: {
    manufacturer: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
  manufacturers: { id: number; name: string }[];
};
