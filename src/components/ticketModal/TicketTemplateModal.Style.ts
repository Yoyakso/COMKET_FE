import styled from "styled-components"
import { color } from "@/styles/color"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

export const ModalHeader = styled.div`
  padding: 24px 32px 16px 32px;
  text-align: center;
`

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${color.textPrimary};
  margin: 0 0 8px 0;
`

export const ModalSubtitle = styled.p`
  font-size: 14px;
  color: ${color.textSecondary};
  margin: 0;
  line-height: 1.5;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`

export const ModalBody = styled.div`
  padding: 0 32px 24px 32px;
  flex: 1;
  overflow-y: auto;
  min-height: 200px;
`

export const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 8px 0 16px 0;
`

export const TemplateCard = styled.div<{ $isSelected: boolean; color: string }>`
  background: white;
  border: 2px solid ${(props) => (props.$isSelected ? props.color : "#e5e7eb")};
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    border-color: ${(props) => props.color};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  ${(props) =>
    props.$isSelected &&
    `
    background-color: ${props.color}08;
    box-shadow: 0 4px 8px ${props.color}20;
  `}
`

export const CardIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.color};
  }
`

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;
`

export const CardDescription = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 12px 0;
  line-height: 1.4;
`

export const CardTag = styled.span<{ color: string }>`
  display: inline-block;
  background-color: ${(props) => props.color}15;
  color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 16px;
`

export const ModalFooter = styled.div`
  padding: 16px 32px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: white;
  position: sticky;
  bottom: 0;
`

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${(props) =>
    props.variant === "primary"
      ? `
    background-color: ${color.teal500};
    color: white;
    border: 1px solid ${color.teal600};
    
    &:hover {
      background-color: ${color.teal600};
      border-color: ${color.teal700};
    }
    
    &:disabled {
      background-color: #9ca3af;
      border-color: #9ca3af;
      cursor: not-allowed;
    }
  `
      : `
    background-color: white;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }
  `}
`
