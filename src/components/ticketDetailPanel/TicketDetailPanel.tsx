import { useState } from "react"
import { X, ExternalLink, MessageSquarePlus, Sparkles, Send, ChevronLeft, ChevronRight, Paperclip, Plus } from "lucide-react"
import * as S from "./TicketDetailPanel.Style"
import { Ticket } from "@/types/ticket"
import { StatusBadge } from "../ticket/StatusBadge"
import { getColorFromString } from "@/utils/avatarColor"

interface User {
  id: number
  name: string
  avatar?: string
  code?: string
}

interface ThreadMessage {
  id: number
  user: User
  content: string
  timestamp: string
}

interface TicketDetailPanelProps {
  ticket: Ticket
  onClose: () => void
  onNavigate?: (direction: "prev" | "next") => void
}

export const TicketDetailPanel = ({ ticket, onClose, onNavigate }: TicketDetailPanelProps) => {
  const [showThread, setShowThread] = useState(false)
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isAiSummarizing, setIsAiSummarizing] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null)

  const writerColor = getColorFromString(ticket.writer.name)
  const assigneeColor = getColorFromString(ticket.assignee.name)

  const startThread = () => {
    setShowThread(true)
  }

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
    }

    setThreadMessages([...threadMessages, message])
    setNewMessage("")
  }

  const summarizeWithAI = () => {
    if (threadMessages.length === 0) return

    setIsAiSummarizing(true)
    setTimeout(() => {
      setAiSummary(
        "이 스레드에서는 티켓의 구현 방법과 일정에 대해 논의했습니다. 주요 결정사항: 1) 다음 주까지 기본 기능 구현, 2) UI 디자인은 승인됨, 3) 테스트 계획 필요",
      )
      setIsAiSummarizing(false)
    }, 1500)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.PanelTitle>{ticket.title}</S.PanelTitle>
        <S.HeaderActions>
          <S.Button $variant="ghost" $size="icon" as="a" href="#" target="_blank" rel="noopener noreferrer">
            <ExternalLink width={18} height={18} />
          </S.Button>
          <S.Button $variant="ghost" $size="icon" onClick={onClose}>
            <X width={20} height={20} />
          </S.Button>
        </S.HeaderActions>
      </S.PanelHeader>

      {!showThread && (
        <S.ThreadStartContainer>
          <S.ThreadStartButton onClick={startThread}>
            <MessageSquarePlus width={16} height={16} />
            스레드 시작하기
          </S.ThreadStartButton>
        </S.ThreadStartContainer>
      )}

      <S.ContentScrollArea>
        {showThread ? (
          <S.ThreadContainer>
            {aiSummary && (
              <S.AiSummaryBox>
                <S.AiSummaryHeader>
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <S.AiSummaryTitle>AI 요약</S.AiSummaryTitle>
                </S.AiSummaryHeader>
                <S.AiSummaryContent>{aiSummary}</S.AiSummaryContent>
              </S.AiSummaryBox>
            )}

            <S.ThreadMessageList>
              {threadMessages.length === 0 ? (
                <S.EmptyThreadMessage>
                  <MessageSquarePlus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>스레드를 시작하세요</p>
                </S.EmptyThreadMessage>
              ) : (
                threadMessages.map((message) => (
                  <S.ThreadMessageItem key={message.id}>
                    <S.Avatar color={writerColor}>
                      {/* <S.AvatarImage src={message.user.avatar || "/placeholder.svg"} alt={message.user.name} /> */}

                    </S.Avatar>
                    <S.MessageContent>
                      <S.MessageHeader>
                        <S.MessageAuthor>{message.user.name}</S.MessageAuthor>
                        <S.MessageTime>{formatTimestamp(message.timestamp)}</S.MessageTime>
                      </S.MessageHeader>
                      <S.MessageText>{message.content}</S.MessageText>
                    </S.MessageContent>
                  </S.ThreadMessageItem>
                ))
              )}
            </S.ThreadMessageList>
          </S.ThreadContainer>
        ) : (
          <S.TicketInfoContainer>
            <S.InfoSection>
              <S.InfoLabel>유형</S.InfoLabel>
              <S.DetailContent>{ticket.type}</S.DetailContent>
            </S.InfoSection>

            <S.InfoSection>
              <S.InfoLabel>설명</S.InfoLabel>
              <S.DetailContent>{ticket.description}</S.DetailContent>
            </S.InfoSection>

            <S.InfoSection>
              <S.InfoLabel>우선 순위</S.InfoLabel>
              <S.PriorityDisplay>
                <S.PriorityDot priority={ticket.priority} />
                <span>{ticket.priority}</span>
              </S.PriorityDisplay>
            </S.InfoSection>

            <S.InfoSection>
              <S.InfoLabel>상태</S.InfoLabel>
              <StatusBadge status={ticket.status}></StatusBadge>
            </S.InfoSection>

            <S.InfoSection>
              <S.InfoLabel>요청자</S.InfoLabel>
              <S.UserDisplay>
                <S.Avatar color={writerColor}>
                  {/* <S.AvatarImage src={ticket.writer.profileUrl || "/placeholder.svg"} alt={ticket.writer.name?.[0] ?? "?"} /> */}
                  {ticket.writer.name?.[0] ?? "?"}
                </S.Avatar>
                <S.UserName>{ticket.writer.name}</S.UserName>
              </S.UserDisplay>
            </S.InfoSection>

            <S.InfoSection>
              <S.InfoLabel>담당자</S.InfoLabel>
              {ticket.assignee ? (
                <S.UserDisplay>
                  <S.Avatar color={assigneeColor}>
                    {/* <S.AvatarImage src={ticket.assignee.profileUrl || "/placeholder.svg"} alt={ticket.assignee.name} /> */}
                    {ticket.assignee.name?.[0] ?? "?"}
                  </S.Avatar>
                  <S.UserName>{ticket.assignee.name}</S.UserName>
                </S.UserDisplay>
              ) : (
                <S.UnassignedText>미배정</S.UnassignedText>
              )}
            </S.InfoSection>

            <S.DateSection>
              <S.DateColumn>
                <S.InfoLabel>시작 / 마감 일자</S.InfoLabel>
                <S.Date>{new Date(ticket.startDate).toLocaleDateString()} ~ {new Date(ticket.endDate).toLocaleDateString()}</S.Date>
              </S.DateColumn>
            </S.DateSection>

            <S.AttachmentSection>
              <S.InfoLabel>첨부 파일</S.InfoLabel>
              <S.AttachmentList>
                <S.AttachmentItem>
                  <Paperclip width={16} height={16} color="black" />
                  <S.AttachmentName>{"{fileName}.jpg"}</S.AttachmentName>
                </S.AttachmentItem>
                <S.AttachmentItem>
                  <Paperclip width={16} height={16} color="black" />
                  <S.AttachmentName>{"{fileName}.jpg"}</S.AttachmentName>
                </S.AttachmentItem>
                <S.AttachmentItem>
                  <Paperclip width={16} height={16} color="black" />
                  <S.AttachmentName>{"{fileName}.jpg"}</S.AttachmentName>
                </S.AttachmentItem>
              </S.AttachmentList>
              <S.AddAttachmentButton>
                <Paperclip width={16} height={16} color="black" />
                파일 첨부하기
              </S.AddAttachmentButton>
            </S.AttachmentSection>
            <S.Divider />
            <S.SubTicketSection>
              <S.CreateSubTicketButton>
                <Plus width={16} height={16} />
                하위 티켓 등록
              </S.CreateSubTicketButton>
            </S.SubTicketSection>
            <S.Divider />
          </S.TicketInfoContainer>
        )}
      </S.ContentScrollArea>

      {showThread && (
        <S.ThreadInputContainer>
          <S.ThreadInputHeader>
            <S.Button $variant="ghost" $size="sm" onClick={() => setShowThread(false)}>
              <ChevronLeft className="h-3 w-3 mr-1" />
              티켓 정보 보기
            </S.Button>
            <S.Button
              $variant="ghost"
              $size="sm"
              onClick={summarizeWithAI}
              disabled={threadMessages.length === 0 || isAiSummarizing}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {isAiSummarizing ? "요약 중..." : "AI로 요약하기"}
            </S.Button>
          </S.ThreadInputHeader>
          <S.MessageInputContainer>
            <S.Textarea
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <S.Button $variant="default" $size="icon" onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </S.Button>
          </S.MessageInputContainer>
        </S.ThreadInputContainer>
      )}

      <S.PanelFooter>
        <S.Button $variant="outline" $size="sm" onClick={() => onNavigate?.("prev")}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          이전
        </S.Button>
        <S.Button $variant="outline" $size="sm" onClick={() => onNavigate?.("next")}>
          다음
          <ChevronRight className="h-4 w-4 ml-1" />
        </S.Button>
      </S.PanelFooter>
    </S.PanelContainer>
  )
}
