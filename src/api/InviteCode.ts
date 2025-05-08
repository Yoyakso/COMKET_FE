import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchWorkspaceByInviteCode = async (inviteCode: string) => {
  const token = localStorage.getItem('accessToken');

  const response = await axios.get(`${BASE_URL}/api/v1/workspaces/inviteCode/${inviteCode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};