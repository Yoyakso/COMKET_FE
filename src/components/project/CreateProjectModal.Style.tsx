import styled, { keyframes } from "styled-components"
import { color } from "@styles/color"

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
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 720px;
  height: 490px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
`

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`

export const FormRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
`

export const Label = styled.label`
  width: 116px;
  font-size: 14px;
  font-weight: 500;
  color: ${color.textHeading};
  padding-top: 8px;
  flex-shrink: 0;
`

export const InputContainer = styled.div`
  flex: 1;
`

export const Input = styled.input`
  width: 100%;
  padding: 10.5px 15px;
  border: 1px solid #EDEFF5;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${color.teal500};
  }

  &::placeholder {
    color: ${color.textPlaceholder}
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10.5px 15px;
  border: 1px solid #EDEFF5;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${color.teal500};
  }
  
  &::placeholder {
    color: ${color.textPlaceholder}
  }
`

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  padding: 8px 12px;
  border: 1px solid #EDEFF5;
  border-radius: 4px;
  min-height: 48px;
  align-items: center;
  
  &:focus-within {
    border-color: ${color.teal500};;
    box-shadow: 0 0 0 2px rgba(0, 200, 83, 0.1);
  }
`

export const TagInput = styled.input`
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 4px 0;
  
  &::placeholder {
    color: ${color.textPlaceholder}
  }
`

export const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 8px;
`

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
`

export const RadioInput = styled.input`
  margin: 0;
  width: 18px;
  height: 18px;
  accent-color: #00C853;
  cursor: pointer;
`

export const RadioLabel = styled.label`
  margin-left: 8px;
  font-size: 14px;
  cursor: pointer;
`

export const HelperText = styled.p`
  font-size: 12px;
  color: #757575;
  margin-top: 4px;
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

export const CreateButton = styled.button`
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
