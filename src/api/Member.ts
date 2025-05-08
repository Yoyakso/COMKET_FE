import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * 워크스페이스 멤버 전체 조회
 *
 */
export const getWorkspaceMembers = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const workspaceName = localStorage.getItem("workspaceName");

    if (!token) throw new Error("로그인 토큰이 없습니다.");
    if (!workspaceName) throw new Error("워크스페이스 정보가 없습니다.");

    const params = {
      positionTypes: ["OWNER", "ADMIN", "MEMBER"],
      memberStates: ["INACTIVE", "ACTIVE", "DELETED"],
    };

    // workspaceName이 아니라 id로 요청하기!!!!!!!!!!!!!!
    const response = await axios.get(
      `${BASE_URL}/api/v1/${workspaceName}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
        paramsSerializer: (params) => {
          const query = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((v) => query.append(key, v));
            } else {
              query.append(key, value as string);
            }
          });
          return query.toString();
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("워크스페이스 멤버 조회 실패:", error);
    throw error;
  }
};
