import { config } from "@/config/dotenv";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = config.BACKEND_URL;

export const fetchUsers = async () => {
  try {
    const token = Cookies.get("token");

    const response = await axios.get(`${API_URL}/users`, {
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

export const fetchUserOrdersAndFavorites = async (email: string) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(
      `${API_URL}/users/orders-and-favorites/${email}`,
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
