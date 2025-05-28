import styled from "styled-components"
import { color } from "@/styles/color"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Section = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  max-height: 300px;
`

export const SectionHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  color: ${color.basic700};
  margin: 0;
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  max-height: 150px;
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
  margin: 0;
`

export const InfoContent = styled.div`
  font-size: 13px;
  color: ${color.textPrimary};
`

export const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const TagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
`

export const PriorityBadge = styled.span<{ priority?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.priority) {
      case "HIGH":
        return "#fef2f2"
      case "MEDIUM":
        return "#fef3c7"
      case "LOW":
        return "#f0f9ff"
      default:
        return "#fef2f2"
    }
  }};
  color: ${(props) => {
    switch (props.priority) {
      case "HIGH":
        return "#dc2626"
      case "MEDIUM":
        return "#d97706"
      case "LOW":
        return "#2563eb"
      default:
        return "#dc2626"
    }
  }};
  border: 1px solid ${(props) => {
    switch (props.priority) {
      case "HIGH":
        return "#fecaca"
      case "MEDIUM":
        return "#fed7aa"
      case "LOW":
        return "#bfdbfe"
      default:
        return "#fecaca"
    }
  }};
`

export const StatusBadgeContainer = styled.div`
  display: flex;
  gap: 6px;
`

export const DateText = styled.span`
  font-size: 13px;
  color: ${color.textSecondary};
`

export const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
`

export const UserId = styled.span`
  color: ${color.textSecondary};
  font-size: 12px;
`

export const DescriptionSection = styled.div`
  padding: 16px;
  width: 100%;
`

export const DetailContent = styled.div`
  padding: 10px 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${color.textPrimary};
  width: 100%;
  
  ul {
    margin: 0;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 4px;
  }
`

export const PlaceholderText = styled.div`
  color: ${color.textSecondary};
  font-style: italic;
`

export const AttachmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  padding: 16px;
`

export const AttachmentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`

export const FileIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: #fee2e2;
  border-radius: 6px;
  color: #dc2626;
`

export const FileType = styled.span`
  position: absolute;
  bottom: -2px;
  right: -2px;
  background-color: #dc2626;
  color: white;
  font-size: 8px;
  font-weight: 600;
  padding: 1px 3px;
  border-radius: 2px;
`

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
`

export const FileName = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${color.textPrimary};
  word-break: break-all;
  line-height: 1.2;
`

export const FileSize = styled.span`
  font-size: 10px;
  color: ${color.textSecondary};
`

export const SubticketList = styled.ul`
  list-style: none;
  padding: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SubticketItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  svg {
    color: #10b981;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`
