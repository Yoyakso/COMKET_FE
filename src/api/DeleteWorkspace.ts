import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteWorkspace = async (workspaceId: string) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('No access token');

  const response = await axios.delete(`${BASE_URL}/api/v1/workspaces/${workspaceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return response.data;
};
