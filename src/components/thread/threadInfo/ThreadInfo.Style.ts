import styled from "styled-components"
import { color } from "@/styles/color"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 95%;
  max-width: 1500px;
  margin: 0 auto;
  max-height: 350px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`

export const Section = styled.div`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: visible;
  
  &:last-child {
    border-bottom: none;
  }
`

export const SectionHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  color: ${color.basic700};
  margin: 0;
`

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  padding: 6px;
  color: #6b7280;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: #111827;
    background-color: rgba(59, 130, 246, 0.1);
  }
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
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

export const AdditionalInfoContent = styled.div`
  font-size: 12px;
  color: ${color.textSecondary};
  line-height: 1.4;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow-y: auto;
  padding: 10px 0;
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: ${color.textPlaceholder};
  font-style: italic;
  font-size: 11px;
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

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  color: ${color.textPrimary};
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: #ffffff;
  }

  &:hover {
    border-color: #d1d5db;
  }

  &::placeholder {
    color: ${color.textSecondary};
  }
`

export const StyledSelect = styled.select`
  width: 80%;
  padding: 6px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 12px;
  color: ${color.textPrimary};
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 32px;

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: #ffffff;
  }

  &:hover {
    border-color: #d1d5db;
  }

  option {
    padding: 8px;
    background-color: white;
    color: ${color.textPrimary};
  }
`

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  color: ${color.textPrimary};
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  transition: all 0.2s ease;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: #ffffff;
  }

  &:hover {
    border-color: #d1d5db;
  }

  &::placeholder {
    color: ${color.textSecondary};
  }
`

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.25);
  margin-top: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(16, 185, 129, 0.35);
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.25);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.15);
  }
`

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${color.textSecondary};
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;
  margin-left: 8px;

  &:hover {
    border-color: #d1d5db;
    color: ${color.textPrimary};
    background-color: #f9fafb;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px 16px;
`
