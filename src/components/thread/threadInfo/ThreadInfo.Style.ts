import styled from "styled-components"
import { color } from "@/styles/color"

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 15px;
  max-height: 180px;
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const InfoTitle = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: ${color.basic700};
  display: flex;
  align-items: center;
  gap: 4px;
`

export const InfoContent = styled.div`
  font-size: 13px;
  color: ${color.textPrimary};
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
