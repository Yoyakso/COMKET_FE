import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import * as S from './ThreadPage.Style';
import { useWebSocket } from '@/hooks/useWebSocket';
import { ThreadChat } from '@/components/thread/threadChat/ThreadChat';
import { ThreadInfo } from '@/components/thread/threadInfo/ThreadInfo';
import { ThreadAiSummary } from '@/components/thread/threadAiSummary/ThreadAiSummary';
import { getTicketById, getTicketsByProjectName } from '@/api/Ticket';
import { Ticket } from '@/types/ticket';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { useUserStore } from '@/stores/userStore';
import { CreateTicketModal } from '@/components/ticketModal/CreateTicketModal';
import { mapTicketFromResponse } from '@/utils/ticketMapper';
import { TicketTemplate } from '@/types/ticketTemplate';
import { TicketTemplateModal } from '@/components/ticketModal/TicketTemplateModal';
import { Message } from '@/types/message';
import { editThreadMesaage, deleteThreadMesaage, replyThreadMesaage } from "@/api/Thread"
import { toast } from 'react-toastify';

export const ThreadPage = () => {
  const { projectId, ticketId } = useParams<{ projectId: string; ticketId: string }>()
  const [threadMessages, setThreadMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const token = localStorage.getItem("accessToken")
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { ticket?: Ticket; projectName?: string }
  const ticketFromState = state?.ticket
  const projectName = state?.projectName
  const memberId = useUserStore((state) => state.memberId)
  const memberName = useUserStore((state) => state.name)
  const [ticket, setTicket] = useState<Ticket | null>(ticketFromState ?? null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TicketTemplate | null>(null);

  useEffect(() => {
    if (ticketId && projectName) {
      const fetchTicket = async () => {
        try {
          const data = await getTicketById(Number(ticketId), projectName)
          const mapped = mapTicketFromResponse(data)
          const all = await getTicketsByProjectName(projectName)
          const children = all
            .filter((t: any) => t.parent_ticket_id === mapped.id)
            .map(mapTicketFromResponse)

          setTicket({ ...mapped, subtickets: children })
        } catch (err) {
          console.error("티켓 조회 실패", err)
        }
      }
      fetchTicket()
    }
  }, [ticketId, projectName])

  const handleMessage = useCallback((data: Message | Message[]) => {
    const normalizedMessages = Array.isArray(data) ? data : [data]
    const processed = normalizedMessages
      .filter((msg) => msg.messageState !== "DELETE")
      .map((msg) => {
        return {
          threadId: msg.threadId,
          ticketId: msg.ticketId,
          sentAt: msg.sentAt,
          senderMemberId: msg.senderMemberId,
          senderName: msg.senderName,
          content: msg.content,
          isCurrentUser: String(msg.senderMemberId) === String(memberId),
        };
      });

    setThreadMessages((prev) => {
      const seen = new Set(prev.map((m) => m.sentAt + m.senderMemberId))
      const unique = processed.filter(
        (msg) => !seen.has(msg.sentAt + msg.senderMemberId)
      )
      return [...prev, ...unique]
    })
  }, [memberId])

  const { connect, send, disconnect } = useWebSocket({
    ticketId: Number(ticketId),
    token,
    onMessage: handleMessage,
  });

  useEffect(() => {
    if (ticketId && token) {
      connect()
    }
  }, [ticketId, token, connect])

  const formatDateToServerFormat = (date: Date) => {
    return date.toISOString().slice(0, 19);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageToSend = {
      ticketId: Number(ticketId),
      senderMemberId: memberId,
      senderName: memberName,
      content: newMessage,
      sentAt: formatDateToServerFormat(new Date()),
    };

    const uiMessage: Message = {
      ticketId: messageToSend.ticketId,
      sentAt: messageToSend.sentAt,
      senderMemberId: messageToSend.senderMemberId,
      senderName: messageToSend.senderName,
      content: messageToSend.content,
      isCurrentUser: true,
    };

    send(messageToSend);
    setThreadMessages(prev => [...prev, uiMessage]);
    setNewMessage('');
  };

  const handleCreateSubTicket = () => {
    setIsTemplateModalOpen(true);
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleEditMessage = async (threadId: number, newContent: string) => {
    try {
      await editThreadMesaage(
        Number(threadId),
        memberId,
        newContent
      );
      setThreadMessages(prev =>
        prev.map(msg =>
          msg.threadId === threadId
            ? { ...msg, content: newContent, isModified: true }
            : msg
        )
      );
    } catch (err) {
      console.error("메시지 수정 실패", err);
      toast.error("메시지 수정에 실패했습니다.");
    }
  };

  const handleDeleteMessage = async (threadId: number) => {
    try {
      await deleteThreadMesaage(
        Number(threadId),
        memberId
      );
      setThreadMessages(prev =>
        prev.filter(msg => msg.threadId !== threadId)
      );
    } catch (err) {
      console.error("메시지 삭제 실패", err);
      toast.error("메시지 삭제에 실패했습니다.");
    }
  };

  const handleReplyToMessage = async ({
    threadId,
    senderName,
    content
  }: {
    threadId: number;
    senderName: string;
    content: string;
  }) => {
    try {
      const now = new Date();
      const sentAt = now.toISOString().slice(0, 19);

      await replyThreadMesaage({
        ticketId: Number(ticketId),
        parentThreadId: threadId,
        senderMemberId: memberId,
        senderName: memberName,
        reply: newMessage,
        sentAt
      });

      setNewMessage("");
    } catch (err) {
      console.error("답글 전송 실패", err);
      toast.error("답글 전송에 실패했습니다.");
    }
  };

  return (
    <>
      <S.PageContainer>
        <S.GNBContainer>
          <GlobalNavBar variant="workspace" />
        </S.GNBContainer>

        <S.MainContainer>
          <S.LNBContainer>
            <LocalNavBar variant="project" />
          </S.LNBContainer>

          <S.ContentContainer>
            <S.PageHeader>
              <S.BackButton onClick={handleBack}>
                <ArrowLeft size={16} />
                <span>뒤로 가기</span>
              </S.BackButton>
              <S.PageTitle>{ticket?.title}</S.PageTitle>
              <S.PageHeaderActions>
                <S.CreateSubTicketButton onClick={handleCreateSubTicket}>
                  <Plus size={16} />
                  <span>하위 티켓 생성</span>
                </S.CreateSubTicketButton>
              </S.PageHeaderActions>
            </S.PageHeader>
            {ticket ? (
              <div>
                <ThreadInfo
                  projectName={projectName}
                  ticket={ticket}
                  onUpdateTicket={(updated) => setTicket(updated)}
                />
              </div>
            ) : (
              <div>
                <p>티켓 정보를 불러오는 중입니다...</p>
              </div>
            )}

            <S.ContentBody>
              <S.LeftColumn>
                <ThreadChat
                  messages={threadMessages}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                  onEditMessage={handleEditMessage}
                  onDeleteMessage={handleDeleteMessage}
                  onReplyToMessage={handleReplyToMessage}
                />
              </S.LeftColumn>

              <S.RightColumn>
                <ThreadAiSummary ticketId={Number(ticketId)} projectName={projectName} />
              </S.RightColumn>
            </S.ContentBody>
          </S.ContentContainer>

        </S.MainContainer>
      </S.PageContainer>

      {isCreateModalOpen && ticket && projectName && (
        <CreateTicketModal
          projectId={Number(projectId)}
          projectName={projectName}
          parentTicketId={Number(ticketId)}
          template={selectedTemplate}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(newTicket) => {
            setIsCreateModalOpen(false)
            setTicket(prev =>
              prev
                ? {
                  ...prev,
                  subtickets: [...(prev.subtickets ?? []), newTicket],
                }
                : prev
            )
          }}
        />
      )}
      {
        isTemplateModalOpen && ticket && projectName && (
          <TicketTemplateModal
            isOpen={isTemplateModalOpen}
            onClose={() => setIsTemplateModalOpen(false)}
            projectName={projectName}
            onSelectTemplate={(template) => {
              setSelectedTemplate(template);
              setIsCreateModalOpen(true);
            }}
          />
        )
      }
    </>
  );
};
