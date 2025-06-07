import styled from "styled-components"
import { color } from "@/styles/color"

export const Row = styled.tr`
  border-bottom: 1px solid #dee2e6;
  background-color: ${color.white}
  &:hover {
    background-color: #f8f9fa;
  }
  cursor: pointer;
`

export const Cell = styled.td<{ $isCentered?: boolean }>`
  padding: 12px 16px;
  font-size: 13px;
  color: ${color.textHeading};
  white-space: nowrap;
  text-align: ${(props) => (props.$isCentered ? "center" : "left")};
`

export const Description = styled.div`
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Tag = styled.span`
  padding: 2px 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
`

export const VisibilityContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

interface UserAvatarProps {
  color: string
}

export const UserAvatar = styled.div<UserAvatarProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: ${color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`

export const UserName = styled.div`
  font-weight: 400;
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
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  width: 160px;
  padding: 6px;
  align-items: center;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
`

interface DropdownItemProps {
  $active?: boolean
  $danger?: boolean
}

export const DropdownItem = styled.div<DropdownItemProps>`
  padding: 6px;
  height: 40px;
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
