import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAlarmCountPerProject = async (workspaceId: string) => {
  const token = localStorage.getItem('accessToken');

  if (!token) throw new Error('로그인 필요');
  if (!workspaceId) throw new Error('워크스페이스 ID 없음');

  const res = await axios.get(`${BASE_URL}/api/v1/alarm/project/count`, {
    params: { workspaceId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.projectAlarmList;
};
