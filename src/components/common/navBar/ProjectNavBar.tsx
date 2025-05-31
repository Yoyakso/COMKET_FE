import * as S from './LocalNavBar.Style';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { NavProfile } from './NavProfile';
import { Globe, Lock, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllProjects, getMyProjects } from '@/api/Project';

type Project = {
  id: string;
  name: string;
  isPublic: boolean;
};

interface ProjectNavBarProps {
  onNavigateProject?: () => void;
}

export const ProjectNavBar = ({ onNavigateProject }: ProjectNavBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const slug = useWorkspaceStore(s => s.workspaceSlug);
  const name = useWorkspaceStore(s => s.workspaceName);
  const profileFileUrl = useWorkspaceStore(s => s.profileFileUrl);

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [myProjects, setMyProjects] = useState<Project[]>([]);

  const [isAllOpen, setAllOpen] = useState(true);
  const [isMyOpen, setMyOpen] = useState(false);

  useEffect(() => {
    if (!name) return;
    localStorage.setItem('workspaceName', name);

    (async () => {
      try {
        const all = await getAllProjects(name);
        setAllProjects(
          all.map((p: any) => ({
            id: String(p.projectId),
            name: p.projectName,
            isPublic: p.isPublic,
          })),
        );

        const mine = await getMyProjects();
        setMyProjects(
          mine.map((p: any) => ({
            id: String(p.projectId),
            name: p.projectName,
            isPublic: p.isPublic,
          })),
        );
      } catch (e) {
        console.error('ProjectNavBar 데이터 로드 실패', e);
      }
    })();
  }, [slug]);

  const renderProjectList = (projects: Project[]) =>
    projects.map(p => (
      <S.ProjectItem
        key={p.id}
        title={p.name}
        onClick={() => {
          onNavigateProject?.();
          navigate(`/${slug}/project/${p.id}`);
        }}
        style={{
          backgroundColor: pathname.includes(`/project/${p.id}`) ? '#f3f4f6' : 'transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {p.isPublic ? <Globe size={16} /> : <Lock size={16} />}
          <span>{p.name}</span>
        </div>
      </S.ProjectItem>
    ));

  return (
    <S.NavContainer>
      <S.NavContent>
        <S.SectionContainer>
          <S.SectionTitle>{name}</S.SectionTitle>
          <S.ItemsContainer>
            <S.NavItem onClick={() => navigate(`/${slug}/mytickets`)}>내 티켓 모아보기</S.NavItem>
          </S.ItemsContainer>
        </S.SectionContainer>

        <S.SectionContainer>
          <S.ProjectSectionHeader>
            <S.ProjectSectionTitle onClick={() => setAllOpen(!isAllOpen)}>
              {isAllOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              전체 프로젝트
            </S.ProjectSectionTitle>
          </S.ProjectSectionHeader>
          {isAllOpen && <S.ItemsContainer>{renderProjectList(allProjects)}</S.ItemsContainer>}
        </S.SectionContainer>

        <S.SectionContainer>
          <S.ProjectSectionHeader>
            <S.ProjectSectionTitle onClick={() => setMyOpen(!isMyOpen)}>
              {isMyOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}내 프로젝트
            </S.ProjectSectionTitle>
          </S.ProjectSectionHeader>
          {isMyOpen && <S.ItemsContainer>{renderProjectList(myProjects)}</S.ItemsContainer>}
        </S.SectionContainer>
      </S.NavContent>

      <S.Divider />
      <S.NavProfileContainer>
        <NavProfile name={name} defaultImage={profileFileUrl} />
      </S.NavProfileContainer>
    </S.NavContainer>
  );
};
