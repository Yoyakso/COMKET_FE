import styled from "styled-components"
import { color } from "@/styles/color"

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 4px;
  height: 100vh;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.thead`
  background-color: ${color.white};
`

export const HeaderRow = styled.tr`
  border-top: 1px solid #E7EAF1;
  border-bottom: 1px solid #CFD5E4;
`

export const HeaderCell = styled.th`
  padding: 12px 30px;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  color:  ${color.textHeading};
  white-space: nowrap;
  cursor: pointer;
  
  &:hover {
    background-color:#F7F8FA;
  }
  
  &:last-child {
    cursor: default;
    
    &:hover {
      background-color: transparent;
    }
  }
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const TableBody = styled.tbody``
