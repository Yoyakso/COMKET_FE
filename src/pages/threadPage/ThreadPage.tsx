import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Plus } from "lucide-react"
import * as S from "./ThreadPage.Style"
import { useWebSocket } from "@/hooks/useWebSocket"
import { ThreadChat } from "@/components/thread/threadChat/ThreadChat"
import { ThreadInfo } from "@/components/thread/threadInfo/ThreadInfo"
import { ThreadAiSummary } from "@/components/thread/threadAiSummary/ThreadAiSummary"
import { getTicketById, getTicketsByProjectName } from "@/api/Ticket"
import { Ticket } from "@/types/ticket"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import { useUserStore } from "@/stores/userStore"
import { CreateTicketModal } from "@/components/ticketModal/CreateTicketModal"
import { mapTicketFromResponse } from "@/utils/ticketMapper"

interface Assignee {
  id: number
  name: string
  avatar?: string
  code?: string
}

interface ThreadMessage {
  ticketId: number
  senderMemberId: number
  senderName: string
  content: string
  sentAt: string
  isCurrentUser: boolean
}

interface ActionItem {
  id: number
  assignee: Assignee
  task: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  status: "TODO" | "IN PROGRESS" | "DONE"
}

const SAMPLE_ACTION_ITEMS: ActionItem[] = [
  {
    id: 1,
    assignee: { id: 1, name: "이태경", avatar: "/images/avatar-2.png" },
    task: "로그인 기능 구현",
    priority: "HIGH",
    status: "TODO",
  },
  {
    id: 2,
    assignee: { id: 2, name: "팀원2", avatar: "/images/avatar-3.png" },
    task: "API 연동 작업",
    priority: "MEDIUM",
    status: "IN PROGRESS",
  },
  {
    id: 3,
    assignee: { id: 3, name: "팀원3", avatar: "/images/avatar-5.png" },
    task: "테스트 계정 생성",
    priority: "LOW",
    status: "DONE",
  },
]

const mockAiSummary = `이번 회의에서는 Q4 마케팅 캠페인 전략에 대해 논의했습니다. 주요 결정사항으로는 소셜미디어 광고 예산을 30% 증액하고, 인플루언서 마케팅을 강화하기로 했습니다. 또한 새로운 제품 런칭을 위한 티저 캠페인을 12월 첫째 주에 시작하기로 결정했습니다. 팀 간 협업을 위해 주간 스탠드업 미팅을 도입하고, 프로젝트 진행상황을 실시간으로 공유할 수 있는 대시보드를 구축하기로 했습니다.`

export const ThreadPage = () => {
  const { projectId, ticketId } = useParams<{ projectId: string; ticketId: string }>()
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([])
  const actionItems = SAMPLE_ACTION_ITEMS
  const [newMessage, setNewMessage] = useState("")
  const [aiSummary, setAiSummary] = useState<string | null>(mockAiSummary)
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

  useEffect(() => {
    if (!ticket && ticketId && projectName) {
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
  }, [ticket, ticketId, projectName])

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
  })

  useEffect(() => {
    if (ticketId && token) {
      connect()
    }
  }, [ticketId, token, connect])

  const formatDateToServerFormat = (date: Date) => {
    return date.toISOString().slice(0, 19)
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const messageToSend = {
      ticketId: Number(ticketId),
      senderMemberId: memberId,
      senderName: memberName,
      content: newMessage,
      sentAt: formatDateToServerFormat(new Date()),
    }

    const uiMessage: ThreadMessage = {
      ...messageToSend,
      isCurrentUser: true,
    }

    send(messageToSend)
    setThreadMessages((prev) => [...prev, uiMessage])
    setNewMessage("")
  }

  const handleCreateSubTicket = () => {
    setIsCreateModalOpen(true)
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
            <LocalNavBar variant="settings" />
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

            <S.ContentBody>
              <S.LeftColumn>
                <ThreadChat
                  messages={threadMessages}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                />
                {ticket ? (
                  <ThreadInfo projectName={projectName} ticket={ticket} />
                ) : (
                  <p>티켓 정보를 불러오는 중입니다...</p>
                )}
              </S.LeftColumn>

              <S.RightColumn>
                <ThreadAiSummary aiSummary={aiSummary} actionItems={actionItems} />
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
    </>
  )
}
