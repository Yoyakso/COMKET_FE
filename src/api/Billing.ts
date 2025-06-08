import axiosInstance from './axiosInstance';

const REDIRECT_URI = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI;

export const getBillingInfo = async (workspaceId: number) => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`/api/v1/workspaces/${workspaceId}/billing`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('요금제 정보 조회 실패');
  }

  const data = await res.json();
  return data;
};
