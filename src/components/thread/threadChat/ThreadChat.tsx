import { useEffect, useRef, useState } from "react"
import { Send, X, Edit2, Trash2, Reply, Check, DeleteIcon as Cancel, Paperclip } from "lucide-react"
import * as S from "./ThreadChat.Style"
import { formatDateTime } from "@/utils/formatDateTime"
import type { Message } from "@/types/message"
import { useWorkspaceStore } from "@/stores/workspaceStore"
import { marked } from "marked"
import DOMPurify from "dompurify"
import { extractMentionedProjectMemberIds } from "@/utils/mentionUtils"

interface ThreadChatProps {
  messages: Message[]
  newMessage: string
  setNewMessage: (message: string) => void
  sendMessage: (mentionedMemberIds: number[]) => void
  onEditMessage?: (threadId: number, newContent: string, workspaceId: number, mentionedMemberIds: number[]) => void
  onDeleteMessage?: (threadId: number, workspaceId: number) => void
  onReplyToMessage?: (replyTo: { threadId: number; senderName: string; content: string }) => void
  replyingTo: { threadId: number; senderName: string; content: string } | null
  setReplyingTo: (v: { threadId: number; senderName: string; content: string } | null) => void
  onFileUpload?: (file: File) => void
  projectMembers: { projectMemberId: number; name: string }[]
}

