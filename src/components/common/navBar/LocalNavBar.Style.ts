import styled from "styled-components";
import { color } from "@/styles/color";

export const NavContainer = styled.div<{ $variant: "default" | "settings" }>`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100vh;
  border-right: 1px solid #9BA8C63D;
  background-color: ${color.white};
`;

export const NavContent = styled.div`
  flex: 1;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const SectionContainer = styled.div`
  padding: 16px 12px;
`;

export const SectionTitle = styled.div`
  padding: 12px;
  font-size: 13px;
  font-weight: 500;
  color: #A7ADB5;
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
  color: ${(props) => (props.$active ? `${color.textPrimary}` : `${color.textSecondary}`)};
  background-color: ${(props) => (props.$active ? `${color.neutral}` : "transparent")};
  border-radius: 3px;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  text-decoration: none;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

export const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
`

export const NavProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  width: 100%;
  padding: 10px 24px;
`;

export const IconContainer = styled.div`
  cursor: pointer;
`;