import axiosInstance from './axiosInstance';
import { EyelevelPerspective } from '@/types/eyeLevel';

/**
 * 스레드 내용 AI 요약
 * @param ticketId 해당 티켓 ID
 * @returns 
 */
export const getAiSummary = async (ticketId: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/${ticketId}/ai/summary`);
    return response.data;
  } catch (error) {
    console.error('AI 응답 조회 실패:', error);
    throw error;
  }
}

/**
 * AI 요약 히스토리 불러오기
 * @param ticketId 해당 티켓 ID
 * @returns 
 */
export const getAiHistory = async (ticketId: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/${ticketId}/ai/history`);
    return response.data;
  } catch (error) {
    console.error('AI 히스토리 조회 실패:', error);
    throw error;
  }
}

/**
 * 눈높이 요약
 * @param ticketId 해당 티켓 ID
 * @returns 
 */
export const getEyelevelSummary = async (ticketId: number, perspective: EyelevelPerspective) => {
  try {
    const response = await axiosInstance.get(`/api/v1/${ticketId}/ai/eyelevel`, {
      params: {
        responsibility: perspective,
      },
    });

    return response.data;
  } catch (error) {
    console.error('눈높이 요약 조회 실패:', error);
    throw error;
  }
}
