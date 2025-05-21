import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Plus } from "lucide-react"
import * as S from "./ThreadPage.Style"
import { useWebSocket } from "@/hooks/useWebSocket"
import { ThreadChat } from "@/components/thread/threadChat/ThreadChat"
import { ThreadInfo } from "@/components/thread/threadInfo/ThreadInfo"
import { ThreadAiSummary } from "@/components/thread/threadAiSummary/ThreadAiSummary"
import { getTicketById } from "@/api/Ticket"
import { Ticket } from "@/types/ticket"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import { useUserStore } from "@/stores/userStore"

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
  priority: "상" | "중" | "하"
  status: "대기" | "진행중" | "완료"
}

const SAMPLE_ACTION_ITEMS: ActionItem[] = [
  {
    id: 1,
    assignee: { id: 1, name: "팀원1", avatar: "/images/avatar-2.png" },
    task: "로그인 기능 구현",
    priority: "상",
    status: "대기",
  },
  {
    id: 2,
    assignee: { id: 2, name: "팀원2", avatar: "/images/avatar-3.png" },
    task: "API 연동 작업",
    priority: "중",
    status: "진행중",
  },
  {
    id: 3,
    assignee: { id: 3, name: "팀원3", avatar: "/images/avatar-5.png" },
    task: "테스트 계정 생성",
    priority: "하",
    status: "완료",
  },
]

interface ThreadPageProps {
  // ticketId?: number
}

export const ThreadPage = ({ }: ThreadPageProps) => {
  const { projectId, ticketId } = useParams<{ projectId: string; ticketId: string }>()
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([])
  const [actionItems, setActionItems] = useState<ActionItem[]>(SAMPLE_ACTION_ITEMS)
  const [newMessage, setNewMessage] = useState("")
  const [aiSummary, setAiSummary] = useState<string | null>()
  const token = localStorage.getItem("accessToken")
  const location = useLocation()
  const navigate = useNavigate();
  const state = location.state as { ticket?: Ticket; projectName?: string }
  const ticketFromState = state?.ticket
  const projectName = state?.projectName
  const memberId = useUserStore((state) => state.memberId)
  const memberName = useUserStore((state) => state.name)
  const [ticket, setTicket] = useState<Ticket | null>(ticketFromState ?? null)

  useEffect(() => {
    console.log("ticket:", ticket)
    console.log("ticketId:", ticketId)
    console.log("projectName:", projectName)
    if (!ticket && ticketId && projectName) {
      const fetchTicket = async () => {
        try {
          const data = await getTicketById(Number(ticketId), projectName);
          // const mappedTicket: Ticket = {
          //   id: data.id,
          //   title: data.ticket_name,
          //   type: data.ticket_type, // TicketType이 enum or string union이면 그대로 가능
          //   description: data.description,
          //   assignee: {
          //     name: data.assignee_member?.realName || "",
          //     nickname: data.assignee_member?.nickname || "",
          //     profileUrl: data.assignee_member?.profileUrl || "",
          //     email: data.assignee_member?.email || "",
          //   },
          //   threadCount: 0, // 백엔드에서 제공되지 않으면 기본값 처리
          //   priority: data.ticket_priority,
          //   status: data.ticket_state,
          //   startDate: data.start_date,
          //   endDate: data.end_date,
          //   subticketCount: data.sub_ticket_count,
          //   subtickets: [], // 필요 시 fetch 후 별도 처리
          //   parentId: data.parent_ticket_id ?? undefined,
          //   writer: {
          //     name: data.creator_member?.realName || "",
          //     nickname: data.creator_member?.nickname || "",
          //     profileUrl: data.creator_member?.profileUrl || "",
          //     email: data.creator_member?.email || "",
          //   },
          // };

          // setTicket(mappedTicket);
        } catch (err) {
          console.error("티켓 조회 실패", err);
        }
      };

      fetchTicket();
    }
  }, [ticket, ticketId, projectName]);

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
      connect();
    }
  }, [ticketId, token, connect]);

  const formatDateToServerFormat = (date: Date) => {
    return date.toISOString().slice(0, 19)
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    // 서버로 보낼 메시지
    const messageToSend = {
      ticketId: Number(ticketId),
      senderMemberId: memberId,
      senderName: memberName,
      content: newMessage,
      sentAt: formatDateToServerFormat(new Date()),
    }

    // 프론트 렌더링용 메시지
    const uiMessage: ThreadMessage = {
      ...messageToSend,
      isCurrentUser: true,
    }

    send(messageToSend)
    setThreadMessages((prev) => [...prev, uiMessage])
    setNewMessage("")
  }

  const updateAiAnalysis = () => {
    setAiSummary(
      "AI 요약 내용은 곧 업데이트 될 예정입니다.",
    )
  }

  useEffect(() => {
    if (threadMessages.length > 0) {
      updateAiAnalysis()
    }
  }, [threadMessages])

  const handleBack = () => {
    navigate(-1);
  };

  return (
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
            <S.PageTitle>{ticket.title}</S.PageTitle>
            <S.PageHeaderActions>
              <S.CreateSubTicketButton>
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
              <ThreadInfo ticket={ticket} />
            </S.LeftColumn>

            <S.RightColumn>
              <ThreadAiSummary aiSummary={aiSummary} actionItems={actionItems} />
            </S.RightColumn>
          </S.ContentBody>
        </S.ContentContainer>
      </S.MainContainer>
    </S.PageContainer >
  )
}
