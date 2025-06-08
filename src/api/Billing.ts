import axiosInstance from './axiosInstance';

/**
 * 빌링 정보 조회 API
 * @param workspaceId 빌링 정보 조회를 위한 워크스페이스 ID
 * @returns
 */
export const getBillingInfo = async (workspaceId: number) => {
  const res = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/billing`);
  return res.data;
};
