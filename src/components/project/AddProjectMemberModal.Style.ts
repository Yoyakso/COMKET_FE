import styled, { keyframes } from "styled-components"
import { color } from "@/styles/color"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

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
  z-index: 1100;
  animation: ${fadeIn} 0.3s ease-out;
`

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 32px;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 32px;
`

export const FormRow = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`

export const Label = styled.label`
  width: 120px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding-top: 8px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 0;
  }
`

export const InputContainer = styled.div`
  flex: 1;
`

export const EmailInput = styled.input`
  flex: 1;
  min-width: 200px;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px 4px;
  
  &::placeholder {
    color: #9e9e9e;
  }
`

export const MemberTagsContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
`

export const MemberTag = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 4px 8px 4px 4px;
  font-size: 14px;
  gap: 8px;
`

export const MemberAvatar = styled.div<{ $bgColor: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.$bgColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  padding: 2px;
  
  &:hover {
    color: #424242;
  }
`

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

export const DropdownButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const DropdownItem = styled.div<{ $active?: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#f0f7ff" : "transparent")};
  
  &:hover {
    background-color: #f5f5f5;
  }
`

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`

export const CancelButton = styled.button`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  color: ${color.textSecondary}
  
  &:hover:not(:disabled) {
    background-color: ${color.white};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

export const AddButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: ${color.teal500};
  color: white;
  font-size: 16px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: ${color.teal600};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    background-color: ${color.primaryDisabled};
    color: ${color.textTertiary}
  }
`
