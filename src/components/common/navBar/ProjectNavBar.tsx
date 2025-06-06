import * as S from './LocalNavBar.Style';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { Globe, Lock, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllProjects, getMyProjects } from '@/api/Project';
import { getAlarmCountPerProject } from '@/api/Alarm';

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
  const workspaceId = useWorkspaceStore(s => s.workspaceId);

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [alarmCounts, setAlarmCounts] = useState<Record<string, number>>({});

  const [isAllOpen, setAllOpen] = useState(false);
  const [isMyOpen, setMyOpen] = useState(true);

  useEffect(() => {
    if (!name) return;
    localStorage.setItem('workspaceName', name);
    localStorage.setItem('workspaceId', String(workspaceId));

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
        const alarmData = await getAlarmCountPerProject(String(workspaceId));
        const countMap: Record<string, number> = {};
        alarmData.forEach((item: { project_id: number; alarm_count: number }) => {
          countMap[String(item.project_id)] = item.alarm_count;
        });
        setAlarmCounts(countMap);
        console.log('alarmCounts 상태:', countMap);
      } catch (e) {
        console.error('ProjectNavBar 데이터 로드 실패', e);
      }
    })();
  }, [slug]);

  const renderProjectList = (projects: Project[]) =>
    projects.map(p => {
      const count = alarmCounts[p.id] || 0;

      return (
        <S.ProjectItem
          key={p.id}
          title={p.name}
          onClick={() => {
            onNavigateProject?.();
            navigate(`/${p.id}/tickets`);
          }}
          style={{
            backgroundColor: pathname.includes(`/${p.id}/tickets`) ? '#f3f4f6' : 'transparent',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%' }}>
            {p.isPublic ? <Globe size={16} /> : <Lock size={16} />}
            <span>{p.name}</span>

            {count > 0 && <S.CountBadge>{count}</S.CountBadge>}
          </div>
        </S.ProjectItem>
      );
    });

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
    </S.NavContainer>
  );
};
