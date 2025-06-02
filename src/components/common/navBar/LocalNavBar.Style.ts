import styled from 'styled-components';
import { color } from '@/styles/color';

// variant prop은 optional로 처리
export const NavContainer = styled.div<{ $variant?: 'default' | 'settings' }>`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 100vh;
  border-right: 1px solid #9ba8c63d;
  background-color: ${color.white};
  position: relative;
`;

export const NavContent = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
`;

export const SectionContainer = styled.div`
  padding: 16px 12px;
`;

export const SectionTitle = styled.div`
  padding: 12px;
  font-size: 13px;
  font-weight: 500;
  color: #a7adb5;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const NavItemLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  color: ${props => (props.$active ? `${color.textPrimary}` : `${color.textSecondary}`)};
  background-color: ${props => (props.$active ? `${color.neutral}` : 'transparent')};
  border-radius: 3px;
  font-weight: ${props => (props.$active ? '600' : '500')};
  text-decoration: none;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  color: ${color.textPrimary};
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const ProjectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  font-size: 14px;
  color: ${color.textPrimary};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  svg {
    margin-right: 8px;
  }
`;

export const CountBadge = styled.span`
  background-color: #e23e3e;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;
  margin-left: auto;
`;

export const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const NavProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e5e7eb;
  width: 100%;
  height: 80px;
`;

export const IconContainer = styled.div`
  cursor: pointer;
`;

export const ProjectSectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 8px;
`;

export const ProjectSectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #a7adb5;
  cursor: pointer;

  &:hover {
    color: #6b7280;
  }
`;
