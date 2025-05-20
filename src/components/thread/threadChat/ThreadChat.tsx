import { useEffect, useRef } from "react"
import { Send } from "lucide-react"
import * as S from "./ThreadChat.Style"
import { formatDateTime } from "@/utils/formatDateTime"

export const ThreadChat = ({ messages, newMessage, setNewMessage, sendMessage }) => {
  const messagesEndRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (newMessage.trim()) {
        sendMessage()
      }
    }
  }

  const getAvatarImage = (index: number) => {
    const avatarIndex = (index % 5) + 1
    return `/images/avatar-${avatarIndex}.png`
  }

  return (
    <>
      <S.SectionTitle>티켓 이름</S.SectionTitle>
      <S.ThreadContainer ref={containerRef}>
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <S.MessageWrapper
              key={`${message.sentAt}-${message.senderMemberId}-${index}`}
              $isCurrentUser={message.isCurrentUser}
            >
              <S.MessageAvatar>
                <S.AvatarImage src={getAvatarImage(index)} alt={`${message.senderName} 아바타`} />
              </S.MessageAvatar>

              <S.SenderInfo $isCurrentUser={message.isCurrentUser}>
                <S.SenderName $isCurrentUser={message.isCurrentUser}>{message.senderName}</S.SenderName>
                <S.MessageBubbleContainer $isCurrentUser={message.isCurrentUser}>
                  <S.MessageBubble $isCurrentUser={message.isCurrentUser}>
                    <S.MessageContent>{message.content}</S.MessageContent>
                  </S.MessageBubble>
                  <S.MessageTime $isCurrentUser={message.isCurrentUser}>
                    {formatDateTime(message.sentAt)}
                  </S.MessageTime>
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
        <S.MessageInput
          placeholder="메시지를 입력하세요."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <S.SendButton onClick={sendMessage} disabled={!newMessage || !newMessage.trim()}>
          <Send size={16} />
        </S.SendButton>
      </S.MessageInputContainer>
    </>
  )
}
