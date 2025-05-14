import styled from "styled-components";
import { color } from "@/styles/color";

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  background-color: #ffffff;
  border-radius: 6px;
  border-top: 1px solid ${color.textPlaceholder24};
  border-bottom: 1px solid ${color.textPlaceholder24};

`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const TableHeader = styled.thead`
  background-color: ${color.white};
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


export const SortableHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  svg {
    transition: transform 0.2s ease;
  }

`;