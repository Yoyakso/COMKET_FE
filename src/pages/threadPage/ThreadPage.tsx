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

interface ThreadMessage {
  ticketId: number;
  senderMemberId: number;
  senderName: string;
  content: string;
  sentAt: string;
  isCurrentUser: boolean;
}

export const ThreadPage = () => {
  const { projectId, ticketId } = useParams<{ projectId: string; ticketId: string }>()
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([])
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

  const handleMessage = useCallback((data: ThreadMessage | ThreadMessage[]) => {
    const normalizedMessages = Array.isArray(data) ? data : [data]
    const processed = normalizedMessages.map((msg) => ({
      ...msg,
      isCurrentUser: msg.senderMemberId === memberId,
    }))
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

    const uiMessage: ThreadMessage = {
      ...messageToSend,
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

