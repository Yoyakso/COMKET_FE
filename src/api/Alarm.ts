import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * 워크스페이스 내 전체 프로젝트별 알람 개수 조회
 *
 * @param workspaceId 워크스페이스 ID (string)
 * @returns 각 프로젝트별 알람 개수를 담은 배열 (projectId + alarmCount 포함)
 */
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

/**
 * 티켓 알람 타입 정의
 * - THREAD_TAGGING: 스레드 태깅 알람
 * - ASSIGNEE_SETTING: 담당자 설정 알람
 */
export interface TicketAlarm {
  member_id: number;
  ticket_id: number;
  ticket_alarm_type: 'THREAD_TAGGING' | 'ASSIGNEE_SETTING';
  alarm_message: string;
}

/**
 * 특정 프로젝트의 티켓 알람 목록 조회
 * @param projectId 프로젝트 ID
 * @returns 티켓 알람 목록
 */
export const getTicketAlarms = async (projectId: number): Promise<TicketAlarm[]> => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('로그인 필요');

  const res = await axios.get(`${BASE_URL}/api/v1/alarm/tickets`, {
    params: { projectId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
