import { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { Send, CheckCircle, Tag, ArrowLeft, User } from "lucide-react"
import * as S from "./ThreadPage.Style"
import { useWebSocket } from "@/hooks/useWebSocket"
import { ThreadChat } from "@/components/thread/threadChat/ThreadChat"
import { ThreadInfo } from "@/components/thread/threadInfo/ThreadInfo"
import { ThreadAiSummary } from "@/components/thread/threadAiSummary/ThreadAiSummary"
import { getTicketById } from "@/api/Ticket"

interface Assignee {
  id: number
  name: string
  avatar?: string
  code?: string
}

interface Ticket {
  id: number
  title: string
  type: string
  description: string
  assignee: Assignee | null
  priority: "HIGH" | "MEDIUM" | "LOW"
  status: "대기" | "진행중" | "완료"
  startDate: string
  dueDate: string
  subticketCount: number
  writer: Assignee
  hasSubtickets?: boolean
  parentTicket?: { id: number; title: string }
  childTickets?: { id: number; title: string }[]
  tags?: string[]
}

// 스레드 메시지 타입 정의
interface ThreadMessage {
  id: number
  user: Assignee
  content: string
  timestamp: string
  isCurrentUser: boolean
}

// 액션 아이템 타입 정의
interface ActionItem {
  id: number
  assignee: Assignee
  task: string
  priority: "상" | "중" | "하"
  status: "대기" | "진행중" | "완료"
}

const SAMPLE_MESSAGES: ThreadMessage[] = [
  {
    id: 1,
    user: { id: 1, name: "팀원1", avatar: "/ak-symbol.png" },
    content: "로그인 기능 구현은 언제까지 완료될 예정인가요?",
    timestamp: "2023-05-12T09:30:00",
    isCurrentUser: false,
  },
  {
    id: 2,
    user: { id: 2, name: "이태경", avatar: "/placeholder-obgtm.png" },
    content: "다음 주 화요일까지 완료할 예정입니다. API 연동은 백엔드 팀과 협의가 필요합니다.",
    timestamp: "2023-05-12T09:35:00",
    isCurrentUser: false,
  },
  {
    id: 3,
    user: { id: 3, name: "현재 사용자", avatar: "/abstract-geometric-shapes.png" },
    content: "백엔드 API는 이번 주 금요일까지 준비될 예정입니다. 테스트 계정도 함께 전달드리겠습니다.",
    timestamp: "2023-05-12T09:40:00",
    isCurrentUser: true,
  },
]

const SAMPLE_ACTION_ITEMS: ActionItem[] = [
  {
    id: 1,
    assignee: { id: 1, name: "팀원1", avatar: "/ak-symbol.png" },
    task: "로그인 기능 구현",
    priority: "상",
    status: "대기",
  },
  {
    id: 2,
    assignee: { id: 2, name: "팀원2", avatar: "/abstract-geometric-SP.png" },
    task: "API 연동 작업",
    priority: "중",
    status: "진행중",
  },
  {
    id: 3,
    assignee: { id: 3, name: "팀원3", avatar: "/machine-learning-concept.png" },
    task: "테스트 계정 생성",
    priority: "하",
    status: "완료",
  },
]

interface ThreadPageProps {
  // ticketId?: number
  onBack?: () => void
}

export const ThreadPage = ({ onBack }: ThreadPageProps) => {
  const { projectId, ticketId } = useParams<{ projectId: string; ticketId: string }>()
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>(SAMPLE_MESSAGES)
  const [actionItems, setActionItems] = useState<ActionItem[]>(SAMPLE_ACTION_ITEMS)
  const [newMessage, setNewMessage] = useState("")
  const [aiSummary, setAiSummary] = useState<string | null>(
    "이 스레드에서는 로그인 기능 구현과 API 연동에 대해 논의했습니다. 팀원1은 로그인 기능을 다음 주 화요일까지 완료할 예정이며, 백엔드 API는 이번 주 금요일까지 준비될 예정입니다. 테스트 계정도 함께 전달될 예정입니다.",
  )
  const token = localStorage.getItem("accessToken")
  const location = useLocation()
  const state = location.state as { ticket?: Ticket; projectName?: string }
  const ticketFromState = state?.ticket
  const projectName = state?.projectName

  const [ticket, setTicket] = useState<Ticket | null>(ticketFromState ?? null)

  useEffect(() => {
    console.log("ticket:", ticket)
    console.log("ticketId:", ticketId)
    console.log("projectName:", projectName)
    if (!ticket && ticketId && projectName) {
      const fetchTicket = async () => {
        try {
          const data = await getTicketById(Number(ticketId), projectName);
          console.log("ddddddddsfdsfdfdsfsdfdsfddd", data)
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
          //   threadCount: 0, // ✅ 백엔드에서 제공되지 않으면 기본값 처리
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

  const { connect, send } = useWebSocket({
    ticketId: Number(ticketId),
    token,
    onMessage: (data: ThreadMessage) => {
      setThreadMessages((prev) => [...prev, data])
    },
  })

  useEffect(() => {
    connect()
  }, [connect])


  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ThreadMessage = {
      id: Date.now(),
      user: {
        id: 999,
        name: "현재 사용자",
        avatar: "/abstract-geometric-shapes.png",
      },
      content: newMessage,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    }
    send(message)
    setThreadMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("ko-KR", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const updateAiAnalysis = () => {
    setAiSummary(
      "이 스레드에서는 로그인 기능 구현과 API 연동에 대해 논의했습니다. 팀원1은 로그인 기능을 다음 주 화요일까지 완료할 예정이며, 백엔드 API는 이번 주 금요일까지 준비될 예정입니다. 테스트 계정도 함께 전달될 예정입니다.",
    )
  }

  useEffect(() => {
    if (threadMessages.length > 0) {
      updateAiAnalysis()
    }
  }, [threadMessages])

  return (
    <S.PageContainer>
      <S.PageHeader>
        <S.BackButton onClick={onBack}>
          <ArrowLeft size={16} />
          <span>뒤로 가기</span>
        </S.BackButton>
        <S.PageTitle>{ticket.title}</S.PageTitle>
      </S.PageHeader>

      <S.ContentContainer>
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
      </S.ContentContainer>
    </S.PageContainer>
  )
}
