import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchMyWorkspaces = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/api/v1/workspaces?includePublic=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, 
    });

    return response.data; 
  } catch (error) {
    console.error("워크스페이스 API 오류:", error);
    throw error;
  }
};


