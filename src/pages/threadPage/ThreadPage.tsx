import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Plus } from "lucide-react"
import * as S from "./ThreadPage.Style"
import { useWebSocket } from "@/hooks/useWebSocket"
import { ThreadChat } from "@/components/thread/threadChat/ThreadChat"
import { ThreadInfo } from "@/components/thread/threadInfo/ThreadInfo"
import { ThreadAiSummary } from "@/components/thread/threadAiSummary/ThreadAiSummary"
import { getTicketById, getTicketsByProjectName } from "@/api/Ticket"
import type { Ticket } from "@/types/ticket"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import { useUserStore } from "@/stores/userStore"
import { CreateTicketModal } from "@/components/ticketModal/CreateTicketModal"
import { mapTicketFromResponse } from "@/utils/ticketMapper"
import type { TicketTemplate } from "@/types/ticketTemplate"
import { TicketTemplateModal } from "@/components/ticketModal/TicketTemplateModal"
import type { Message } from "@/types/message"
import { editThreadMesaage, deleteThreadMesaage, replyThreadMesaage } from "@/api/Thread"
import { toast } from "react-toastify"
import { useWorkspaceStore } from "@/stores/workspaceStore"

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
  const workspaceId = useWorkspaceStore((state) => state.workspaceId)
  // const memberId = useUserStore((state) => state.memberId)
  const memberId = useUserStore((state) => state.workspaceMemberId)
  const memberName = useUserStore((state) => state.name)
  const [ticket, setTicket] = useState<Ticket | null>(ticketFromState ?? null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<TicketTemplate | null>(null)
  const [replyingTo, setReplyingTo] = useState<{ threadId: number; senderName: string; content: string } | null>(null)

  useEffect(() => {
    if (ticketId && projectName) {
      const fetchTicket = async () => {
        try {
          const data = await getTicketById(Number(ticketId), projectName)
          const mapped = mapTicketFromResponse(data)
          const all = await getTicketsByProjectName(projectName)
          const children = all.filter((t: any) => t.parent_ticket_id === mapped.id).map(mapTicketFromResponse)

          setTicket({ ...mapped, subtickets: children })
        } catch (err) {
          console.error("티켓 조회 실패", err)
        }
      }
      fetchTicket()
    }
  }, [ticketId, projectName])

  const buildMessageWithReplyInfo = (messages: Message[]): Message[] => {
    const messageMap = new Map<number, Message>()

    // 먼저 모든 메시지를 맵에 저장
    messages.forEach((msg) => {
      if (msg.threadId) {
        messageMap.set(msg.threadId, msg)
      }
    })

    // 답글 정보를 추가
    return messages.map((msg) => {
      if (msg.parentThreadId && messageMap.has(msg.parentThreadId)) {
        const parentMessage = messageMap.get(msg.parentThreadId)!
        return {
          ...msg,
          replyTo: {
            threadId: parentMessage.threadId!,
            senderName: parentMessage.senderName,
            content: parentMessage.content,
          },
        }
      }
      return msg
    })
  }

  const handleMessage = useCallback(
    (data: Message | Message[]) => {
      const normalizedMessages = Array.isArray(data) ? data : [data]
      const processed = normalizedMessages
        .filter((msg) => msg.messageState !== "DELETE")
        .map((msg) => ({
          ...msg,
          isCurrentUser: String(msg.senderWorkspaceMemberId) === String(memberId),
        }))

      setThreadMessages((prev) => {
        const seen = new Set(prev.map((m) => `${m.sentAt}-${m.senderWorkspaceMemberId}-${m.threadId || "no-id"}`))
        const updated = [...prev]

        processed.forEach((msg) => {
          const key = `${msg.sentAt}-${msg.senderWorkspaceMemberId}-${msg.threadId || "no-id"}`

          // 현재 사용자의 메시지이고 단일 메시지인 경우 threadId 업데이트
          if (processed.length === 1 && msg.isCurrentUser) {
            const idx = updated.findIndex(
              (m) =>
                m.sentAt === msg.sentAt &&
                m.senderWorkspaceMemberId === msg.senderWorkspaceMemberId &&
                !m.threadId &&
                m.content === msg.content,
            )
            if (idx !== -1) {
              updated[idx] = {
                ...updated[idx],
                threadId: msg.threadId,
                parentThreadId: msg.parentThreadId,
              }
              return
            }
          }

          if (!seen.has(key)) {
            updated.push(msg)
          }
        })

        return buildMessageWithReplyInfo(updated)
      })
    },
    [memberId],
  )

  const { connect, send, disconnect } = useWebSocket({
    ticketId: Number(ticketId),
    token,
    onMessage: handleMessage,
  })

  useEffect(() => {
    if (ticketId && token) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [ticketId, token, connect, disconnect])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const now = new Date()
    const sentAt = now.toISOString().slice(0, 19)

    if (replyingTo) {
      const replyMessage: Message = {
        ticketId: Number(ticketId),
        sentAt,
        senderWorkspaceMemberId: memberId,
        senderName: memberName,
        content: newMessage,
        isCurrentUser: true,
        parentThreadId: replyingTo.threadId,
        replyTo: {
          threadId: replyingTo.threadId,
          senderName: replyingTo.senderName,
          content: replyingTo.content,
        },
      }

      setThreadMessages((prev) => [...prev, replyMessage])
      replyThreadMesaage({
        ticketId: Number(ticketId),
        parentThreadId: replyingTo.threadId,
        senderWorkspaceMemberId: memberId,
        senderName: memberName,
        reply: newMessage,
        sentAt,
        workspaceId: workspaceId,
      })
        .then(() => {
          console.log("답글 전송 성공")
        })
        .catch((err) => {
          console.error("답글 전송 실패", err)
          toast.error("답글 전송에 실패했습니다.")
          setThreadMessages((prev) =>
            prev.filter(
              (msg) => !(msg.sentAt === sentAt && msg.senderWorkspaceMemberId === memberId && msg.content === newMessage),
            ),
          )
        })

      setNewMessage("")
      setReplyingTo(null)
    } else {
      const messageToSend = {
        ticketId: Number(ticketId),
        senderWorkspaceMemberId: memberId,
        senderName: memberName,
        content: newMessage,
        sentAt,
      }

      const uiMessage: Message = {
        ticketId: messageToSend.ticketId,
        sentAt: messageToSend.sentAt,
        senderWorkspaceMemberId: messageToSend.senderWorkspaceMemberId,
        senderName: messageToSend.senderName,
        content: messageToSend.content,
        isCurrentUser: true,
      }

      send(messageToSend)
      setThreadMessages((prev) => [...prev, uiMessage])
      setNewMessage("")
    }
  }

  const handleCreateSubTicket = () => {
    setIsTemplateModalOpen(true)
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleEditMessage = async (threadId: number, newContent: string, workspaceId: number) => {
    try {
      await editThreadMesaage(Number(threadId), memberId, newContent, workspaceId)
      setThreadMessages((prev) =>
        prev.map((msg) => (msg.threadId === threadId ? { ...msg, content: newContent, isModified: true } : msg)),
      )
      toast.success("메시지가 수정되었습니다.")
    } catch (err) {
      console.error("메시지 수정 실패", err)
      toast.error("메시지 수정에 실패했습니다.")
    }
  }

  const handleDeleteMessage = async (threadId: number, workspaceId: number) => {
    try {
      await deleteThreadMesaage(threadId, memberId, workspaceId)
      setThreadMessages((prev) => prev.filter((msg) => msg.threadId !== threadId))
      toast.success("메시지가 삭제되었습니다.")
    } catch (err) {
      console.error("메시지 삭제 실패", err)
      toast.error("메시지 삭제에 실패했습니다.")
    }
  }

  const handleReplyToMessage = (replyInfo: { threadId: number; senderName: string; content: string }) => {
    setReplyingTo(replyInfo)
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
                  onEditMessage={handleEditMessage}
                  onDeleteMessage={handleDeleteMessage}
                  onReplyToMessage={handleReplyToMessage}
                  setReplyingTo={setReplyingTo}
                  replyingTo={replyingTo}
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
            setTicket((prev) =>
              prev
                ? {
                  ...prev,
                  subtickets: [...(prev.subtickets ?? []), newTicket],
                }
                : prev,
            )
          }}
        />
      )}
      {isTemplateModalOpen && ticket && projectName && (
        <TicketTemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          projectName={projectName}
          onSelectTemplate={(template) => {
            setSelectedTemplate(template)
            setIsCreateModalOpen(true)
          }}
        />
      )}
    </>
  )
}
