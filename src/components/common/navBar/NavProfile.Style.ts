import styled from "styled-components";
import { color } from "@/styles/color";
import type { UserStatus } from "./NavProfile"

export const ProfileContainer = styled.div`
  width: 150px;
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;
`

export const AvatarContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover .avatar-overlay {
    opacity: 1;
  }
`

export const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400px;
  font-size: 14px;
  overflow: hidden;
`

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
`

export const UserInfo = styled.div`
  margin-left: 12px;
  flex: 1;
`

export const UserName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${color.textPrimary};
  margin: 0;
`

export const UserStatusContainer = styled.div`
  font-size: 12px;
  color: ${color.textLabel};
  display: flex;
  align-items: center;
  margin-top: 5px;
`

export const StatusIndicator = styled.span<{ $status: UserStatus }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;

  background-color: ${(props) => {
    switch (props.$status) {
      case "온라인":
        return `${color.success}`
      case "오프라인":
        return `${color.basic300}`
      case "자리 비움":
        return `${color.warning}`
      case "다른 용무 중":
        return `${color.error}`
      default:
        return "#9ca3af"
    }
  }};
`

export const StatusText = styled.span`
  display: inline-block;
`

export const FileInput = styled.input`
  display: none;
`
