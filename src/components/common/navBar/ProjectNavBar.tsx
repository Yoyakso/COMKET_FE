import * as S from './LocalNavBar.Style';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { NavProfile } from './NavProfile';
import { FolderIcon } from 'lucide-react';

const mockProjects = [
  { id: 'p1', name: '기획', ticketCount: 2 },
  { id: 'p2', name: '디자인', ticketCount: 0 },
];

export const ProjectNavBar = () => {
  const navigate = useNavigate();
  const slug = useWorkspaceStore(s => s.workspaceSlug);
  const name = useWorkspaceStore(s => s.workspaceName);
  const profileFileUrl = useWorkspaceStore(s => s.profileFileUrl);

  return (
    <S.NavContainer>
      <S.SectionTitle>{name}</S.SectionTitle>
      <S.NavItem onClick={() => navigate(`/${slug}/my-tickets`)}>📌 내 티켓</S.NavItem>
      <S.SectionTitle>내 프로젝트</S.SectionTitle>
      {mockProjects.map(p => (
        <S.ProjectItem key={p.id} onClick={() => navigate(`/${slug}/project/${p.id}`)}>
          <FolderIcon size={16} />
          {p.name}
          {p.ticketCount > 0 && <S.Badge>{p.ticketCount}</S.Badge>}
        </S.ProjectItem>
      ))}
      <S.NavItem onClick={() => navigate(`/${slug}/project`)}>📋 전체 프로젝트 보기</S.NavItem>
      <S.Divider />
      <S.NavProfileContainer>
        <NavProfile name={name} defaultImage={profileFileUrl} />
      </S.NavProfileContainer>
    </S.NavContainer>
  );
};
