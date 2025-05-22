import { styled, keyframes } from "styled-components"
import { color } from "@/styles/color"

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
  height: 450px;
  overflow-y: auto;
`

export const MessageWrapper = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex-direction: ${(props) => (props.$isCurrentUser ? "row-reverse" : "row")};
`

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

export const MessageBubble = styled.div<{ $isCurrentUser: boolean }>`
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
  font-size: 10px;
  color: ${color.basic600};
  white-space: nowrap;
  align-self: flex-end;
  margin-bottom: 2px;
`

export const MessageInputContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
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
