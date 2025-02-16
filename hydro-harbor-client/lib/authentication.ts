import { LoginValues } from "@/types/authentication/LoginValues";
import { RegisterValues } from "@/types/authentication/RegisterValues";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (formData: LoginValues) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData);
    return {
      status: response.status,
      token: response.data.token,
      fullName: response.data.fullName,
      email: response.data.email
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

export const register = async (formData: RegisterValues) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, formData);

    return {
      status: response.status,
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

export const logout = () => {
   
}