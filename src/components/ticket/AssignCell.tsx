import { useState } from 'react';
import * as S from './AssignCell.Style';
import { AvatarWithName } from './AvatarWithName';

interface Member {
  name: string;
  nickname: string;
  email: string;
  profileUrl?: string;
}

interface Props {
  members: Member[];
}

export const AssigneeCell = ({ members }: Props) => {
  console.log('AssigneeCell 렌더링', members);
  const validMembers = members.filter(m => m && m.name);
  if (!validMembers || validMembers.length === 0) return <span>미지정</span>;
  const [isHovered, setIsHovered] = useState(false);
  const sortedMembers = [...validMembers].sort((a, b) => a.name.localeCompare(b.name));
  const main = sortedMembers[0];
  const others = sortedMembers.slice(1);

  return (
    <S.Wrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <AvatarWithName user={main} />
      {others.length > 0 && <span>외 {others.length}</span>}

      {isHovered && others.length > 0 && (
        <S.HoverList>
          {sortedMembers.map((m, i) => (
            <S.HoverItem key={i}>
              <AvatarWithName user={m} />
            </S.HoverItem>
          ))}
        </S.HoverList>
      )}
    </S.Wrapper>
  );
};
