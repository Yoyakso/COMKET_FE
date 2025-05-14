// src/components/ticket/AvatarWithName.tsx
import * as S from "./AvatarWithName.Style";

interface AvatarWithNameProps {
    user: {
        name: string;
        nickname: string;
        profileUrl?: string;
    };
}

export const AvatarWithName = ({ user }: AvatarWithNameProps) => {
    const firstLetter = user.name.charAt(0);

    return (
        <S.Container>
            {user.profileUrl ? (
                <S.AvatarImage src={user.profileUrl} alt={`${user.name}의 프로필`} />
            ) : (
                <S.AvatarFallback>{firstLetter}</S.AvatarFallback>
            )}
            <S.TextGroup>
                <S.Name>{user.name}</S.Name>
                <S.Nickname>[{user.nickname}]</S.Nickname>
            </S.TextGroup>
        </S.Container>
    );
};
