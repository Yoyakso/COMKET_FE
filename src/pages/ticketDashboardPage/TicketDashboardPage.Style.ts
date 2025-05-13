import styled from "styled-components";
import { color } from "@/styles/color";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 40px;
  background-color: #f9fafb;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${color.textHeading};
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${color.textSecondary};
  line-height: 1.5;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterBox = styled.div`
  font-size: 14px;
  color: ${color.textLabel};
`;

export const CreateButton = styled.button`
  background-color: ${color.primary};
  color: #fff;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${color.primaryHover};
  }
`;
