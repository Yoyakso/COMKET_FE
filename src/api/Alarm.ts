import axiosInstance from './axiosInstance';

/**
 * 워크스페이스 내 전체 프로젝트별 알람 개수 조회
 *
 * @param workspaceId 워크스페이스 ID (string)
 * @returns 각 프로젝트별 알람 개수를 담은 배열 (projectId + alarmCount 포함)
 */
export const getAlarmCountPerProject = async (workspaceId: string) => {
  try {
    if (!workspaceId) throw new Error('워크스페이스 ID 없음');

    const res = await axiosInstance.get('/api/v1/alarm/project/count', {
      params: { workspaceId },
    });

    return res.data.projectAlarmList;
  } catch (error) {
    console.error('워크스페이스 알람 개수 조회 실패:', error);
    throw error;
  }
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
  try {
    const res = await axiosInstance.get('/api/v1/alarm/tickets', {
      params: { projectId },
    });
    return res.data;
  } catch (error) {
    console.error('티켓 알람 조회 실패:', error);
    throw error;
  }
};
