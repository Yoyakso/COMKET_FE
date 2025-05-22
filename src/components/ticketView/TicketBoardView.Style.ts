import styled from "styled-components";
import { color } from "@/styles/color";

export const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
  height: 100%;
  background-color: white;
`;

export const Column = styled.div<{ columnType: string }>`
  flex: 1;
  min-width: 250px;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  max-height: 100%;

   background-color: ${(props) => {
    switch (props.columnType) {
      case "TODO":
        return "#d9f2fd"
      case "IN_PROGRESS":
        return "#fff4e5" // Light orange
      case "DONE":
        return `${color.teal0}`
      case "OTHERS":
        return "#f5f5f7" // Light gray
      default:
        return color.basic0
    }
  }};

  border-top: 4px solid ${(props) => {
    switch (props.columnType) {
      case "TODO":
        return "#0064FF" // Blue
      case "IN_PROGRESS":
        return "#ff9a3d" // Orange
      case "DONE":
        return `${color.teal500}`
      case "OTHERS":
        return "#9e9e9e" // Gray
      default:
        return color.basic0
    }
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const ColumnHeader = styled.div<{ columnType: string }>`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;

  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  color: ${(props) => {
    switch (props.columnType) {
      case "TODO":
        return "#0064FF"
      case "IN_PROGRESS":
        return "#e67700"
      case "DONE":
        return `${color.teal700}`
      case "OTHERS":
        return "#616161"
      default:
        return "#333"
    }
  }};
`;

export const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding: 4px;

    &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.02);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const ColumnTitle = styled.span`
  display: flex;
  align-items: center;
`

export const TicketCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 4px 8px;
  border-radius: 12px;
  margin-left: 8px;
`