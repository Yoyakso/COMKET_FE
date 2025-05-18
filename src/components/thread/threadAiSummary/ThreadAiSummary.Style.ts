import styled from "styled-components"

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`

export const AiSummaryBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
`

export const AiSummaryContent = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: #374151;
  text-align: center;
`

export const ActionItemsContainer = styled.div`
  background-color: #ffffff;
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
  color: #6b7280;
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
  color: #374151;
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
      case "상": return "#fee2e2"
      case "중": return "#fef3c7"
      case "하": return "#dbeafe"
      default: return "#f3f4f6"
    }
  }};
  color: ${(props) => {
    switch (props.$priority) {
      case "상": return "#b91c1c"
      case "중": return "#b45309"
      case "하": return "#1d4ed8"
      default: return "#4b5563"
    }
  }};
  border: 1px solid
    ${(props) => {
    switch (props.$priority) {
      case "상": return "#fecaca"
      case "중": return "#fde68a"
      case "하": return "#bfdbfe"
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
      case "대기": return "#f3f4f6"
      case "진행중": return "#dbeafe"
      case "완료": return "#d1fae5"
      default: return "#f3f4f6"
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "대기": return "#4b5563"
      case "진행중": return "#1d4ed8"
      case "완료": return "#047857"
      default: return "#4b5563"
    }
  }};
  border: 1px solid
    ${(props) => {
    switch (props.$status) {
      case "대기": return "#e5e7eb"
      case "진행중": return "#bfdbfe"
      case "완료": return "#a7f3d0"
      default: return "#e5e7eb"
    }
  }};
`
