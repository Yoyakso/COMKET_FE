import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface UploadResponse {
  fileId: number;
  fileUrl: string;
  expires_in?: number;
  fileName?: string;
}

/**
 * 프로필 이미지를 서버에 업로드합니다.
 * @param file - 업로드할 이미지 파일
 * @param category - 파일 카테고리 (WORKSPACE_PROFILE | MEMBER_PROFILE | PROJECT_PROFILE)
 * @returns 서버로부터 받은 파일 정보 (file_id, file_url 등)
 */
export const uploadProfileImage = async (
  file: File,
  category: 'WORKSPACE_PROFILE' | 'MEMBER_PROFILE' | 'PROJECT_PROFILE'
): Promise<UploadResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('multipartFile', file);
    formData.append('fileCategory', category);

    const response = await axios.post(`${BASE_URL}/api/v1/file/upload/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return {
      fileId: response.data.fileId,
      fileUrl: response.data.fileUrl,
      fileName: response.data.fileName,
    }
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};
