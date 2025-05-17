import axios from "axios"
import { Ticket } from "@/types/ticket";

const BASE_URL = import.meta.env.VITE_BACKEND_URL

interface CreateTicketDto {
  ticket_name: string;
  description: string;
  ticket_type?: string | null;
  ticket_priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | null;
  ticket_state?: "TODO" | "IN_PROGRESS" | "DONE" | "HOLD" | "DROP" | "BACKLOG" | "DELETED";
  start_date: string;
  end_date: string;
  parent_ticket_id: null;
  assignee_member_is: number;
}

/**
 * 티켓 생성
 * @param projectName 프로젝트 이름 (쿼리 파라미터로 사용)
 * @param ticketData 생성할 티켓 데이터
 * @returns 생성된 티켓 정보
 */
export const createTicket = async (
  projectName: string,
  ticketData: CreateTicketDto
) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.post(
      `${BASE_URL}/api/v1/tickets?project_name=${encodeURIComponent(projectName)}`,
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("티켓 생성 실패:", error);
    throw error;
  }
};

/**
 * 티켓 목록 조회
 * @param projectName 프로젝트 이름
 * @returns 
 */
export const getTicketsByProjectName = async (projectName: string): Promise<Ticket[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.get(
      `${BASE_URL}/api/v1/tickets?project_name=${encodeURIComponent(projectName)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("티켓 목록 조회 실패:", error);
    throw error;
  }
};