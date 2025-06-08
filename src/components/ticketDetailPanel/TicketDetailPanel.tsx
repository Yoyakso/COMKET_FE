import { useState } from "react"
import { useRef } from "react"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { X, ExternalLink, MessageSquarePlus, ChevronLeft, ChevronRight, Paperclip, Plus } from "lucide-react"
import * as S from "./TicketDetailPanel.Style"
import { Ticket } from "@/types/ticket"
import { StatusBadge } from "@/components/ticket/StatusBadge"
import { PriorityBadge } from "@components/ticket/PriorityBadge"
import { getColorFromString } from "@/utils/avatarColor"
import { marked } from "marked"
import { motion } from 'framer-motion';

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
  projectName: string
  onClose: () => void
  ticketList: Ticket[]
  setTicket: (ticket: Ticket) => void
}


export const TicketDetailPanel = ({ ticket, projectName, onClose, ticketList, setTicket }: TicketDetailPanelProps) => {
  const [showThread, setShowThread] = useState(false)
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([])
  const modalRef = useRef<HTMLDivElement>(null)
  const writerColor = getColorFromString(ticket.creator_member.name)
  const assigneeColors = ticket.assignee_member_list.map((member) =>
    getColorFromString(member.name)
  )
  useOutsideClick(modalRef, onClose);

  function flattenTickets(tickets: Ticket[]): Ticket[] {
    const result: Ticket[] = []
    for (const ticket of tickets) {
      result.push(ticket)
      if (ticket.subtickets) {
        result.push(...flattenTickets(ticket.subtickets))
      }
    }
    return result
  }

  const flatList = flattenTickets(ticketList)
  const currentIndex = flatList.findIndex(t => t.id === ticket.id)

  marked.setOptions({
    breaks: true,
  });

  const goPrev = () => {
    if (currentIndex > 0) {
      setTicket(flatList[currentIndex - 1])
    }
  }

  const goNext = () => {
    if (currentIndex < flatList.length - 1) {
      setTicket(flatList[currentIndex + 1])
    }
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
    <S.PanelContainer
      as={motion.div}
      ref={modalRef}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
    >
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

      <S.ContentScrollArea>
        {showThread ? (
          <S.ThreadContainer>
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
              <S.DetailContent>
                <div dangerouslySetInnerHTML={{ __html: marked(ticket.description) }} />
              </S.DetailContent>
            </S.InfoSection>

            <S.InfoSection>
              <S.InfoLabel>우선 순위</S.InfoLabel>
              <PriorityBadge priority={ticket.priority} />
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
                  {ticket.creator_member.name?.[0] ?? "?"}
                </S.Avatar>
                <S.UserName>{ticket.creator_member.name}</S.UserName>
              </S.UserDisplay>
            </S.InfoSection>

            <S.InfoSection>
              <S.InfoLabel>담당자</S.InfoLabel>
              {ticket.assignee_member_list && ticket.assignee_member_list.length > 0 ? (
                <S.AssigneeList>
                  {ticket.assignee_member_list.map((member, idx) => (
                    <S.UserDisplay key={idx}>
                      <S.Avatar color={getColorFromString(member.name)}>
                        {member.name?.[0] ?? "?"}
                      </S.Avatar>
                      <S.UserName>{member.name}</S.UserName>
                    </S.UserDisplay>
                  ))}
                </S.AssigneeList>
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

      <S.PanelFooter>
        <S.Button $variant="outline" $size="sm" onClick={goPrev}>
          <ChevronLeft width={16} height={16} />
          이전
        </S.Button>
        <S.Button $variant="outline" $size="sm" onClick={goNext}>
          다음
          <ChevronRight width={16} height={16} />
        </S.Button>
      </S.PanelFooter>

    </S.PanelContainer>
  )
}
