import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface UpdateWorkspacePayload {
  description: string;
  isPublic: boolean;
  profile_file_id: string | null;
  state: 'ACTIVE' | 'INACTIVE' | 'DELETED';
}

export const updateWorkspace = async (
  workspaceId: string,
  payload: UpdateWorkspacePayload
) => {
  const token = localStorage.getItem('accessToken');

  const response = await axios.patch(
    `${BASE_URL}/api/v1/workspaces/${workspaceId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );

  return response.data;
};
