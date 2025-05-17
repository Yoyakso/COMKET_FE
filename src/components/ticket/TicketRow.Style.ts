import styled from 'styled-components';
import { color } from '@/styles/color';

export const TableRow = styled.tr`
  border-bottom: 1px solid ${color.textPlaceholder24};
  height: 52px;
  &:hover {
    background-color: ${color.textPlaceholder08};
  }
`;

export const TableCell = styled.td<{ $align?: 'left' | 'center' | 'right' }>`
  padding: 12px 20px;
  color: ${color.textPrimary};
  font-size: 14px;
  text-align: ${({ $align }) => $align ?? 'left'};
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  vertical-align: middle;
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
  width: 16px;
  height: 16px;

  &:hover {
    color: ${color.primary};
  }
`;

export const ToggleButtonPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  visibility: hidden;
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

export const SubticketRow = styled.tr`
  background-color: #fafafa;
`;

export const SubticketCell = styled.td<{ $align?: 'left' | 'center' | 'right' }>`
  padding: 12px 20px;
  color: ${color.textPrimary};
  font-size: 14px;
  text-align: ${({ $align }) => $align ?? 'left'};
  vertical-align: middle;
  position: relative;

  &:first-child::before {
    content: '';
    position: absolute;
    left: 32px;
    top: 0px;
    bottom: 0px;
    width: 1px;
    background-color: ${color.teal500};
  }
`;
