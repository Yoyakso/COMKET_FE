import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface UpdateWorkspacePayload {
  name: string;
  description: string;
  is_public: boolean;
  profile_file_id: number|null;
  state: 'ACTIVE' | 'INACTIVE' | 'DELETED';
}

export const updateWorkspace = async (
  workspaceId: string,
  payload: UpdateWorkspacePayload
) => {
  const token = localStorage.getItem('accessToken');
  console.log('token', token);

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
