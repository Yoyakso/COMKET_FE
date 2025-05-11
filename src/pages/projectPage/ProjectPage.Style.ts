import styled from "styled-components"
import { color } from "@/styles/color"

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
`

export const NoResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${color.basic0};
  border-radius: 8px;
  margin-top: 16px;
`

export const NoResultsText = styled.p`
  font-size: 16px;
  color: ${color.textSecondary};
  text-align: center;
`
