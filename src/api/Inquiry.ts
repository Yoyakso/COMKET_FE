import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface InquiryRequest {
  name: string;
  email: string;
  inquiry_type: "PRODUCT" | "PRICING" | "TECHNICAL" | "PARTNERSHIP" | "OTHER"
  message: string
}

/**
 * 문의 등록 API
 * @param data - 문의 제목, 내용, 이메일
 * @returns 생성된 문의 데이터
 */
export async function createInquiry(data: InquiryRequest): Promise<{ id: number }> {
  const response = await axios.post(`${BASE_URL}/api/v1/inquiries`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
