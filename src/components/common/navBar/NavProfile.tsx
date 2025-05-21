import { useState, useEffect } from 'react';
import * as S from './NavProfile.Style';
import { useUserStore } from '@/stores/userStore';
import { useUserStatusStore } from '@/stores/userStatusStore';

export type UserStatus = '온라인' | '오프라인' | '자리 비움' | '다른 용무 중';

export interface NavProfileProps {
  name: string;
  defaultImage?: string;
  onImageChange?: (image: string) => void;
}

export function NavProfile({ name, defaultImage }: NavProfileProps) {
  const email = useUserStore(state => state.email);
  const status = useUserStatusStore(state => state.statusMap[email] || '온라인');
  const [image, setImage] = useState(defaultImage);
  const profileImg = useUserStore(state => state.profileFileUrl);

  useEffect(() => {
    if (profileImg) setImage(profileImg);
  }, [profileImg]);

  return (
    <S.ProfileContainer>
      <S.AvatarContainer>
        <S.Avatar>
          {profileImg || image ? (
            <S.AvatarImage src={profileImg || image} alt={name ?? '프로필 이미지'} />
          ) : (
            (name?.slice?.(0, 2) ?? '??')
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
  );
}
