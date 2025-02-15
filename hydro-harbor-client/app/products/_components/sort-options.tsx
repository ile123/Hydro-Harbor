import { ProductSortProps } from "@/types/props/ProductSortProps";

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
          className="ml-2 p-1 border rounded dark:bg-[#282C34] text-dark dark:text-white"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option
            value="price"
            className="dark:bg-[#282C34] text-dark dark:text-white"
          >
            Price
          </option>
          <option
            value="name"
            className="dark:bg-[#282C34] text-dark dark:text-white"
          >
            Name
          </option>
          <option
            value="manufacturer"
            className="dark:bg-[#282C34] text-dark dark:text-white"
          >
            Manufacturer
          </option>
        </select>
      </label>
      <label>
        Order:
        <select
          className="ml-2 p-1 border rounded dark:bg-[#282C34] text-dark dark:text-white"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option
            value="asc"
            className="dark:bg-[#282C34] text-dark dark:text-white"
          >
            Ascending
          </option>
          <option
            value="desc"
            className="dark:bg-[#282C34] text-dark dark:text-white"
          >
            Descending
          </option>
        </select>
      </label>
    </div>
  );
}
