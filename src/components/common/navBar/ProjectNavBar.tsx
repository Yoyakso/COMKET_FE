import * as S from './LocalNavBar.Style';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { NavProfile } from './NavProfile';
import { FolderIcon } from 'lucide-react';

const mockProjects = [
  { id: 'p1', name: '기획', ticketCount: 2 },
  { id: 'p2', name: '디자인', ticketCount: 0 },
];

interface ProjectNavBarProps {
  onNavigateProject?: () => void;
}

export const ProjectNavBar = ({ onNavigateProject }: ProjectNavBarProps) => {
  const navigate = useNavigate();
  const slug = useWorkspaceStore(s => s.workspaceSlug);
  const name = useWorkspaceStore(s => s.workspaceName);
  const profileFileUrl = useWorkspaceStore(s => s.profileFileUrl);

  return (
    <S.NavContainer>
      <S.NavContent>
        <S.SectionContainer>
          <S.SectionTitle>{name}</S.SectionTitle>
          <S.ItemsContainer>
            <S.NavItem onClick={() => navigate(`/${slug}/my-tickets`)}>내 티켓 모아보기</S.NavItem>
          </S.ItemsContainer>
        </S.SectionContainer>

        <S.SectionContainer>
          <S.SectionTitle>내 프로젝트</S.SectionTitle>
          <S.ItemsContainer>
            {mockProjects.map(p => (
              <S.ProjectItem
                key={p.id}
                onClick={() => {
                  onNavigateProject?.();
                  navigate(`/${slug}/project/${p.id}`);
                }}
                title={p.name}
              >
                <FolderIcon size={16} />
                {p.name}
              </S.ProjectItem>
            ))}
          </S.ItemsContainer>
        </S.SectionContainer>
      </S.NavContent>

      <S.Divider />
      <S.NavProfileContainer>
        <NavProfile name={name} defaultImage={profileFileUrl} />
      </S.NavProfileContainer>
    </S.NavContainer>
  );
};
