import { ProductFilter } from "@/types/product/ProductFilter";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchProducts = async (
  sort: string,
  order: string,
  filter: ProductFilter,
  page: number,
  pageSize: number
) => {
  try {
    const query = new URLSearchParams({
      sortBy: sort,
      sortDirection: order,
      manufacturer: filter.manufacturer !== "all" ? filter.manufacturer : "",
      minPrice: filter.minPrice ? filter.minPrice.toString() : "",
      maxPrice: filter.maxPrice ? filter.maxPrice.toString() : "",
      page: page.toString(),
      limit: pageSize.toString(),
    });

    const response = await axios.get(
      `http://localhost:5000/api/products?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return {
      status: response.status,
      data: response.data.result,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
    };
  } catch (exception) {
    if (axios.isAxiosError(exception)) {
      return {
        status: exception.response?.status || 500,
        errorMessage: exception.response?.data.errorMssg || "Unknown error",
      };
    }

    return {
      status: 500,
      errorMessage: "Internal server error",
    };
  }
};