export const ThreadChat = ({
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  onEditMessage,
  onDeleteMessage,
  onReplyToMessage,
  replyingTo,
  setReplyingTo,
  onFileUpload,
  projectMembers,
}: ThreadChatProps) => {
  const messagesEndRef = useRef(null)
  const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [messagePreview, setMessagePreview] = useState<Message | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const lastMessageRef = useRef<string | null>(null)
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [highlightedId, setHighlightedId] = useState<number | null>(null)
  const workspaceId = useWorkspaceStore((state) => state.workspaceId)

  const [suggestions, setSuggestions] = useState([])
  const [cursorPosition, setCursorPosition] = useState<number | null>(null)
  // const mentionedIds = extractMentionedProjectMemberIds(newMessage, projectMembers)
  const mentionedIds = editingMessageId
    ? extractMentionedProjectMemberIds(editContent, projectMembers)
    : extractMentionedProjectMemberIds(newMessage, projectMembers)

  useEffect(() => {
    if (!messages || messages.length === 0) return

    const latestMessage = messages[messages.length - 1]
    if (latestMessage.isCurrentUser) {
      scrollToBottom()
    }
    const messageKey = `${latestMessage.senderWorkspaceMemberId}-${latestMessage.sentAt}-${latestMessage.content}`

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

  useEffect(() => {
    const match = newMessage.match(/@(\w*)$/)
    if (match) {
      const keyword = match[1].toLowerCase()
      const filtered = projectMembers.filter((m) => m.name.toLowerCase().startsWith(keyword))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [newMessage])

  useEffect(() => {
    const targetText = editingMessageId ? editContent : newMessage
    const match = targetText.match(/@(\w*)$/)

    if (match) {
      const keyword = match[1].toLowerCase()
      const filtered = projectMembers.filter((m) => m.name.toLowerCase().startsWith(keyword))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [newMessage, editContent, editingMessageId])

  const handleSelectSuggestion = (memberName: string) => {
    const targetText = editingMessageId ? editContent : newMessage
    const newText = targetText.replace(/@\w*$/, `@${memberName} `)

    if (editingMessageId) {
      setEditContent(newText)
    } else {
      setNewMessage(newText)
    }

    setSuggestions([])
  }

  const scrollToBottom = () => {
    const container = containerRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  const scrollToMessage = (threadId: number) => {
    const el = messageRefs.current[threadId]

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      setHighlightedId(threadId)
      setTimeout(() => setHighlightedId(null), 1500)
    } else {
      console.warn("메시지 요소가 존재하지 않음:", threadId)
    }
  }

  const handleSendClick = () => {
    const trimmed = newMessage.trim()
    if (!trimmed) return

    sendMessage(mentionedIds)
    setNewMessage("")
    setReplyingTo(null)
    setEditingMessageId(null)
    setEditContent("")
  }

  const highlightMentions = (content: string) => {
    return content.replace(/@(\S+)/g, '<span class="mention">@$1</span>')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSendClick()
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

  const handleEditStart = (message: Message) => {
    setEditingMessageId(message.threadId)
    setEditContent(message.content)

    setReplyingTo(null)
  }

  const handleEditSave = () => {
    if (editingMessageId && editContent.trim() && onEditMessage) {
      const editMentionedIds = extractMentionedProjectMemberIds(editContent, projectMembers)
      onEditMessage(editingMessageId, editContent.trim(), workspaceId, editMentionedIds)
      setEditingMessageId(null)
      setEditContent("")
    }
  }

  const handleEditCancel = () => {
    setEditingMessageId(null)
    setEditContent("")
  }

  const handleDelete = (threadId: number) => {
    if (onDeleteMessage && window.confirm("정말 삭제하시겠습니까?")) {
      onDeleteMessage(threadId, workspaceId)
    }
  }

  const handleReplyStart = (message: Message) => {
    setReplyingTo({
      threadId: message.threadId,
      senderName: message.senderName,
      content: message.content,
    })
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  const handleReplyMessageClick = (replyToThreadId: number) => {
    scrollToMessage(replyToThreadId)
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onFileUpload) {
      onFileUpload(file)
    }
    // 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <>
      <S.SectionTitle>스레드</S.SectionTitle>
      <S.ThreadContainer ref={containerRef}>
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <S.MessageWrapper
              key={`${message.sentAt}-${message.senderWorkspaceMemberId}-${index}`}
              $isCurrentUser={message.isCurrentUser}
              ref={(el: HTMLDivElement | null) => {
                messageRefs.current[message.threadId] = el
              }}
              $highLighted={message.threadId === highlightedId}
            >
              <S.MessageAvatar>
                <S.AvatarImage
                  src={message.profileFileUri || getAvatarImage(index, message.isCurrentUser)}
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
                      <strong>{message.replyTo?.senderName}</strong>:{" "}
                      {message.replyTo?.content?.length > 30
                        ? `${message.replyTo.content.substring(0, 30)}...`
                        : message.replyTo?.content || ""}
                    </S.ReplyText>
                  </S.ReplyReference>
                )}

                <S.MessageBubbleContainer $isCurrentUser={message.isCurrentUser}>
                  <S.MessageBubble
                    $isCurrentUser={message.isCurrentUser}
                    $isReply={!!message.replyTo}
                    onClick={message.replyTo ? () => handleReplyMessageClick(message.replyTo!.threadId) : undefined}
                  >
                    {editingMessageId != null &&
                      editingMessageId === message.threadId &&
                      message.isCurrentUser &&
                      !replyingTo ? (
                      // 수정 모드
                      <S.EditContainer>
                        {/* 수정 모드 자동완성 */}
                        {suggestions.length > 0 && (
                          <S.EditSuggestionList>
                            {suggestions.map((member) => (
                              <S.SuggestionItem
                                key={member.projectMemberId}
                                onClick={() => handleSelectSuggestion(member.name)}
                              >
                                @{member.name}
                              </S.SuggestionItem>
                            ))}
                          </S.EditSuggestionList>
                        )}
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
                        <S.MessageContent
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              highlightMentions(marked.parse(message.content || "") as string),
                            ),
                          }}
                        />
                        {/* 메시지 액션 버튼들 */}
                        <S.MessageActions $isCurrentUser={message.isCurrentUser}>
                          {message.isCurrentUser ? (
                            // 내 메시지: 수정/삭제
                            <>
                              <S.ActionButton onClick={() => handleEditStart(message)} title="수정">
                                <Edit2 size={10} />
                              </S.ActionButton>
                              <S.ActionButton onClick={() => handleDelete(message.threadId)} title="삭제">
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
              <S.ReplyText>
                <span style={{ color: "#999", fontSize: "12px" }}>
                  「{replyingTo.content.length > 30 ? `${replyingTo.content.substring(0, 30)}...` : replyingTo.content}
                  」 에 대한 답글
                </span>
              </S.ReplyText>
            </S.ReplyingToContent>
            <S.CancelReplyButton onClick={handleCancelReply}>
              <X size={14} />
            </S.CancelReplyButton>
          </S.ReplyingToContainer>
        )}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />

        {/* 자동완성 - 수정 모드가 아닐 때만 표시 */}
        {suggestions.length > 0 && !editingMessageId && (
          <S.SuggestionList>
            {suggestions.map((member) => (
              <S.SuggestionItem key={member.projectMemberId} onClick={() => handleSelectSuggestion(member.name)}>
                @{member.name}
              </S.SuggestionItem>
            ))}
          </S.SuggestionList>
        )}

        <S.MessageInputWrapper>
          <S.FileAttachButton onClick={handleFileButtonClick} title="파일 첨부">
            <Paperclip size={16} />
          </S.FileAttachButton>
          <S.MessageInput
            placeholder="메시지를 입력해주세요."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
        </S.MessageInputWrapper>

        <S.SendButton onClick={handleSendClick} disabled={!newMessage || !newMessage.trim()}>
          <Send size={16} />
        </S.SendButton>
      </S.MessageInputContainer>
    </>
  )
}
