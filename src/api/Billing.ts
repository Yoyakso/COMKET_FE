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
