import { CartProduct } from "@/types/product/CartProduct";
import axios from "axios";
import Cookies from "js-cookie";

export const buyProducts = async (products: CartProduct[]) => {
  try {
    const token = Cookies.get("token");
    const mappedProducts = products.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });
    const response = await axios.post(
      `http://localhost:5000/api/products/purchase`,
      { products: mappedProducts },
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
