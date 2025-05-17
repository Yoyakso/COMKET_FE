import styled from "styled-components"
import { color } from "@/styles/color"

export const PanelContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 480px;
  background-color: white;
  box-shadow: -4px 0 5px #E7EAF1;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  z-index: 50;
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 12px 24px;
`

export const PanelTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ThreadStartContainer = styled.div`
  padding: 0 24px 24px 24px;
  border-bottom: 1px solid #E7EAF1;
`

export const Button = styled.button<{ $variant?: "default" | "outline" | "ghost"; $size?: "default" | "sm" | "icon" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  /* 크기 스타일 */
  ${(props) =>
    props.$size === "sm" &&
    `
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
  `}

  /* 변형 스타일 */
  ${(props) =>
    props.$variant === "outline" &&
    `
    background-color: transparent;
    border: 1px solid #e5e7eb;
    color: #374151;
    
    &:hover {
      background-color: #f9fafb;
      border-color: #d1d5db;
    }
  `}
  
  ${(props) =>
    props.$variant === "ghost" &&
    `
    background-color: transparent;
    border: none;
    color: #374151;
    
    &:hover {
      background-color: #f3f4f6;
    }
  `}
  
  ${(props) =>
    !props.$variant || props.$variant === "default"
      ? `
    background-color: #10b981;
    border: none;
    color: white;
    
    &:hover {
      background-color: #059669;
    }
  `
      : ""}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.w-full {
    width: 100%;
  }
`

export const ThreadStartButton = styled(Button)`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  border: 1px solid #E7EAF1;
  color: ${color.textSecondary};
  
  &:hover {
    background-color: ${color.basic100};
    border-color: #d1d5db;
  }
`

export const ContentScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const ThreadContainer = styled.div`
  padding: 16px;
`

export const AiSummaryBox = styled.div`
  margin-bottom: 24px;
  padding: 12px;
  background-color: #f5f3ff;
  border: 1px solid #e9d5ff;
  border-radius: 6px;
`

export const AiSummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

export const AiSummaryTitle = styled.h3`
  font-weight: 500;
  font-size: 14px;
  color: #7e22ce;
`

export const AiSummaryContent = styled.p`
  font-size: 14px;
  color: #4b5563;
`

export const ThreadMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const EmptyThreadMessage = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #6b7280;
`

export const ThreadMessageItem = styled.div`
  display: flex;
  gap: 12px;
`

export const MessageContent = styled.div`
  flex: 1;
`

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const MessageAuthor = styled.span`
  font-weight: 500;
`

export const MessageTime = styled.span`
  font-size: 12px;
  color: #6b7280;
`

export const MessageText = styled.p`
  font-size: 14px;
  margin-top: 4px;
`

export const TicketInfoContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const InfoSection = styled.div``

export const InfoLabel = styled.h3`
  font-size: 14px;
  font-weight: 400;
  color: ${color.textLabel};
  margin-bottom: 6px;
`

export const DetailContent = styled.div`
  font-size: 14px;
  color: ${color.textPrimary};
`

export const PriorityDisplay = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
  width: 67px;
  height: 24px;
  border-radius: 100px;
  color: ${color.textLabel};
  font-size: 12px;
  background-color: #F7F8FA;
`

interface PriorityDotProps {
  priority: "HIGH" | "MEDIUM" | "LOW"
}

export const PriorityDot = styled.span<PriorityDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => {
    switch (props.priority) {
      case "HIGH":
        return `${color.error}`
      case "MEDIUM":
        return `${color.warning}`
      case "LOW":
        return `${color.success}`
      default:
        return "#9ca3af"
    }
  }};
`

export const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

interface UserAvatarProps {
  color: string
}

export const Avatar = styled.div<UserAvatarProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
`
export const UserName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${color.textPrimary};
`

// export const AvatarImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `

export const UnassignedText = styled.span`
  color: #9ca3af;
`

export const DateSection = styled.div`
  display: flex;
  gap: 16px;
`

export const DateColumn = styled.div`
  flex: 1;
`

export const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${color.textPrimary};
`

export const AttachmentSection = styled.div`
`

export const AttachmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`

export const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${color.lightBlue600};
  font-size: 14px;
`

export const AttachmentName = styled.span`
  color: ${color.lightBlue600};
  text-decoration: underline;
  cursor: pointer;
`

export const AddAttachmentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid #E7EAF1;
  background-color: transparent;
  color: ${color.textSecondary};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${color.basic100};
  }
`

export const SubTicketSection = styled.div`
`
export const Divider = styled.div`
  width: 100%;
  height: 1px #E7EAF1;
`

export const CreateSubTicketButton = styled.button`
  display: flex;
  width: 100%;
  background-color: white;
  color: ${color.textSecondary};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  gap: 12px;
`

export const ThreadInputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #e5e7eb;
`

export const ThreadInputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const MessageInputContainer = styled.div`
  display: flex;
  gap: 8px;
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  resize: none;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

export const PanelFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
`

export const Badge = styled.span<{ $variant?: "default" | "outline" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  
  ${(props) =>
    props.$variant === "outline"
      ? `
    background-color: transparent;
    border: 1px solid currentColor;
  `
      : `
    background-color: #f3f4f6;
    color: #374151;
  `}
`
