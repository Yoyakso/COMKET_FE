import styled, { css } from "styled-components";
import { color } from "@/styles/color";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "TODO":
      return css`
        background-color: #BFBFBF;
        color: white;
      `;
    case "IN_PROGRESS":
      return css`
        background-color: #1890FF;
        color: white;
      `;
    case "DONE":
      return css`
        background-color: #52C41A;
        color: white;
      `;
    case "HOLD":
      return css`
        background-color: #FF4D4F;
        color: white;
      `;
    case "DROP":
      return css`
        background-color: #722ED1;
        color: white;
      `;
    case "BACKLOG":
      return css`
        background-color: #FA8C16;
        color: white;
      `;
    default:
      return css``;
  }
};

export const Badge = styled.span<{ $status: string }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  min-width: 80px;
  white-space: nowrap;      // 줄바꿈 방지
  text-align: center;
  ${props => getStatusStyle(props.$status)}
`;
