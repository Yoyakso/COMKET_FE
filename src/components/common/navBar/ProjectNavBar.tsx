'use client';

import * as S from './LocalNavBar.Style';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { NavProfile } from './NavProfile';
import { FolderIcon, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const mockAllProjects = [
  { id: 'p1', name: '1', ticketCount: 0 },
  { id: 'p2', name: '2', ticketCount: 2 },
  { id: 'p3', name: '3', ticketCount: 0 },
  { id: 'p4', name: '4', ticketCount: 9 },
  { id: 'p5', name: '5', ticketCount: 0 },
  { id: 'p6', name: '6', ticketCount: 3 },
  { id: 'p7', name: '7', ticketCount: 4 },
  { id: 'p8', name: '8', ticketCount: 0 },
];

const mockMyProjects = [
  { id: 'p2', name: '4', ticketCount: 2 },
  { id: 'p3', name: '6', ticketCount: 0 },
  { id: 'p4', name: '8', ticketCount: 9 },
];

interface ProjectNavBarProps {
  onNavigateProject?: () => void;
}

export const ProjectNavBar = ({ onNavigateProject }: ProjectNavBarProps) => {
  const navigate = useNavigate();
  const slug = useWorkspaceStore(s => s.workspaceSlug);
  const name = useWorkspaceStore(s => s.workspaceName);
  const profileFileUrl = useWorkspaceStore(s => s.profileFileUrl);

  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(true);
  const [isMyProjectsOpen, setIsMyProjectsOpen] = useState(false);

  const renderProjectList = (projects: typeof mockAllProjects, selectedProjectId?: string) => {
    return projects.map(project => (
      <S.ProjectItem
        key={project.id}
        onClick={() => {
          onNavigateProject?.();
          navigate(`/${slug}/project/${project.id}`);
        }}
        title={project.name}
        style={{
          backgroundColor: selectedProjectId === project.id ? '#f3f4f6' : 'transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FolderIcon size={16} />
          <span>{project.name}</span>
        </div>
        {project.ticketCount > 0 && (
          <S.Badge>{project.ticketCount > 9 ? '9+' : project.ticketCount}</S.Badge>
        )}
      </S.ProjectItem>
    ));
  };

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
            <S.ProjectSectionTitle onClick={() => setIsAllProjectsOpen(!isAllProjectsOpen)}>
              {isAllProjectsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              전체 프로젝트
            </S.ProjectSectionTitle>
          </S.ProjectSectionHeader>
          {isAllProjectsOpen && (
            <S.ItemsContainer>{renderProjectList(mockAllProjects, 'p3')}</S.ItemsContainer>
          )}
        </S.SectionContainer>

        <S.SectionContainer>
          <S.ProjectSectionHeader>
            <S.ProjectSectionTitle onClick={() => setIsMyProjectsOpen(!isMyProjectsOpen)}>
              {isMyProjectsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}내 프로젝트
            </S.ProjectSectionTitle>
          </S.ProjectSectionHeader>
          {isMyProjectsOpen && (
            <S.ItemsContainer>{renderProjectList(mockMyProjects)}</S.ItemsContainer>
          )}
        </S.SectionContainer>
      </S.NavContent>

      <S.Divider />
      <S.NavProfileContainer>
        <NavProfile name={name} defaultImage={profileFileUrl} />
      </S.NavProfileContainer>
    </S.NavContainer>
  );
};
