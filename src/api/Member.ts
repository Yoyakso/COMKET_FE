import axios from "axios";
import qs from "qs";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * 워크스페이스 멤버 전체 조회
 *
 */
export const getWorkspaceMembers = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const workspaceId = localStorage.getItem("workspaceId");

    if (!token) throw new Error("로그인 토큰이 없습니다.");
    if (!workspaceId) throw new Error("워크스페이스 정보가 없습니다.");

    const response = await axios.get(
      `${BASE_URL}/api/v1/workspaces/${workspaceId}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          positionTypes: ["OWNER", "ADMIN", "MEMBER"],
          memberStates: ["INACTIVE", "ACTIVE", "DELETED"]
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" })
      }
    );
    console.log("멤버 조회 성공!", response.data)
    return response.data;
  } catch (error) {
    console.error("워크스페이스 멤버 조회 실패:", error);
    throw error;
  }
};

/**
 * 내 프로필 정보 수정
 */
export interface UpdateProfileParams {
  real_name: string;
  department: string;
  role: string;
  responsibility: string;
  profile_file_id: number | null;
}

export const updateProfile = async (params: UpdateProfileParams) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const response = await axios.patch(
    `${BASE_URL}/api/v1/members/me`,
    params,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return response.data;
};
