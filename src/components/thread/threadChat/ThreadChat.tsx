import { useEffect, useRef, useState } from "react"
import { Send, X } from "lucide-react"
import * as S from "./ThreadChat.Style"
import { formatDateTime } from "@/utils/formatDateTime"

export interface Message {
  sentAt: string
  senderMemberId: string
  senderName: string
  content: string
  isCurrentUser: boolean
}

interface ThreadChatProps {
  messages: Message[]
  newMessage: string
  setNewMessage: (message: string) => void
  sendMessage: () => void
}

export const ThreadChat = ({ messages, newMessage, setNewMessage, sendMessage }: ThreadChatProps) => {
  const messagesEndRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [messagePreview, setMessagePreview] = useState<Message | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const lastMessageRef = useRef<string | null>(null)

  useEffect(() => {
    if (!messages || messages.length === 0) return

    const latestMessage = messages[messages.length - 1]
    const messageKey = `${latestMessage.senderMemberId}-${latestMessage.sentAt}-${latestMessage.content}`

    // 이전에 처리한 메시지와 다르고, 현재 사용자가 보낸 메시지가 아닌 경우에만 미리보기 표시
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      if (newMessage.trim()) {
        sendMessage()
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
                <S.MessageBubbleContainer $isCurrentUser={message.isCurrentUser}>
                  <S.MessageBubble $isCurrentUser={message.isCurrentUser}>
                    <S.MessageContent>
                      {message.content.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </S.MessageContent>
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
          <S.MessagePreview
            onClick={handlePreviewClick}
            style={{
              position: "fixed",
              bottom: "100px",
              left: "45%",
              transform: "translateX(-50%)",
              width: "40%",
              maxWidth: "40%",
              zIndex: 1000,
            }}
          >
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
