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

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const EyeLevelButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.25);
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
    box-shadow: 0 8px 25px 0 rgba(16, 185, 129, 0.35);
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.25);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.15);
    
    &:hover {
      transform: none;
      box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.15);
      
      &::before {
        left: -100%;
      }
    }
  }

  svg:last-child {
    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease;
  }
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  min-width: 160px;
  overflow: hidden;
`

export const DropdownItem = styled.button<{ $isSelected: boolean }>`
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.$isSelected ? "#10b981" : color.basic900)};
  background-color: ${(props) => (props.$isSelected ? "#f0fdf4" : "white")};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    color: #10b981;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
`

export const ActionItemsContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
`

export const ActionItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ActionItemCard = styled.div<{ $priority: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid ${color.basic100};
  border-left: 4px solid ${(props) => {
    switch (props.$priority) {
      case "HIGH":
        return "#DC2626" // 빨간색
      case "MEDIUM":
        return "#F97316" // 주황색
      case "LOW":
        return "#22C55E" // 초록색
      default:
        return "#E5E7EB"
    }
  }};
  border-radius: 6px;
  background-color: white;
  margin-bottom: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
`

export const ActionItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`

export const ActionItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${color.basic900};
  line-height: 1.4;
  margin-bottom: 4px;
`

export const ActionItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 80px;
`

export const DueDate = styled.span`
  font-size: 12px;
  color: ${color.textSecondary};
  font-weight: 400;
  text-align: right;
  margin-top: 4px;
`

export const AssigneeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
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
      case "LOW": return "#22C55E20"
      default: return "#f3f4f6"
    }
  }};
  color: ${(props) => {
    switch (props.$priority) {
      case "HIGH": return "#b91c1c"
      case "MEDIUM": return "#b45309"
      case "LOW": return "#22C55E"
      default: return "#4b5563"
    }
  }};
  border: 1px solid
    ${(props) => {
    switch (props.$priority) {
      case "HIGH": return "#fecaca"
      case "MEDIUM": return "#fde68a"
      case "LOW": return "#22C55E"
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
