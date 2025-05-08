import styled from "styled-components"
import { color } from "@styles/color"

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

export const GNBContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

export const MainContainer = styled.div`
  display: flex;
  height: 100%;
  padding-top: 72px;
`

export const LNBContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 72px);
  z-index: 90;
`

export const Content = styled.div`
  flex: 1;
  margin-left: 260px;
  padding: 32px 48px;
  box-sizing: border-box;
  height: calc(100vh - 72px);
  overflow: auto;
  background-color: ${color.white};
  max-width: 824px;
`

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${color.textPrimary};
`

export const Section = styled.div`
  display: flex;
  margin: 24px 0;
  gap: 20px;
`

export const SectionTitle = styled.div`
  width: 120px;
  font-size: 14px;
  font-weight: 500;
  color: ${color.textPrimary};
  flex-shrink: 0;
  margin-top: 15px;
`

export const SectionContent = styled.div`
  flex: 1;
  margin-top: 10px;
`

export const EmailText = styled.div`
  font-size: 14px;
  color: ${color.textPrimary}
`

export const LoginMethodContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LoginMethodInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const LoginMethodText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${color.textPrimary};
`

export const LogoutButton = styled.button`
  width: 91px;
  height: 32px;
  padding: 6.5px 8px;
  background-color: ${color.teal500};
  color: white;
  border: none;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${color.teal600};
  }
`

export const WithdrawContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WithdrawText = styled.div`
  font-size: 14px;
  font-weight: 400px;
  color: ${color.textTertiary};
`

export const WithdrawButton = styled.button`
  width: 91px;
  height: 32px;
  padding: 6.5px 8px;
  background-color: ${color.basic100};
  color: ${color.textPrimary};
  border: none;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${color.basic200};
  }
`

export const Divider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 24px 0;
`
