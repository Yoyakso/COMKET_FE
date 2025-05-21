import styled from 'styled-components';
import { color } from '@/styles/color';

export const CardContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: 0.2s ease all;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

export const ThreadIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
`;

export const Badges = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const DateRange = styled.div`
  font-size: 12px;
  color: #777;
`;

export const Assignee = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 4px;
`;
