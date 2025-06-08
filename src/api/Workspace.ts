import axiosInstance from './axiosInstance';

/**
 * 워크스페이스 목록 조회
 * @returns
 */
export const fetchMyWorkspaces = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/workspaces`, {
      params: { includePublic: false },
    });
    return response.data;
  } catch (error) {
    console.error('워크스페이스 API 오류:', error);
    throw error;
  }
};

/**
 * 워크스페이스 생성
 * @param name - 워크스페이스 이름
 * @param slug - 워크스페이스 슬러그 (URL에 사용되는 고유 식별자)
 * @param description - 워크스페이스 설명
 * @param is_public - 공개 여부
 * @param profile_file_id - 프로필 이미지 파일 ID (선택적)
 * @returns 생성된 워크스페이스 정보
 */

export interface WorkspaceCreateParams {
  name: string;
  slug: string;
  description: string;
  is_public: boolean;
  profile_file_id?: string | null;
}

export const workspaceCreate = async (params: WorkspaceCreateParams) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/workspaces`,
      {
        ...params,
      },
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('서버 응답 에러:', error.response.data);
    } else {
      console.error('에러:', error.message);
    }
    throw error;
  }
};

/**
 * 워크스페이스 슬러그로 조회
 * @param slug - 워크스페이스 슬러그
 * @returns 워크스페이스 정보 (id, name, slug, profileFileUrl 등)
 */

export const fetchWorkspaceBySlug = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/workspaces/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error('슬러그 조회 실패:', error);
    throw error;
  }
};

/**
 * 워크스페이스 초대코드
 * @param inviteCode
 * @returns
 */
export const fetchWorkspaceByInviteCode = async (inviteCode: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/workspaces/invite/${inviteCode}`);
    return response.data;
  } catch (error) {
    console.error('초대 코드 조회 실패:', error);
    throw error;
  }
};

export interface UploadResponse {
  fileId: number;
  fileUrl: string;
  expires_in?: number;
  fileName?: string;
}

/**
 * 프로필 이미지 업로드
 * @param file - 업로드할 이미지 파일
 * @param category - 파일 카테고리 (WORKSPACE_PROFILE | MEMBER_PROFILE | PROJECT_PROFILE)
 * @returns 서버로부터 받은 파일 정보 (file_id, file_url 등)
 */
export const uploadProfileImage = async (
  file: File,
  category: 'WORKSPACE_PROFILE' | 'MEMBER_PROFILE' | 'PROJECT_PROFILE',
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('multipartFile', file);
    formData.append('fileCategory', category);

    const response = await axiosInstance.post('/api/v1/file/upload/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      fileId: response.data.fileId,
      fileUrl: response.data.fileUrl,
      fileName: response.data.fileName,
    };
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};

/**
 * 워크스페이스 정보 수정
 * @param workspaceId - 수정할 워크스페이스 ID
 * @param payload - 수정할 정보 (name, description, is_public, profile_file_id)
 * @returns 수정된 워크스페이스 정보
 */
export interface UpdateWorkspacePayload {
  name: string;
  description: string;
  is_public: boolean;
  profile_file_id: number | null;
  state: 'ACTIVE' | 'INACTIVE' | 'DELETED';
}

export const updateWorkspace = async (workspaceId: string, payload: UpdateWorkspacePayload) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/workspaces/${workspaceId}`, payload);
    return response.data;
  } catch (error) {
    console.error('워크스페이스 수정 실패:', error);
    throw error;
  }
};

/**
 * 워크스페이스 나가기
 * @param workspaceId - 나갈 워크스페이스 ID
 * @param email - 나갈 멤버의 이메일
 * @returns
 */

export const exitWorkspace = async ({
  workspaceId,
  email,
}: {
  workspaceId: string;
  email: string;
}) => {
  try {
    await axiosInstance.delete(`/api/v1/workspaces/${workspaceId}/members`, {
      params: { targetMemberEmail: email },
    });
  } catch (error) {
    console.error('워크스페이스 나가기 실패:', error);
    throw error;
  }
};

/**
 * 워크스페이스 삭제
 * @param workspaceId - 삭제할 워크스페이스 ID
 * @param email - 삭제할 멤버의 이메일
 * @returns
 */
export const deleteWorkspace = async (workspaceId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/workspaces/${workspaceId}`);
    return response.data;
  } catch (error) {
    console.error('워크스페이스 삭제 실패:', error);
    throw error;
  }
};

/**
 * 내 프로필 정보 조회
 */
export const getMyWorkspaceProfile = async (workspaceId: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/member`);
    return response.data;
  } catch (error) {
    console.error('워크스페이스 내 프로필 조회 실패:', error);
    throw error;
  }
}


export const leaveMyWorkspace = async () => {
  try {
    const response = await axiosInstance.delete(`/api/v1/workspaces/leave-all`);
    return response;
  } catch (error) {
    console.error('워크스페이스 내 프로필 조회 실패:', error);
    throw error;
  }
}