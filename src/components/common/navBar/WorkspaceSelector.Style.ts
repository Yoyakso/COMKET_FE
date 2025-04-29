import styled from "styled-components"
import { color } from "@/styles/color" // 필요 시 수정

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  background: transparent;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #f3f4f6;
  }
`

export const Logo = styled.div`
  width: 32px;
  height: 32px; 
  background-color: #f3f4f6;
  border-radius: 6px;
  border: 1px solid #E7EAF1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LogoBox = styled.div`
  width: 36px;
  height: 36px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const WorkspaceName = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: ${color.textPrimary};
`
