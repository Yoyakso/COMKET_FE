import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Send, CheckCircle, Tag, ArrowLeft, User } from "lucide-react"
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
  // isCurrentUser: boolean
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
}

export const ThreadPage = ({ }: ThreadPageProps) => {
  const { projectId, ticketId } = useParams<{ projectId: string; ticketId: string }>()
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([])
  const [actionItems, setActionItems] = useState<ActionItem[]>(SAMPLE_ACTION_ITEMS)
  const [newMessage, setNewMessage] = useState("")
  const [aiSummary, setAiSummary] = useState<string | null>(
    "이 스레드에서는 로그인 기능 구현과 API 연동에 대해 논의했습니다. 팀원1은 로그인 기능을 다음 주 화요일까지 완료할 예정이며, 백엔드 API는 이번 주 금요일까지 준비될 예정입니다. 테스트 계정도 함께 전달될 예정입니다.",
  )
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

  const handleMessage = useCallback((data: ThreadMessage) => {
    setThreadMessages((prev) => [...prev, data])
  }, [])

  const { connect, send, disconnect } = useWebSocket({
    ticketId: Number(ticketId),
    token,
    onMessage: handleMessage,
  })

  // const { connect, send } = useWebSocket({
  //   ticketId: Number(ticketId),
  //   token,
  //   onMessage: (data: ThreadMessage) => {
  //     setThreadMessages((prev) => [...prev, data])
  //   },
  // })

  useEffect(() => {
    if (ticketId && token) {
      connect();
    }
  }, [ticketId, token, connect]);

  const formatDateToServerFormat = (date: Date) => {
    return date.toISOString().slice(0, 19) // '2025-05-16T19:10:23' 형태로 자름
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ThreadMessage = {
      ticketId: Number(ticketId),
      senderMemberId: memberId,
      senderName: memberName,
      content: newMessage,
      sentAt: formatDateToServerFormat(new Date()),
      // isCurrentUser: true
    }
    console.log("보내는 메시지:", message)
    send(message)
    setThreadMessages((prev) => [...prev, message])
    setNewMessage("")
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
          </S.PageHeader>

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
      </S.MainContainer>
    </S.PageContainer >
  )
}
