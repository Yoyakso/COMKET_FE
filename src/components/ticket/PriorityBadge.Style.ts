import styled, { css } from "styled-components";

const getColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return css`
        background-color: #FF4D4F;
        color: white;
      `;
    case "MEDIUM":
      return css`
        background-color: #FAAD14;
        color: white;
      `;
    case "LOW":
      return css`
        background-color: #52C41A;
        color: white;
      `;
    default:
      return css``;
  }
};

export const Badge = styled.span<{ $priority: string }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  min-width: 60px;
  ${props => getColor(props.$priority)}
`;
