import styled from "styled-components";
import { color } from "@/styles/color";
export const Wrapper = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 5px;

`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  color: ${color.textPrimary};

`
export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color:${color.textTertiary};


`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ViewTabs = styled.div`
  display: flex;
  gap: 8px;
`;

export const ViewTabBar = styled.div`
  display: flex;
  height: 48px;
  gap: 12px;
  border-bottom: 1px solid #e5e7eb;
  padding-left: 24px;
`;

export const ViewTab = styled.button<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  gap: 2px;
  padding: 0px 16px ;
  font-size: 14px;
  font-weight: 500;
  color: ${color.textHeading};
  border: none;
  background: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? `${color.teal500}` : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    stroke-width: 1.8;
  }

  &:hover {
    color: ${color.teal500};
  }
`;
