import { config } from "@/config/dotenv";
import { ProductFilter } from "@/types/product/ProductFilter";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = config.BACKEND_URL;

export const fetchProducts = async (
  sort: string,
  order: string,
  filter: ProductFilter,
  page: number,
  pageSize: number
) => {
  try {
    const token = Cookies.get("token");
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
      `${API_URL}/products?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const fetchProductById = async (productId: string) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: response.status,
      data: response.data.result,
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

export const fetchProductsByOrder = async (orderId: string) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/products/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: response.status,
      data: response.data.result,
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

export const addProductToFavorite = async (productId: string) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.patch(
      `${API_URL}/products/add-to-favorites/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: response.status,
      data: response.data.result,
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
