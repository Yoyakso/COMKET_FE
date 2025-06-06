import { useState, useRef, type ChangeEvent, useEffect } from 'react';
import * as S from './profilePage.Style';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { X } from 'lucide-react';
import { POSITION_OPTIONS, DEPARTMENT_OPTIONS } from '@/constants/profileOptions';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { updateProfile, getMyProfile } from '@/api/Member';
import { uploadProfileImage } from '@/api/Workspace';
import { useUserStore } from '@/stores/userStore';
import { toast } from 'react-toastify';

interface ProfileData {
  name: string;
  email: string;
  organization: string;
  position: string;
  department: string;
  profileImage: string | null;
  profileImageFile: File | null;
}

export const ProfilePage = () => {
  const globalName = useUserStore(s => s.name);
  const globalEmail = useUserStore(s => s.email);
  const globalProfileImage = useUserStore(s => s.profileFileUrl);
  // const workspaceId = useWorkspaceStore(s => s.workspaceId);
  // const setMyProfileFor = useWorkspaceStore(s => s.setMyProfileFor);
  const setProfileInfo = useUserStore(s => s.setProfileInfo);

  const [profile, setProfile] = useState<ProfileData>({
    name: globalName,
    email: globalEmail,
    organization: '',
    position: '',
    department: '',
    profileImage: globalProfileImage || null,
    profileImageFile: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initialProfile, setInitialProfile] = useState<ProfileData | null>(null);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const res = await getMyProfile();
        console.log('불러온 프로필 정보:', res);

        setProfileInfo({
          name: res.realName ?? '',
          profileFileUrl: res.profileFileUrl ?? '',
        });

        // if (workspaceId !== null) {
        //   setMyProfileFor(workspaceId, {
        //     name: res.realName ?? '',
        //     email: res.email ?? '',
        //     profileFileUrl: res.profileFileUrl ?? '',
        //     role: res.role ?? '',
        //     position: res.department ?? '',
        //   });
        // }

        const fetched: ProfileData = {
          name: res.realName ?? '',
          email: res.email ?? '',
          organization: res.responsibility ?? '',
          position: res.role ?? '',
          department: res.department ?? '',
          profileImage: res.profileFileUrl ?? null,
          profileImageFile: null,
        };

        setProfile(fetched);
        setInitialProfile(fetched);
      } catch (err) {
        console.error('프로필 정보 불러오기 실패:', err);
      }
    };

    fetchLatestProfile();
  }, [setProfileInfo]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile(prev => ({
        ...prev,
        profileImage: reader.result as string,
        profileImageFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfile(prev => ({
      ...prev,
      profileImage: null,
      profileImageFile: null,
    }));
    resetFileInput();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (!initialProfile) return;
    setProfile({ ...initialProfile });
    resetFileInput();
    toast.error('변경 사항을 취소했습니다.');
  };

  const handleSave = async () => {
    try {
      let fileId: number | null = null;

      if (profile.profileImageFile) {
        const { fileId: uploadedId } = await uploadProfileImage(
          profile.profileImageFile,
          'MEMBER_PROFILE',
        );
        fileId = uploadedId;
        console.log('업로드된 파일 ID:', fileId);
      }

      await updateProfile({
        real_name: profile.name,
        department: profile.department || '',
        role: profile.position || '',
        responsibility: profile.organization || '',
        profile_file_id: fileId,
      });

      const updated = await getMyProfile();

      // 상태 일괄 업데이트
      const updatedProfile: ProfileData = {
        name: updated.realName ?? '',
        email: updated.email ?? '',
        organization: updated.responsibility ?? '',
        position: updated.role ?? '',
        department: updated.department ?? '',
        profileImage: updated.profileFileUrl ?? null,
        profileImageFile: null,
      };

      setProfile(updatedProfile);
      setInitialProfile(updatedProfile);

      setProfileInfo({
        name: updated.realName,
        profileFileUrl: updated.profileFileUrl ?? '',
      });

      // if (workspaceId !== null) {
      //   setMyProfileFor(workspaceId, {
      //     name: updated.realName ?? '',
      //     email: updated.email ?? '',
      //     profileFileUrl: updated.profileFileUrl ?? '',
      //     role: updated.role ?? '',
      //     position: updated.department ?? '',
      //   });
      // }

      toast.success('프로필 수정이 완료되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error?.response || error);
      toast.error('프로필 저장 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const getInitial = () => {
    return profile.name ? profile.name.charAt(0) : '?';
  };

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
          <S.TitleSection>
            <S.Title>프로필 설정</S.Title>
            <S.Description>각 워크스페이스에서 나만의 프로필을 만들 수 있어요.</S.Description>
          </S.TitleSection>

          <S.FormSection>
            <S.FormRow>
              <S.Label>이름</S.Label>
              <S.InputContainer>
                <S.Input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />
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
                    style={{ display: 'none' }}
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
              <S.Label>직무</S.Label>
              <S.InputContainer>
                <S.SelectInput
                  name="department"
                  value={profile.department}
                  onChange={handleInputChange}
                >
                  {DEPARTMENT_OPTIONS.map(option => (
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
  );
};
