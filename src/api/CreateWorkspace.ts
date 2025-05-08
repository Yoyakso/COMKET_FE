import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface WorkspaceCreateParams {
  workspaceName: string;
  workspaceSlug: string;
  description: string;
  is_public: boolean;
  profile_file_id?: string | null;
}

export const workspaceCreate = async (params: WorkspaceCreateParams) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('인증 토큰이 존재하지 않습니다.');
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/workspaces`,
      {
        ...params,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        withCredentials: true, 
      }
    );

    return response.data;
  } catch (error) {
    console.error('워크스페이스 생성 실패:', error);
    throw error;
  }
};
