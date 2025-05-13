import styled from "styled-components";
import { color } from "@/styles/color";


export const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 16px;
`;


export const FilterBox = styled.div`
  position: relative;
`;


export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  background-color: white;
  color: ${color.textHeading};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;


export const FilterMenu = styled.div`
  position: absolute;
  top: 100%;  
  left: 0;
  width: 428px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 20px 30px;
`;


export const SearchBox = styled.div`
  flex: 1;
  max-width: 300px;
`;