import { useState, useEffect } from "react"
import * as S from "./NavProfile.Style"
import { useUserStore } from "@/stores/userStore"

export type UserStatus = "온라인" | "오프라인" | "자리 비움" | "다른 용무 중"

export interface NavProfileProps {
  name: string
  defaultImage?: string
  status?: UserStatus
  onImageChange?: (image: string) => void
}

export function NavProfile({
  name,
  defaultImage,
  status,
}: NavProfileProps) {
  const [image, setImage] = useState(defaultImage)
  const profileImg = useUserStore((state) => state.profileFileUrl)

  useEffect(() => {
    if (profileImg) setImage(profileImg)
  }, [profileImg])

  return (
    <S.ProfileContainer>
      <S.AvatarContainer>
        <S.Avatar>
          {profileImg || image ? (
            <S.AvatarImage src={profileImg || image} alt={name ?? '프로필 이미지'} />
          ) : (
            name?.slice?.(0, 2) ?? "??"
          )}
        </S.Avatar>
      </S.AvatarContainer>

      <S.UserInfo>
        <S.UserName>{name}</S.UserName>
        <S.UserStatusContainer>
          <S.StatusIndicator $status={status} />
          <S.StatusText>{status}</S.StatusText>
        </S.UserStatusContainer>
      </S.UserInfo>

    </S.ProfileContainer>
  )
}
