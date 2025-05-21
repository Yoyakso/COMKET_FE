import styled from "styled-components";
import { color } from "@/styles/color";

export const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
  height: 100%;
`;

export const Column = styled.div`
  flex: 1;
  min-width: 250px;
  background-color: ${color.basic0};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export const ColumnHeader = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

export const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;
