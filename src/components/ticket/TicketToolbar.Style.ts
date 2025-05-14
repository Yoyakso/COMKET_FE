import styled from "styled-components";
import { color } from "@/styles/color";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px 0;
`;

export const RightSection = styled.div`
  display: flex;  
  align-items: center;
  gap: 16px;
  
  `

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
  right: 50%;
  width: 450px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 20px 30px 10px 30px;
`;

export const FilterBadge = styled.div`
  margin-left: 6px;
  background-color: ${color.teal100};
  color: ${color.textPrimary};
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const BulkActionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;


export const BulkButton = styled.button`
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  color: ${color.textHeading};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const SearchBox = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  justify-content: flex-end;
`;
