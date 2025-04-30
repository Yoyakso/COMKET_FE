import styled from "styled-components";
import { color } from "@/styles/color";

export const NavContainer = styled.div<{ $variant: "default" | "settings" }>`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  padding: 16px 20px;
  border-right: 1px solid #9BA8C63D;
  background-color: ${(props) =>
    props.$variant === "settings" ? `${color.basic0}` : "#ffffff"};
`;

export const NavContent = styled.div`
  flex: 1;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const SectionContainer = styled.div`
  padding: 16px 20px;
`;

export const SectionTitle = styled.div`
  padding: 10.5px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #A7ADB5;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavItemLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  color: ${(props) => (props.$active ? "#111827" : "#4b5563")};
  background-color: ${(props) => (props.$active ? "#f3f4f6" : "transparent")};
  font-weight: ${(props) => (props.$active ? "500" : "normal")};
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

export const NavProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

export const IconContainer = styled.div`
  cursor: pointer;
`;