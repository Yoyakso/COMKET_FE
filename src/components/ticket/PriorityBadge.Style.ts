import styled, { css } from 'styled-components';
import { color } from '@/styles/color';

const getColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return css`
        background-color: rgb(250, 80, 74);
        color: white;
      `;
    case 'MEDIUM':
      return css`
        background-color: rgb(255, 169, 39);
        color: white;
      `;
    case 'LOW':
      return css`
        background-color: #18d9a0;
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
