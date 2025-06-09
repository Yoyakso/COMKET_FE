import { styled, keyframes, css } from "styled-components"
import { color } from "@/styles/color"

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const highlightPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
`

export const PulseHighlight = styled.div`
  animation: ${highlightPulse} 1.5s ease-out;
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${color.basic800};
  margin-left: 5px;
`

export const ThreadContainer = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 400px;
  overflow-y: auto;
  min-height: 300px;
  max-height: 500px;
  scroll-behavior: smooth;
`

export const MessageWrapper = styled.div<{ $isCurrentUser: boolean; $highLighted?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex-direction: ${(props) => (props.$isCurrentUser ? "row-reverse" : "row")};
    ${({ $highLighted }) =>
    $highLighted &&
    css`
      animation: ${highlightPulse} 1.5s ease-out;
    `}
`
MessageWrapper.displayName = 'MessageWrapper';

export const MessageAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e5e7eb;
  flex-shrink: 0;
`

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const SenderInfo = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
  max-width: 75%;
`

export const SenderName = styled.span<{ $isCurrentUser: boolean }>`
  font-size: 11px;
  color: ${color.basic600};
  margin: ${(props) => (props.$isCurrentUser ? "0 8px 2px 0" : "0 0 2px 8px")};
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MessageBubbleContainer = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  flex-direction: ${(props) => (props.$isCurrentUser ? "row-reverse" : "row")};
`

export const MessageBubble = styled.div<{ $isCurrentUser: boolean; $isReply?: boolean }>`
  background-color: ${(props) => (props.$isCurrentUser ? "#10b981" : "#f3f4f6")};
  color: ${(props) => (props.$isCurrentUser ? "#ffffff" : "#374151")};
  border-radius: 12px;
  padding: 8px 12px;
  width: 100%;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;
  &:before {
    content: "";
    position: absolute;
    top: 8px;
    ${(props) => (props.$isCurrentUser ? "right: -4px" : "left: -4px")};
    width: 8px;
    height: 8px;
    background-color: ${(props) => (props.$isCurrentUser ? "#10b981" : "#f3f4f6")};
    transform: rotate(45deg);
    z-index: -1;
  }
`

export const MessageContent = styled.p`
  font-size: 13px;
  line-height: 1.4;
  word-break: break-word;
`

export const MessageTime = styled.span<{ $isCurrentUser: boolean }>`
  font-size: 8px;
  color: ${color.basic600};
  white-space: nowrap;
  align-self: flex-end;
  margin-bottom: 2px;
`

export const MessageInputContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
  position: relative;
`

export const MessageInput = styled.textarea`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 13px;
  resize: none;
  min-height: 38px;
  &:focus {
    outline: none;
    border-color: ${color.teal800};
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  border-radius: 6px;
  background-color: ${color.teal700};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${color.teal800};
  }
  &:disabled {
    background-color: ${color.basic400};
    cursor: not-allowed;
  }
`

export const MessagePreview = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  animation: ${slideUp} 0.3s ease-out;
  z-index: 10;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`

export const PreviewContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const PreviewAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

export const PreviewText = styled.div`
  flex: 1;
  min-width: 0;
`

export const PreviewSender = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${color.textPrimary};
  margin-bottom: 2px;
`

export const PreviewMessage = styled.div`
  font-size: 13px;
  color: ${color.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const PreviewCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: ${color.textSecondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f3f4f6;
    color: ${color.textPrimary};
  }
`
// 메시지 액션 관련 스타일
export const MessageContentWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const MessageActions = styled.div<{ $isCurrentUser: boolean }>`
  position: absolute;
  top: 40%;
  transform: translateY(-80%);
  ${(props) => (props.$isCurrentUser ? "left: -60px" : "right: -40px")};
  display: flex;
  gap: 2px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  padding: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  z-index: 5;
  flex-direction: ${(props) => (props.$isCurrentUser ? "row" : "row")};
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 2px;
  background: transparent;
  color: ${color.basic500};
  cursor: pointer;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: #f1f5f9;
    color: ${color.basic700};
    transform: scale(1.1);
  }
`

// 수정 모드 관련 스타일
export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const EditTextarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px;
  font-size: 13px;
  line-height: 1.4;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${color.teal800};
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`

export const EditActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
`

export const EditActionButton = styled.button<{ $type: "save" | "cancel" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${(props) =>
    props.$type === "save"
      ? `
    background-color: ${color.teal700};
    color: white;
    
    &:hover {
      background-color: ${color.teal800};
    }
  `
      : `
    background-color: #f3f4f6;
    color: ${color.basic600};
    
    &:hover {
      background-color: #e5e7eb;
      color: ${color.basic800};
    }
  `}
`

// 답글 관련 스타일
export const ReplyReference = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  font-size: 11px;
  color: ${color.basic600};
  ${(props) => (props.$isCurrentUser ? "margin-right: 8px;" : "margin-left: 8px;")}
`

export const ReplyIcon = styled.span`
  font-size: 12px;
  color: ${color.basic500};
`

export const ReplyText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ReplyingToContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 50px;
  margin-bottom: 4px;
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`

export const ReplyingToContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`

export const ReplyingToText = styled.span`
  font-size: 12px;
  color: ${color.basic700};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CancelReplyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${color.basic500};
  cursor: pointer;
  flex-shrink: 0;
  
  &:hover {
    background-color: #e5e7eb;
    color: ${color.basic700};
  }
`
