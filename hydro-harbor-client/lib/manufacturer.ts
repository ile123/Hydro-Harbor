import { config } from "@/config/dotenv";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = config.BACKEND_URL;

export const fetchManufacturers = async () => {
  try {
    const response = await axios.get(`${API_URL}/manufacturers`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
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
