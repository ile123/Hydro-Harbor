import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserWithByToken = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/get-by-token`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
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
