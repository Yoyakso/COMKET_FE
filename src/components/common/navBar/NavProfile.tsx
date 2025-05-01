import { useState, useRef, type ChangeEvent } from "react"
import * as S from "./NavProfile.Style"
import UploadIcon from "@/assets/icons/UploadIcon.svg?react"

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
  onImageChange,
}: NavProfileProps) {
  const [image, setImage] = useState(defaultImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImage = event.target.result as string
          setImage(newImage)
          onImageChange?.(newImage)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <S.ProfileContainer>
      <S.AvatarContainer onClick={() => fileInputRef.current?.click()}>
        <S.Avatar>
          {image ? (
            <S.AvatarImage src={image} alt={name} />
          ) : (
            name.slice(0, 2) || "사용자"
          )}
        </S.Avatar>
        <S.AvatarOverlay className="avatar-overlay">
          <UploadIcon />
        </S.AvatarOverlay>
        <S.FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} />
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
