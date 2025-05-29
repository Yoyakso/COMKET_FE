import styled, { keyframes } from "styled-components"
import { color } from "@/styles/color"

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const buttonHover = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0px);
  }
`

export const SpinnerIcon = styled.div`
  animation: ${spin} 1s linear infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const LoadingSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${color.basic700};
  margin-left: 6px;
`

export const GenerateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(102, 126, 234, 0.35);
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.25);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.15);
    
    &:hover {
      transform: none;
      box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.15);
      
      &::before {
        left: -100%;
      }
    }
  }
`

export const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  
  ${GenerateButton}:hover & {
    transform: scale(1.1);
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 12px;
`

export const LoadingText = styled.p`
  font-size: 13px;
  color: ${color.textSecondary};
  text-align: center;
`

export const AiSummaryBox = styled.div`
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  min-height: 120px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`

export const AiSummaryContent = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${color.textSecondary};
  text-align: center;
`

export const ActionItemsContainer = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
`

export const ActionItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.thead`
  border-bottom: 1px solid #e5e7eb;
`

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: 8px 6px;
  font-size: 11px;
  font-weight: 500;
  color: ${color.basic700};
`

export const TableBody = styled.tbody``

export const TableRow = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  &:last-child {
    border-bottom: none;
  }
`

export const TableCell = styled.td`
  padding: 8px 6px;
  font-size: 12px;
  color: ${color.basic900};;
`

export const AssigneeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const SmallAvatar = styled.div`
  width: 20px;
  height: 20px;
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

export const PriorityBadge = styled.span<{ $priority: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.$priority) {
      case "HIGH": return "#fee2e2"
      case "MEDIUM": return "#fef3c7"
      case "LOW": return "#dbeafe"
      default: return "#f3f4f6"
    }
  }};
  color: ${(props) => {
    switch (props.$priority) {
      case "HIGH": return "#b91c1c"
      case "MEDIUM": return "#b45309"
      case "LOW": return "#1d4ed8"
      default: return "#4b5563"
    }
  }};
  border: 1px solid
    ${(props) => {
    switch (props.$priority) {
      case "HIGH": return "#fecaca"
      case "MEDIUM": return "#fde68a"
      case "LOW": return "#bfdbfe"
      default: return "#e5e7eb"
    }
  }};
`

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.$status) {
      case "TODO": return "#f3f4f6"
      case "IN PROGRESS": return "#dbeafe"
      case "DONE": return "#d1fae5"
      default: return "#f3f4f6"
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "TODO": return "#4b5563"
      case "IN PROGRESS": return "#1d4ed8"
      case "DONE": return "#047857"
      default: return "#4b5563"
    }
  }};
  border: 1px solid
    ${(props) => {
    switch (props.$status) {
      case "TODO": return "#e5e7eb"
      case "IN PROGRESS": return "#bfdbfe"
      case "DONE": return "#a7f3d0"
      default: return "#e5e7eb"
    }
  }};
`

export const PlaceholderMessage = styled.div`
  padding: 16px;
  text-align: center;
  color: ${color.textSecondary};
  font-size: 13px;
`
