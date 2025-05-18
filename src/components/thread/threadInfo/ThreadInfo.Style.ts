import styled from "styled-components"

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
`

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
