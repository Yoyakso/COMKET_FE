import styled from 'styled-components';
import { color } from '@/styles/color';
import type { Priority } from '@/types/filter';

export const PRIORITY_COLORS: Record<Priority, string> = {
  HIGH: color.error || '#dc2626',
  MEDIUM: color.warning || '#d97706',
  LOW: color.success || '#10b981',
};

export const Badge = styled.span<{ $priority: Priority }>`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
  height: 24px;
  border-radius: 100px;
  color: ${color.textLabel};
  font-size: 12px;
  font-weight: 500;
  background-color: #F7F8FA;
  white-space: nowrap;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $priority }) => PRIORITY_COLORS[$priority]};
    margin-right: 4px;
    flex-shrink: 0;
  }
`;
