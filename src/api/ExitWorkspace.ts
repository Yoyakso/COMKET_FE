import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const ExitWorkspace = async ({
  workspaceId,
  email,
}: {
  workspaceId: string;
  email: string;
}) => {
  const token = localStorage.getItem('accessToken');

  await axios.delete(`${BASE_URL}/api/v1/workspaces/${workspaceId}/members`, {
    params: {
      targetMemberEmail: email,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};