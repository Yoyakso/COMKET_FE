// src/pages/TicketDashboard/components/TicketTable.style.ts
import styled from "styled-components";
import { color } from "@/styles/color";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

export const HeaderRow = styled.tr`
  border-bottom: 1px solid #dee2e6;
`;

export const HeaderCell = styled.th`
  padding: 12px 20px;
  text-align: left;
  color: ${color.textLabel};
  font-weight: 500;
  white-space: nowrap;
  cursor: default;

  &:hover {
    background-color: #f1f3f5;
  }
`;

export const TableBody = styled.tbody``;
