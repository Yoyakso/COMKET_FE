import * as S from './AvatarWithName.Style';
import { getColorFromString } from '@/utils/avatarColor';

interface AvatarWithNameProps {
  user: {
    name: string;
    nickname: string;
    profileFileUrl?: string;
    email: string;
  };
}

export const AvatarWithName = ({ user }: AvatarWithNameProps) => {
  const firstLetter = user.name.charAt(0);

  return (
    <S.Container>
      {user.profileFileUrl ? (
        <S.AvatarImage
          src={user.profileFileUrl}
          alt={`${user.email}의 프로필`}
          width={'20px'}
          height={'20px'}
        />
      ) : (
        <S.AvatarFallback
          style={{ backgroundColor: getColorFromString(user.email), width: '20px', height: '20px' }}
        >
          {firstLetter}
        </S.AvatarFallback>
      )}
      <S.TextGroup>
        <S.Name>{user.name}</S.Name>
        <S.Nickname>[{user.email.split('@')[0]}]</S.Nickname>
      </S.TextGroup>
    </S.Container>
  );
};
