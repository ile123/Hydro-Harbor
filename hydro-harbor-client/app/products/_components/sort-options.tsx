import { ProductSortProps } from "@/types/product/ProductSortProps";

export default function SortOptions({
  sort,
  setSort,
  order,
  setOrder,
}: ProductSortProps) {
  return (
    <div className="mb-4">
      <label className="mr-4">
        Sort by:
        <select
          className="ml-2 p-1 border rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="manufacturer">Manufacturer</option>
        </select>
      </label>
      <label>
        Order:
        <select
          className="ml-2 p-1 border rounded"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}
