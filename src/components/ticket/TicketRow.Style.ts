import styled from "styled-components";
import { color } from "@/styles/color";

export const TableRow = styled.tr`
  border-bottom: 1px solid #f1f3f5;
  &:hover {
    background-color: #fafafa;
  }
`;

export const TableCell = styled.td`
  padding: 12px 20px;
  color: ${color.textPrimary};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
`;
