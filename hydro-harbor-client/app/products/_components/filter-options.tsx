import { ProductFilterProps } from "@/types/props/ProductFilterProps";

export default function FilterOptions({
  filter,
  setFilter,
  manufacturers,
}: ProductFilterProps) {
  return (
    <div className="mb-4">
      <label className="mr-4">
        Manufacturer:
        <select
          className="ml-2 p-1 border rounded dark:bg-[#282C34] text-dark dark:text-white"
          value={filter.manufacturer}
          onChange={(e) =>
            setFilter({ ...filter, manufacturer: e.target.value })
          }
        >
          <option
            value="all"
            className="dark:bg-[#282C34] text-dark dark:text-white"
          >
            All
          </option>
          {manufacturers.map((manufacturer) => (
            <option
              key={manufacturer.id}
              value={manufacturer.name}
              className="dark:bg-[#282C34] text-dark dark:text-white"
            >
              {manufacturer.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Price Range:
        <input
          type="number"
          placeholder="Min Price"
          className="ml-2 p-1 border rounded dark:bg-[#282C34] text-dark dark:text-white"
          value={filter.minPrice}
          onChange={(e) =>
            setFilter({ ...filter, minPrice: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          className="ml-2 p-1 border rounded dark:bg-[#282C34] text-dark dark:text-white"
          value={filter.maxPrice}
          onChange={(e) =>
            setFilter({ ...filter, maxPrice: parseFloat(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
