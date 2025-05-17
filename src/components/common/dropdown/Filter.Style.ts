import styled from "styled-components";
import { color } from "@/styles/color";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 428px;
 
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ResetButton = styled.button`
  background: none;
  border: none;
  color: ${color.textPlaceholder70};
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  min-height: 28px;
  line-height: 20px;
  cursor: pointer;

  &:hover {
    color: ${color.textPrimary};
    text-decoration: underline;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid ${color.textPlaceholder24};
  padding: 20px 0px;
`;


export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const FilterSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 24px;
  width: 100%;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;  
`;
