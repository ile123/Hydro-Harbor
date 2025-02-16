import { Product } from "../product/Product";

export type ProductsPageProps = {
    products: Product[];
    page: number;
    sort: string;
    order: string;
    filter: { manufacturer: string; minPrice: number; maxPrice: number };
    totalPages: number;
    manufacturers: { id: number; name: string }[];
};  