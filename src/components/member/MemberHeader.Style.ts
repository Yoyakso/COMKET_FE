import styled from "styled-components"
import { color } from "@/styles/color"

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
`

export const MemberCount = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${color.teal500};
  padding: 12px 0;

`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
`

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 260px;
  height: 40px;
`

export const InviteButton = styled.button`
  padding: 9x 12px;
  width: 76px;
  height: 40px;
  background-color: ${color.teal500};
  color: ${color.white};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${color.teal600};
  }
`


