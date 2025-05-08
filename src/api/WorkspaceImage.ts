import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadProfileImage = async (
  file: File,
  category: 'WORKSPACE_PROFILE' | 'MEMBER_PROFILE' | 'PROJECT_PROFILE'
) => {
  const token = localStorage.getItem('access_token');
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

  return response.data; // { file_id, file_url, expires_in }
};
