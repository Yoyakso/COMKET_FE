import axiosInstance from './axiosInstance';

/**
 * 플랜 정보 조회 API
 * @param workspaceId 플랜 정보 조회를 위한 워크스페이스 ID
 * @returns
 */
export const getBillingInfo = async (workspaceId: number) => {
  const res = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/billing`);
  return res.data;
};

/**
 * 워크스페이스 플랜 업데이트 API
 * @param workspaceId 워크스페이스 ID
 */
export const updateWorkspacePlan = async (
  workspaceId: number,
  plan: 'BASIC' | 'STARTUP' | 'PROFESSIONAL' | 'ENTERPRISE',
) => {
  const res = await axiosInstance.put(`/api/v1/workspaces/${workspaceId}/billing/plan`, {
    plan,
  });
  return res.data;
};

/**
 * 신용카드 등록 API
 * @param workspaceId 워크스페이스 ID
 * @param payload 카드 정보 (번호, 만료일, CVC 등)
 * @returns 응답 데이터
 */
export const registerCreditCard = async (
  workspaceId: number,
  payload: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string; // MM/YY
    cvc: string;
  },
) => {
  const res = await axiosInstance.post(
    `/api/v1/workspaces/${workspaceId}/billing/credit-card`,
    payload,
  );
  return res.data;
};

/**
 * 카드 정보 조회 API
 * @param workspaceId 워크스페이스 ID
 * @returns 카드 정보 객체 (마스킹된 카드번호, 소유자명, 만료일)
 */
export const getCreditCardInfo = async (workspaceId: number) => {
  const res = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/billing/credit-card`);
  return res.data;
};

/**
 * 결제수단 등록 여부 확인 API
 * @param workspaceId 워크스페이스 ID
 * @returns 결제수단 등록 여부 객체 (hasPaymentMethod: true/false)
 */
export const checkPaymentStatus = async (workspaceId: string) => {
  const res = await axiosInstance.get(`/api/v1/workspaces/${workspaceId}/payment/status`);
  return res.data; // 예: { hasPaymentMethod: true }
};

/**
 * 결제 정보 등록 API
 * @param workspaceId 워크스페이스 ID
 * @param impUid 포트원 결제 고유 ID
 * @returns 서버 응답
 */
export const registerPaymentMethod = async (workspaceId: number, impUid: string) => {
  const res = await axiosInstance.post(
    `/api/v1/workspaces/${workspaceId}/payment/register?impUid=${impUid}`,
  );
  return res.data;
};
