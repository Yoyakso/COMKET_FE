import styled from "styled-components"

// 페이지 컨테이너
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f9fafb;
  padding: 16px;
`

// 페이지 헤더
export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #4b5563;
  font-size: 13px;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f3f4f6;
  }
`

export const PageTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-left: 12px;
`

// 컨텐츠 컨테이너
export const ContentContainer = styled.div`
  display: flex;
  gap: 16px;
  height: calc(100% - 50px);
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

// 왼쪽 컬럼
export const LeftColumn = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

// 오른쪽 컬럼
export const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

// 섹션 제목
export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`

// 스레드 컨테이너
export const ThreadContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 450px;
  overflow-y: auto;
`

// 메시지 래퍼
export const MessageWrapper = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex-direction: ${(props) => (props.$isCurrentUser ? "row-reverse" : "row")};
`

// 메시지 아바타
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

// 메시지 버블
export const MessageBubble = styled.div<{ $isCurrentUser: boolean }>`
  background-color: ${(props) => (props.$isCurrentUser ? "#10b981" : "#f3f4f6")};
  color: ${(props) => (props.$isCurrentUser ? "#ffffff" : "#374151")};
  border-radius: 12px;
  padding: 8px 12px;
  max-width: 75%;
  position: relative;
  
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

// 메시지 입력 컨테이너
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
    border-color: #10b981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  background-color: #10b981;
  color: white;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #059669;
  }
  
  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`

// 정보 그리드
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
`

// 정보 섹션
export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InfoTitle = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
`

export const InfoContent = styled.div`
  font-size: 13px;
  color: #111827;
`

// 담당자 표시
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

// 상태 배지
export const StatusBadgeContainer = styled.div`
  display: flex;
  gap: 6px;
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
      case "대기":
        return "#f3f4f6"
      case "진행중":
        return "#dbeafe"
      case "완료":
        return "#d1fae5"
      default:
        return "#f3f4f6"
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "대기":
        return "#4b5563"
      case "진행중":
        return "#1d4ed8"
      case "완료":
        return "#047857"
      default:
        return "#4b5563"
    }
  }};
  border: 1px solid
    ${(props) => {
    switch (props.$status) {
      case "대기":
        return "#e5e7eb"
      case "진행중":
        return "#bfdbfe"
      case "완료":
        return "#a7f3d0"
      default:
        return "#e5e7eb"
    }
  }};
`

// 태그 컨테이너
export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

export const TagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
`

// 하위 티켓 리스트
export const SubticketList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const SubticketItem = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  
  svg {
    color: #10b981;
    width: 12px;
    height: 12px;
  }
`

// AI 요약 박스
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

// 액션 아이템 컨테이너
export const ActionItemsContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
`

// 액션 아이템 테이블
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

// 우선순위 배지
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
      case "상":
        return "#fee2e2"
      case "중":
        return "#fef3c7"
      case "하":
        return "#dbeafe"
      default:
        return "#f3f4f6"
    }
  }};
  color: ${(props) => {
    switch (props.$priority) {
      case "상":
        return "#b91c1c"
      case "중":
        return "#b45309"
      case "하":
        return "#1d4ed8"
      default:
        return "#4b5563"
    }
  }};
  border: 1px solid
    ${(props) => {
    switch (props.$priority) {
      case "상":
        return "#fecaca"
      case "중":
        return "#fde68a"
      case "하":
        return "#bfdbfe"
      default:
        return "#e5e7eb"
    }
  }};
`
