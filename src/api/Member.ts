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

export const getMyProfile = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  const response = await axios.get(`${BASE_URL}/api/v1/members/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};

/**
 * 워크스페이스 멤버 삭제
 * @param workspaceId 
 * @param targetMemberEmail 
 */
export const deleteWorkspaceMember = async (
  workspaceId: number,
  targetMemberEmail: string
) => {
  try {
    const token = localStorage.getItem("accessToken")

    await axios.delete(`${BASE_URL}/api/v1/workspaces/${workspaceId}/members`, {
      params: { targetMemberEmail },
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    )
  } catch (error) {
    console.error("워크스페이스 멤버 삭제 실패:", error);
    throw error;
  }
}

export interface UpdateMemberParams {
  workspace_member_email: string;
  position_type?: "OWNER" | "ADMIN" | "MEMBER";
  state?: "ACTIVE" | "INACTIVE" | "DELETED";
}

/**
 * 워크스페이스 멤버 권한, 활성화 상태 수정
 * @param workspaceId 
 * @param params 
 * @returns 
 */
export const updateWorkspaceMember = async (
  workspaceId: number,
  params: UpdateMemberParams
) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.patch(
      `${BASE_URL}/api/v1/workspaces/${workspaceId}/members`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("멤버 정보 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("멤버 정보 수정 실패:", error);
    throw error;
  }
};

export interface InviteMembersDto {
  memberEmailList: string[]
  positionType: "ADMIN" | "MEMBER" | "OWNER"
  state: "ACTIVE" | "INACTIVE"
}

/**
 * 워크스페이스 멤버 초대
 * @param workspaceId 
 * @param payload 
 * @returns 
 */
export const inviteWorkspaceMembers = async (
  workspaceId: number,
  payload: InviteMembersDto
) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.post(
      `${BASE_URL}/api/v1/workspaces/${workspaceId}/members`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("워크스페이스 멤버 초대 실패:", error);
    throw error;
  }
}