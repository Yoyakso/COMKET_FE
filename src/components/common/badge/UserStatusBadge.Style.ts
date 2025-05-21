import styled from 'styled-components';
import type { UserStatus } from '@/stores/userStatusStore';
import { color } from '@/styles/color';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Indicator = styled.div<{ $status: UserStatus }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.$status) {
      case '온라인':
        return `${color.success}`;
      case '오프라인':
        return `${color.basic300}`;
      case '자리 비움':
        return `${color.warning}`;
      case '다른 용무 중':
        return `${color.error}`;
      default:
        return '#9ca3af';
    }
  }};
`;

export const Text = styled.span`
  font-size: 14px;
  color: #6b7280;
`;
