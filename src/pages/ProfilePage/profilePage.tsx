import { useState, useRef, type ChangeEvent } from "react"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import * as S from "./ProfilePage.Style"
import { X } from "lucide-react"
import { POSITION_OPTIONS, DEPARTMENT_OPTIONS } from "@/constants/profileOptions"

interface ProfileData {
  name: string
  email: string
  organization: string
  position: string
  department: string
  profileImage: string | null
  profileImageFile: File | null
}

export const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "이태희",
    email: "tph00300@ajou.co.kr",
    organization: "",
    position: "",
    department: "",
    profileImage: null,
    profileImageFile: null,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setProfile({
        ...profile,
        profileImage: reader.result as string,
        profileImageFile: file,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setProfile({
      ...profile,
      profileImage: null,
      profileImageFile: null,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleCancel = () => {
    console.log("취소 버튼 클릭")
  }

  const handleSave = () => {
    console.log("저장 버튼 클릭", profile)
  }

  // 프로필 이미지가 없을 경우 이니셜 표시
  const getInitial = () => {
    return profile.name ? profile.name.charAt(0) : "?"
  }

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" />
        </S.LNBContainer>

        <S.Content>
          <S.Title>프로필 설정</S.Title>

          <S.FormSection>
            <S.FormRow>
              <S.Label>이름</S.Label>
              <S.InputContainer>
                <S.Input type="text" name="name" value={profile.name} onChange={handleInputChange} />
              </S.InputContainer>
            </S.FormRow>

            <S.Divider />

            <S.FormRow>
              <S.Label>프로필 이미지</S.Label>
              <S.InputContainer>
                <S.ProfileImageSection>
                  <S.ProfileImageContainer onClick={handleImageClick}>
                    {profile.profileImage ? (
                      <S.ProfileImage src={profile.profileImage} alt="프로필 이미지" />
                    ) : (
                      <S.DefaultProfileImage>
                        <span>{getInitial()}</span>
                      </S.DefaultProfileImage>
                    )}
                  </S.ProfileImageContainer>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <S.ImageUploadButton onClick={handleImageClick}>사진 선택</S.ImageUploadButton>

                  {profile.profileImageFile && (
                    <S.FileInfoContainer>
                      <S.FileName>{profile.profileImageFile.name}</S.FileName>
                      <S.RemoveButton onClick={handleRemoveImage}>
                        <X size={16} />
                      </S.RemoveButton>
                    </S.FileInfoContainer>
                  )}
                </S.ProfileImageSection>
              </S.InputContainer>
            </S.FormRow>

            <S.Divider />

            <S.FormRow>
              <S.Label>소속</S.Label>
              <S.InputContainer>
                <S.Input
                  type="text"
                  name="organization"
                  value={profile.organization}
                  onChange={handleInputChange}
                  placeholder="소속 입력"
                />
              </S.InputContainer>
            </S.FormRow>

            <S.Divider />

            <S.FormRow>
              <S.Label>직책</S.Label>
              <S.InputContainer>
                <S.SelectInput name="position" value={profile.position} onChange={handleInputChange}>
                  {POSITION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </S.SelectInput>
              </S.InputContainer>
            </S.FormRow>

            <S.Divider />

            <S.FormRow>
              <S.Label>직무</S.Label>
              <S.InputContainer>
                <S.SelectInput name="department" value={profile.department} onChange={handleInputChange}>
                  {DEPARTMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </S.SelectInput>
              </S.InputContainer>
            </S.FormRow>
            <S.ButtonContainer>
              <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
              <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
            </S.ButtonContainer>
          </S.FormSection>

        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  )
}
