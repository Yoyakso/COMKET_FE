import { Send } from "lucide-react"
import * as S from "./ThreadChat.Style"

export const ThreadChat = ({ messages, newMessage, setNewMessage, sendMessage }) => (
  <>
    <S.SectionTitle>티켓 이름</S.SectionTitle>
    <S.ThreadContainer>
      {messages.map((message) => (
        <S.MessageWrapper key={message.id} $isCurrentUser={message.isCurrentUser}>
          <S.MessageAvatar>
            {/* <S.AvatarImage src={message.user.avatar || "/placeholder.svg"} alt={message.user.name} /> */}
          </S.MessageAvatar>
          <S.MessageBubble $isCurrentUser={message.isCurrentUser}>
            <S.MessageContent>{message.content}</S.MessageContent>
          </S.MessageBubble>
        </S.MessageWrapper>
      ))}
    </S.ThreadContainer>

    <S.MessageInputContainer>
      <S.MessageInput
        placeholder="메시지를 입력하세요."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <S.SendButton onClick={sendMessage} disabled={!newMessage.trim()}>
        <Send size={16} />
      </S.SendButton>
    </S.MessageInputContainer>
  </>
)
