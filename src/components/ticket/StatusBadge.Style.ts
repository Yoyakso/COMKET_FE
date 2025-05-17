import styled, { css } from 'styled-components';
import { color } from '@/styles/color';

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'TODO':
      return css`
        background-color: #bfbfbf;
        color: white;
      `;
    case 'IN_PROGRESS':
      return css`
        background-color: #1890ff;
        color: white;
      `;
    case 'DONE':
      return css`
        background-color: #52c41a;
        color: white;
      `;
    case 'HOLD':
      return css`
        background-color: #ff4d4f;
        color: white;
      `;
    case 'DROP':
      return css`
        background-color: #722ed1;
        color: white;
      `;
    case 'BACKLOG':
      return css`
        background-color: #fa8c16;
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
  white-space: nowrap; // 줄바꿈 방지
  text-align: center;
  ${props => getStatusStyle(props.$status)}
`;
