import styled, { keyframes } from "styled-components"
import { color } from "@/styles/color"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

export const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.15s ease-out;
`

export const DialogContent = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  width: 100%;
  max-width: 448px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${slideIn} 0.15s ease-out;
  padding: 24px;
`

export const DialogHeader = styled.div`
  margin-bottom: 16px;
`

export const DialogTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  margin: 0;
  color: ${color.textPrimary};
`

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const RadioGroupItem = styled.input.attrs({ type: "radio" })`
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  cursor: pointer;
  appearance: none;
  position: relative;
  
  &:checked {
    border-color: ${color.teal500};
    background-color: ${color.teal500};
  }
  
  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
  }
  
  &:focus {
    outline: 2px solid ${color.teal500};
    outline-offset: 2px;
  }
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Description = styled.p`
  font-size: 14px;
  color: ${color.textSecondary};
  margin: 0;
  
  .font-medium {
    font-weight: 500;
  }
`

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.15s ease-in-out;
  
  &:hover {
    background-color: #f9fafb;
  }
`

export const RadioContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .title {
    font-weight: 500;
    font-size: 14px;
  }
  
  .description {
    font-size: 12px;
    color: #6b7280;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 16px;
`
