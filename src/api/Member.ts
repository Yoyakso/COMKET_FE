import axiosInstance from './axiosInstance';
import qs from 'qs';

/**
 * 워크스페이스 멤버 전체 조회
 */
export const getWorkspaceMembers = async workspaceId => {
  try {
    if (!workspaceId) throw new Error('워크스페이스 정보가 없습니다.');

    const response = await axiosInstance.get(`api/v1/workspaces/${workspaceId}/members`, {
      params: {
        positionTypes: ['ADMIN', 'MEMBER'],
        memberStates: ['INACTIVE', 'ACTIVE', 'DELETED'],
      },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    console.log('멤버 조회 성공!', response.data);
    return response.data;
  } catch (error) {
    console.error('워크스페이스 멤버 조회 실패:', error);
    throw error;
  }
};

/**
 * 내 프로필 정보 수정
 */
export interface UpdateProfileParams {
  full_name: string;
  // profile_file_id: number | null;
  email: string;
}

export const updateProfile = async (params: UpdateProfileParams) => {
  try {
    const response = await axiosInstance.patch('/api/v1/members/me', params);
    return response.data;
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    throw error;
  }
};

/**
 * 워크스페이스 멤버 프로필 업데이트 API
 * @param workspaceId 워크스페이스 ID
 * @param body 업데이트할 필드들 (nickname, department, responsibility, profile_file_id)
 */
export const updateWorkspaceMemberProfile = async (
  workspaceId: number,
  body: {
    nickname?: string;
    department?: string;
    responsibility?: string;
    profile_file_id?: string;
  }
) => {
  try {
    if (!workspaceId) throw new Error('워크스페이스 ID가 없습니다.');

    const response = await axiosInstance.patch(
      `/api/v1/workspaces/${workspaceId}/members/info`,
      body,
    );

    return response.data;
  } catch (error) {
    console.error('워크스페이스 멤버 프로필 수정 실패:', error);
    throw error;
  }
};

export interface MyProfileResponse {
  email: string;
  member_id: number;
  full_name: string;
  profile_file_url: string | null;
}

export const getMyProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members/me');
    return response.data;
  } catch (error) {
    console.error('내 프로필 조회 실패:', error);
    throw error;
  }
};

/**
 * 워크스페이스 멤버 삭제
 */
export const deleteWorkspaceMember = async (workspaceId: number, targetMemberEmail: string) => {
  try {
    if (!workspaceId) throw new Error('워크스페이스 정보가 없습니다.');

    await axiosInstance.delete(`/api/v1/workspaces/${workspaceId}/members`, {
      params: { targetMemberEmail },
    });
  } catch (error) {
    console.error('워크스페이스 멤버 삭제 실패:', error);
    throw error;
  }
};

export interface UpdateMemberParams {
  workspace_member_email: string;
  position_type?: 'ADMIN' | 'MEMBER';
  state?: 'ACTIVE' | 'INACTIVE' | 'DELETED';
}

/**
 * 워크스페이스 멤버 권한, 활성화 상태 수정
 */
export const updateWorkspaceMember = async (workspaceId: number, params: UpdateMemberParams) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/workspaces/${workspaceId}/members`,
      params,
    );

    console.log('멤버 정보 수정 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('멤버 정보 수정 실패:', error);
    throw error;
  }
};

export interface InviteMembersDto {
  memberEmailList: string[];
  positionType: 'ADMIN' | 'MEMBER';
  state: 'ACTIVE' | 'INACTIVE';
}

/**
 * 워크스페이스 멤버 초대
 */
export const inviteWorkspaceMembers = async (workspaceId: number, payload: InviteMembersDto) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/workspaces/${workspaceId}/members`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error('워크스페이스 멤버 초대 실패:', error);
    throw error;
  }
};
