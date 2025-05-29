import styled from 'styled-components';
import type { Status } from '@/types/filter';

export const STATUS_COLORS: Record<Status, { bg: string; text: string; border: string }> = {
  TODO: { bg: '#F4F4F8', text: '#5F6692', border: '#D6D8E4' },
  IN_PROGRESS: { bg: '#F3F5FF', text: '#3052DF', border: '#CDD6FD' },
  DONE: { bg: '#DBFFF4', text: '#16C390', border: '#97EED4' },
  HOLD: { bg: '#FFEDED', text: '#EF5D5D', border: '#F4BBBB' },
  DROP: { bg: '#E7EAF1', text: '#525964', border: '#CCD3E0' },
  BACKLOG: { bg: '#FCEBE0', text: '#763517', border: '#E1C7B8' },
};

export const Badge = styled.span<{ $status: Status }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ $status }) => STATUS_COLORS[$status].bg};
  color: ${({ $status }) => STATUS_COLORS[$status].text};
  border: 1px solid ${({ $status }) => STATUS_COLORS[$status].border};
  min-width: 80px;
  white-space: nowrap;
  text-align: center;
`;
