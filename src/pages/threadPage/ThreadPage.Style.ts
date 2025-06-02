import styled from "styled-components"
import { color } from "@/styles/color"

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: hidden;
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
  height: 100vh;
  padding-top: 72px;
  box-sizing: border-box;
`

export const LNBContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 72px;
  left: 0;
  height: calc(100vh - 72px);
  z-index: 90;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 14px;
  margin-left: 230px;
  box-sizing: border-box;
  overflow: auto;
`

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  height: 60px;
  box-sizing: border-box;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: ${color.textSecondary};
  font-size: 13px;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  
  &:hover {
    background-color: ${color.basic100};
  }
`

export const PageTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: ${color.textPrimary};
  margin-left: 15px;
`

export const PageHeaderActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 8px;
`

export const CreateSubTicketButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${color.teal500};
  color: white;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${color.teal600};
  }
`

export const ContentBody = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
  padding: 0 32px 32px;
  margin-top: 16px;
`

export const LeftColumn = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
