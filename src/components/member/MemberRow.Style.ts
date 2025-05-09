import styled from "styled-components"
import { color } from "@/styles/color"

export const Row = styled.tr<{ $isDeleted?: boolean }>`
  border-bottom: 1px solid #E7EAF1;
    color: ${({ $isDeleted }) => ($isDeleted ? "#A0A0A0" : "inherit")};
  opacity: ${({ $isDeleted }) => ($isDeleted ? 0.6 : 1)};
  &:hover {
    background-color: #F7F8FA;
  }
`

export const Cell = styled.td<{ $isCentered?: boolean }>`
  padding: 12px;
  font-size: 13px;
  color: ${color.textPrimary};
  white-space: nowrap;
  text-align: ${(props) => (props.$isCentered ? "center" : "left")};
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

interface UserAvatarProps {
  color: string
}

export const UserAvatar = styled.div<UserAvatarProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
`

export const UserName = styled.div`
  font-weight: 400;
`

export const RoleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

export const RoleDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
  margin-top: 4px;
`

interface RoleDropdownItemProps {
  $active?: boolean
}

export const RoleDropdownItem = styled.div<RoleDropdownItemProps>`
  padding: 12px 8px;
  font-size: 14px;
  color: ${color.textSecondary};
  cursor: pointer;
  height: 40px;
  
  &:hover {
  background-color: ${color.basic100};
}
`

export const ActionButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

export const DropdownMenu = styled.div`
  position: absolute;
  width: 82px;
  height: 54px;
  border-radius: 3px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  display: flex;
  flex-direction: center;
  z-index: 10;
  padding: 6px;
`

interface DropdownItemProps {
  $danger?: boolean
}

export const DropdownItem = styled.div<DropdownItemProps>`
  padding: 6px;
  font-size: 14px;
  width: 100%;
  color: ${(props) => (props.$danger ? `${color.error}` : '')};
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
    
    &:hover {
    background-color: ${color.basic100};
  }
`
