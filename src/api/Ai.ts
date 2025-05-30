import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * 스레드 내용 AI 요약
 * @param ticketId 해당 티켓 ID
 * @returns 
 */
export const getAiSummary = async (ticketId: number) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('로그인 토큰이 없습니다.');

    const response = await axios.get(
      `${BASE_URL}/api/v1/${ticketId}/ai`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('AI 응답 조회 실패:', error);
    throw error;
  }
}
