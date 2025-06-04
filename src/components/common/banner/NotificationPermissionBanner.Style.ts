import styled from 'styled-components';
import { color } from '@/styles/color';

export const BannerWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  width: 360px;
  background-color: white;
  border-left: 4px solid ${color.teal500};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const BannerContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const IconCircle = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-color: rgb(219, 254, 239);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextBox = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${color.textPrimary};
  margin-top: 7px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  margin-top: 4px;
  font-size: 12px;
  color: ${color.textSecondary};
  line-height: 1.5;
`;

export const ButtonRow = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
  background-color: ${color.teal500};
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${color.teal600};
  }
`;

export const GhostButton = styled.button`
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
  background-color: transparent;
  color: #6b7280;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  flex-shrink: 0;
  color: #9ca3af;

  &:hover {
    color: #6b7280;
  }
`;
