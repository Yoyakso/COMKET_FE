import styled, { keyframes } from "styled-components"
import { color } from "@styles/color"

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  z-index: 1000;
`

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 24px;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
`

export const MessageContainer = styled.div`
  background-color: #F7F8FA;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`

export const Message = styled.p`
  font-size: 14px;
  color: ${color.textPrimary};
  line-height: 22px;
  margin: 0;
`

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 8px;
`

export const CancelButton = styled.button`
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: ${color.white};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

export const RemoveButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #F27D7D;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background-color: ${color.error};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

export const SpinnerContainer = styled.span`
  display: inline-flex;
  margin-left: 8px;
  
  svg {
    animation: ${spin} 1s linear infinite;
  }
`
