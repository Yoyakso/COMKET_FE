import axiosInstance from './axiosInstance';

export type ServerPlan = 'BASIC' | 'STARTUP' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface BillingSummary {
  currentPlan: ServerPlan; // 현재 플랜
  memberCount: number; // 멤버 수
  hasPayment: boolean; // 결제 수단 등록 여부
}

/** 플랜·멤버·결제 등록 여부를 한 번에 가져온다 */
export const fetchBillingSummary = async (workspaceId: number): Promise<BillingSummary> => {
  const { data: billing } = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/billing`);
  const { data: hasPayment } = await axiosInstance.get(
    `/api/v1/workspaces/${workspaceId}/payment/status`,
  );

  return { ...billing, hasPayment };
};

/** 워크스페이스 플랜 변경 */
export const updateWorkspacePlan = (workspaceId: number, plan: ServerPlan) =>
  axiosInstance.put(`/api/v1/workspaces/${workspaceId}/billing/plan`, { plan });

/** 결제 정보 등록 여부 확인 */
export const isPaymentRegistered = async (workspaceId: number): Promise<boolean> => {
  const { data } = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/payment/status`);
  return data;
};

/** impUid(포트원 결제 고유값)로 결제 수단 등록 */
export const registerPayment = (workspaceId: number, impUid: string) =>
  axiosInstance.post(`/api/v1/workspaces/${workspaceId}/payment/register`, null, {
    params: { impUid },
  });

/**
 * 플랜 정보 조회 API
 * @param workspaceId 플랜 정보 조회를 위한 워크스페이스 ID
 * @returns
 */
export const getBillingInfo = async (workspaceId: number) => {
  const res = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/billing`);
  return res.data;
};
