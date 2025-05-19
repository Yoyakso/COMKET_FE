import styled from "styled-components"
import { color } from "@/styles/color"

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${color.basic0};
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
  height: calc(100vh - 72px);
  padding-top: 72px;
  overflow: hidden;
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

export const ContentContainer = styled.div`
  display: flex;
  gap: 16px;
  height: calc(100% - 72px);
  padding: 32px;
  margin-left: 150px;
  overflow: hidden;
`

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
  font-size: 18px;
  font-weight: 600;
  color: ${color.textPrimary};
  margin-left: 15px;
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
