import axiosInstance from "./axiosInstance";

/**
 * 스레드 메시지
 *
 * @param threadId - 수정할 메시지의 고유 ID
 * @param senderWorkspaceMemberId - 메시지를 보낸 사용자의 멤버 ID
 * @param content - 수정된 메시지 내용
 * @returns 수정된 메시지에 대한 서버 응답 데이터
 * @throws 서버 요청 실패 시 예외 발생
 */
export const editThreadMesaage = async (threadId: number, senderWorkspaceMemberId: number, content: string, workspaceId: number) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/thread/edit`, {
      threadId,
      senderWorkspaceMemberId,
      content,
      workspaceId,
    });
    return response.data;
  } catch (error) {
    console.log('스레드 메세지 수정 실패', error);
    throw error;
  }
};

/**
 * 스레드 메시지 삭제
 *
 * @param threadId - 삭제할 메시지의 고유 ID
 * @param senderWorkspaceMemberId - 메시지를 보낸 사용자의 멤버 ID
 * @returns 삭제 성공 여부에 대한 서버 응답 데이터
 * @throws 서버 요청 실패 시 예외 발생
 */
export const deleteThreadMesaage = async (threadId: number, senderWorkspaceMemberId: number, workspaceId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/thread/delete`, {
      data: {
        threadId,
        senderWorkspaceMemberId,
        workspaceId,
      }
    });
    return response.data;
  } catch (error) {
    console.log('스레드 메세지 삭제 실패', error);
    throw error;
  }
};

/**
 * 스레드 메시지에 답글 작성
 *
 * @param params - 답글 작성에 필요한 파라미터 객체
 * @param params.ticketId - 소속된 티켓의 ID
 * @param params.parentThreadId - 답글 대상 메시지의 ID
 * @param params.senderWorkspaceMemberId - 답글을 작성한 사용자의 멤버 ID
 * @param params.senderName - 답글을 작성한 사용자의 이름
 * @param params.reply - 답글 내용
 * @param params.sentAt - 서버에 보낼 전송 시각 (ISO 형식)
 * @returns 생성된 답글 메시지에 대한 서버 응답 데이터
 * @throws 서버 요청 실패 시 예외 발생
 */
export const replyThreadMesaage = async (params: {
  ticketId: number
  parentThreadId: number
  senderWorkspaceMemberId: number
  senderName: string
  reply: string
  sentAt: string
  workspaceId: number
}) => {
  try {
    const response = await axiosInstance.post(`/api/v1/thread/reply`, params);
    return response.data;
  } catch (error) {
    console.log('스레드 답글 실패', error);
    throw error;
  }
};

/**
 * 파일 ID로 파일 정보 조회
 * @param fileId 조회할 파일의 ID
 * @returns 파일 정보 응답
 */
export const getFileById = async (fileId: number) => {
  try {
    const response = await axiosInstance.get("/api/v1/file/download", {
      params: { fileId },
    });
    return response.data;
  } catch (error) {
    console.error("파일 조회 실패:", error);
    throw error;
  }
};
