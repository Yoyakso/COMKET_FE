import { useEffect, useRef, useState } from "react"
import { Send, X, Edit2, Trash2, Reply, Check, DeleteIcon as Cancel } from "lucide-react"
import * as S from "./ThreadChat.Style"
import { formatDateTime } from "@/utils/formatDateTime"

export interface Message {
  id: string
  sentAt: string
  senderMemberId: string
  senderName: string
  content: string
  isCurrentUser: boolean
  replyTo?: {
    id: string
    senderName: string
    content: string
  }
}

interface ThreadChatProps {
  messages: Message[]
  newMessage: string
  setNewMessage: (message: string) => void
  sendMessage: () => void
  onEditMessage?: (messageId: string, newContent: string) => void
  onDeleteMessage?: (messageId: string) => void
  onReplyToMessage?: (replyTo: { id: string; senderName: string; content: string }) => void
}

export const ThreadChat = ({ messages, newMessage, setNewMessage, sendMessage, onEditMessage, onDeleteMessage, onReplyToMessage }: ThreadChatProps) => {
  const messagesEndRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [messagePreview, setMessagePreview] = useState<Message | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const lastMessageRef = useRef<string | null>(null)

  // 수정 관련 상태
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")

  // 답글 관련 상태
  const [replyingTo, setReplyingTo] = useState<{ id: string; senderName: string; content: string } | null>(null)

  useEffect(() => {
    if (!messages || messages.length === 0) return

    const latestMessage = messages[messages.length - 1]
    if (latestMessage.isCurrentUser) {
      scrollToBottom();
    }
    const messageKey = `${latestMessage.senderMemberId}-${latestMessage.sentAt}-${latestMessage.content}`

    if (messageKey !== lastMessageRef.current && !latestMessage.isCurrentUser) {
      console.log("새 메시지 감지:", latestMessage)
      setMessagePreview(latestMessage)
      setShowPreview(true)

      lastMessageRef.current = messageKey

      const timer = setTimeout(() => {
        setShowPreview(false)
      }, 5000)

      return () => clearTimeout(timer)
    }

    if (lastMessageRef.current === null) {
      lastMessageRef.current = messageKey
    }
  }, [messages])

  useEffect(() => {
    if (showPreview) {
      console.log("미리보기 표시됨:", messagePreview)
    }
  }, [showPreview, messagePreview])

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      if (newMessage.trim()) {
        sendMessage()
        if (replyingTo) {
          setReplyingTo(null)
        }
      }
    }
  }

  const getAvatarImage = (index: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return "/images/avatar-me.png"
    }
    const avatarIndex = (index % 5) + 1
    return `/images/avatar-${avatarIndex}.png`
  }

  const handlePreviewClick = () => {
    setShowPreview(false)
    scrollToBottom()
  }

  const handleClosePreview = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPreview(false)
  }

  // 수정 관련 핸들러
  const handleEditStart = (message: Message) => {
    setEditingMessageId(message.id)
    setEditContent(message.content)
  }

  const handleEditSave = () => {
    if (editingMessageId && editContent.trim() && onEditMessage) {
      onEditMessage(editingMessageId, editContent.trim())
      setEditingMessageId(null)
      setEditContent("")
    }
  }

  const handleEditCancel = () => {
    setEditingMessageId(null)
    setEditContent("")
  }

  const handleDelete = (messageId: string) => {
    if (onDeleteMessage && window.confirm("이 메시지를 삭제하시겠습니까?")) {
      onDeleteMessage(messageId)
    }
  }

  // 답글 관련 핸들러
  const handleReplyStart = (message: Message) => {
    const replyInfo = {
      id: message.id,
      senderName: message.senderName,
      content: message.content,
    }
    setReplyingTo(replyInfo)
    if (onReplyToMessage) {
      onReplyToMessage(replyInfo)
    }
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  return (
    <>
      <S.SectionTitle>스레드</S.SectionTitle>
      <S.ThreadContainer ref={containerRef}>
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <S.MessageWrapper
              key={`${message.sentAt}-${message.senderMemberId}-${index}`}
              $isCurrentUser={message.isCurrentUser}
            >
              <S.MessageAvatar>
                <S.AvatarImage
                  src={getAvatarImage(index, message.isCurrentUser)}
                  alt={`${message.senderName} 아바타`}
                />
              </S.MessageAvatar>

              <S.SenderInfo $isCurrentUser={message.isCurrentUser}>
                <S.SenderName $isCurrentUser={message.isCurrentUser}>{message.senderName}</S.SenderName>

                {/* 답글 대상 표시 */}
                {message.replyTo && (
                  <S.ReplyReference $isCurrentUser={message.isCurrentUser}>
                    <S.ReplyIcon>↳</S.ReplyIcon>
                    <S.ReplyText>
                      <strong>{message.replyTo.senderName}</strong>:{" "}
                      {message.replyTo.content.length > 30
                        ? `${message.replyTo.content.substring(0, 30)}...`
                        : message.replyTo.content}
                    </S.ReplyText>
                  </S.ReplyReference>
                )}

                <S.MessageBubbleContainer $isCurrentUser={message.isCurrentUser}>
                  <S.MessageBubble $isCurrentUser={message.isCurrentUser}>

                    {/* <S.MessageContent>
                      {message.content.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </S.MessageContent> */}

                    {editingMessageId === message.id ? (
                      // 수정 모드
                      <S.EditContainer>
                        <S.EditTextarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          autoFocus
                        />
                        <S.EditActions>
                          <S.EditActionButton onClick={handleEditSave} $type="save">
                            <Check size={12} />
                          </S.EditActionButton>
                          <S.EditActionButton onClick={handleEditCancel} $type="cancel">
                            <Cancel size={12} />
                          </S.EditActionButton>
                        </S.EditActions>
                      </S.EditContainer>
                    ) : (
                      // 일반 메시지 표시
                      <S.MessageContentWrapper>
                        <S.MessageContent>
                          {message.content.split("\n").map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </S.MessageContent>

                        {/* 메시지 액션 버튼들 */}
                        <S.MessageActions $isCurrentUser={message.isCurrentUser}>
                          {message.isCurrentUser ? (
                            // 내 메시지: 수정/삭제
                            <>
                              <S.ActionButton onClick={() => handleEditStart(message)} title="수정">
                                <Edit2 size={10} />
                              </S.ActionButton>
                              <S.ActionButton onClick={() => handleDelete(message.id)} title="삭제">
                                <Trash2 size={10} />
                              </S.ActionButton>
                            </>
                          ) : (
                            // 다른 사람 메시지: 답글
                            <S.ActionButton onClick={() => handleReplyStart(message)} title="답글">
                              <Reply size={10} />
                            </S.ActionButton>
                          )}
                        </S.MessageActions>
                      </S.MessageContentWrapper>
                    )}


                  </S.MessageBubble>
                  <S.MessageTime $isCurrentUser={message.isCurrentUser}>{formatDateTime(message.sentAt)}</S.MessageTime>
                </S.MessageBubbleContainer>
              </S.SenderInfo>
            </S.MessageWrapper>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#666", padding: "20px 0" }}>
            메시지가 없습니다. 대화를 시작해보세요!
          </div>
        )}
        <div ref={messagesEndRef} />
      </S.ThreadContainer>

      <S.MessageInputContainer>
        {showPreview && messagePreview && (
          <S.MessagePreview onClick={handlePreviewClick}>
            <S.PreviewContent>
              <S.PreviewAvatar>
                <S.AvatarImage src={getAvatarImage(0, false)} alt={`${messagePreview.senderName} 아바타`} />
              </S.PreviewAvatar>
              <S.PreviewText>
                <S.PreviewSender>{messagePreview.senderName}</S.PreviewSender>
                <S.PreviewMessage>
                  {messagePreview.content.length > 50
                    ? `${messagePreview.content.substring(0, 50)}...`
                    : messagePreview.content}
                </S.PreviewMessage>
              </S.PreviewText>
            </S.PreviewContent>
            <S.PreviewCloseButton onClick={handleClosePreview}>
              <X size={14} />
            </S.PreviewCloseButton>
          </S.MessagePreview>
        )}

        {/* 답글 대상 표시 */}
        {replyingTo && (
          <S.ReplyingToContainer>
            <S.ReplyingToContent>
              <Reply size={14} />
              <S.ReplyingToText>
                <strong>{replyingTo.senderName}</strong>에게 답글:{" "}
                {replyingTo.content.length > 40 ? `${replyingTo.content.substring(0, 40)}...` : replyingTo.content}
              </S.ReplyingToText>
            </S.ReplyingToContent>
            <S.CancelReplyButton onClick={handleCancelReply}>
              <X size={14} />
            </S.CancelReplyButton>
          </S.ReplyingToContainer>
        )}

        <S.MessageInput
          placeholder="메시지를 입력해주세요."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <S.SendButton onClick={sendMessage} disabled={!newMessage || !newMessage.trim()}>
          <Send size={16} />
        </S.SendButton>
      </S.MessageInputContainer>
    </>
  )
}
