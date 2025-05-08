import axios from "axios"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchMyWorkspaces = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `${BASE_URL}/api/v1/workspaces?includePublic=false`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("워크스페이스 목록 조회 실패");
    }

    return await response.json(); // JSON 응답
  } catch (error) {
    console.error("워크스페이스 API 오류:", error);
    throw error;
  }
};
