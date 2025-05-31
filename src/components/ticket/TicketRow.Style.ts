import styled from 'styled-components';
import { color } from '@/styles/color';

export const TableRow = styled.tr<{ $depth?: number }>`
  height: 52px;
  background-color: ${({ $depth }) =>
    $depth === 0 ? '#ffffff' : $depth === 1 ? '#f6fefc' : '#eefcf8'};

  box-shadow: ${({ $depth }) =>
    $depth === 0 ? 'none' : `inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)`};
  &:hover {
    background-color: ${color.textPlaceholder08};
  }
`;

export const TableCell = styled.td<{ $align?: 'left' | 'center' | 'right'; $depth?: number }>`
  padding: 12px 20px;
  color: ${color.textPrimary};
  font-size: 14px;
  text-align: ${({ $align }) => $align ?? 'left'};
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;

  ${({ $depth }) =>
    $depth !== undefined &&
    $depth > 0 &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: ${$depth === 0 ? color.teal200 : $depth === 1 ? color.teal300 : color.teal500};
    }
  `}
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${color.teal500};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  width: 16px;
  height: 16px;

  &:hover {
    color: ${color.teal500};
  }
`;

export const ToggleButtonPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  padding-left: 10px;
`;

export const TicketTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ThreadIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${color.textPlaceholder70};
  font-size: 13px;

  svg {
    margin-top: 2px;
  }
`;

// export const SubticketRow = styled.tr`
//   background-color: #fafafa;
// `;

// export const SubticketCell = styled.td<{ $align?: 'left' | 'center' | 'right' }>`
//   padding: 12px 20px;
//   color: ${color.textPrimary};
//   font-size: 14px;
//   text-align: ${({ $align }) => $align ?? 'left'};
//   vertical-align: middle;
//   position: relative;

//   &:first-child::before {
//     content: '';
//     position: absolute;
//     left: 32px;
//     top: 0px;
//     bottom: 0px;
//     width: 1px;
//     background-color: ${color.teal500};
//   }
// `;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }

  &:active {
    background-color: #e5e7eb;
  }
`
