import styled from "styled-components"
import { color } from "@/styles/color"
import { Search } from "@/components/common/search/Search"

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: white;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const LogoText = styled.span`
  font-family: "Lexend";
  font-weight: 800;
  font-size: 22px;
  color: #202632;
  letter-spacing: -1.2px;
`
export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

export const NavLink = styled.a`
  color: ${color.textPrimary};
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    color:${color.teal600};
  }
`

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const LoginButton = styled.button`
  width: 108px;
  height: 40px;
  background: none;
  border: 1px solid #9BA8C63D;
  padding: 9px 12px;
  font-size: 14px;
  color: &{color.textSecondary};
  cursor: pointer;
  border-radius: 3px;
  
  &:hover {
    background-color: #9BA8C63D;
  }
`

export const StartButton = styled.button`
  background-color: ${color.teal500};
  width: 108px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 9px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${color.teal700};
  }
`

export const IconContainer = styled.div`
  display: flex;
  gap: 12px;
`

export const SearchContainter = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

export const StyledSearch = styled(Search)`
  width: 100%; /* 부모의 400px에 맞춰짐 */
  padding: 0;
  margin: 0;
  border: none;
  box-sizing: border-box;

  & > * {
    width: 100%;
    box-sizing: border-box;
  }
`
