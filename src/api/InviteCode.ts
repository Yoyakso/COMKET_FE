import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchWorkspaceByInviteCode = async (code: string) => {
  const token = localStorage.getItem('accessToken');

  const response = await axios.get(`${BASE_URL}/api/v1/workspaces/inviteCode/${code}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return response.data;
};
