import styled from "styled-components"
import { color } from "@/styles/color"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 720px;
  height: 356px;
  margin: 0 auto;
  border-radius: 8px;
  gap: 40px;
  border: 1px solid #e5e7eb;
  background-color: white;
  padding: 40px 32px 32px 32px;
  justify-content: center;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 20px;
`

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${color.textPrimary};
`

export const MessageContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  background-color: #F9FAFB;
  border-radius: 5px;
  text-align: center;
`

export const Message = styled.p`
  font-size: 14px;
  color: ${color.textSecondary};
  line-height: 22px;
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
`

export const Button = styled.button`
  height: 56px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
`

export const HomeButton = styled(Button)`
  flex: 1;
  background-color: white;
  color: ${color.textPrimary};
  border: 1px solid #e5e7eb;
  
  &:hover {
    background-color: #F9FAFB;
  }
`

export const LoginButton = styled(Button)`
  flex: 1;
  background-color: ${color.teal500};
  color: white;
  
  &:hover {
    background-color: ${color.teal600};
  }
`
