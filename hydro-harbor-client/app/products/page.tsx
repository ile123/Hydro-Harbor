"use client";
import React, { useState, useEffect, useCallback } from "react";
import SortOptions from "./_components/sort-options";
import FilterOptions from "./_components/filter-options";
import ProductList from "./_components/product-list";
import Pagination from "@/components/pagination";
import { fetchProducts } from "@/lib/product";
import { fetchManufacturers } from "@/lib/manufacturer";
import { Product } from "@/types/product/Product";

const PAGE_SIZE = 12;

export default function Products() {
  const [currentSort, setSort] = useState("");
  const [currentOrder, setOrder] = useState("");
  const [currentFilter, setFilter] = useState({
    manufacturer: "all",
    minPrice: 0,
    maxPrice: 10000,
  });
  const [currentPage, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    const [productsResponse, manufacturersResponse] = await Promise.all([
      fetchProducts(
        currentSort,
        currentOrder,
        currentFilter,
        currentPage,
        PAGE_SIZE
      ),
      fetchManufacturers(),
    ]);

    if (
      productsResponse.status === 200 &&
      manufacturersResponse.status === 200
    ) {
      setFilteredProducts(productsResponse.data);
      setManufacturers(manufacturersResponse.data);
      setTotalPages(productsResponse.totalPages);
    }
  }, [currentSort, currentOrder, currentFilter, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFavoriteToggle = (id: string) => {
    setFilteredProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <SortOptions
          sort={currentSort}
          setSort={setSort}
          order={currentOrder}
          setOrder={setOrder}
        />
        <FilterOptions
          filter={currentFilter}
          setFilter={setFilter}
          manufacturers={manufacturers}
        />
      </div>
      <ProductList
        products={filteredProducts}
        onFavoriteToggle={handleFavoriteToggle}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
