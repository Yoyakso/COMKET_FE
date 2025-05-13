import styled from "styled-components";
import { color } from "@/styles/color";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 428px;
 
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid ${color.textPlaceholder24};
  padding-bottom: 16px;
`;


export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  gap: 10px;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;  
`;
