import { useState, useEffect } from 'react';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { ProjectHeader } from '@/components/project/ProjectHeader';
import { ProjectTable } from '@/components/project/ProjectTable';
import { EmptyProject } from '@/components/project/EmptyProject';
import { CreateProjectModal } from '@/components/project/CreateProjectModal';
import { ViewProjectModal } from '@/components/project/ViewProjectModal';
import type { ProjectData as ProjectTableData } from '@/types/project';
import type { ProjectData } from '@/components/project/ProjectModal';
import * as S from './ProjectPage.Style';
import { createProject, getAllProjects, editProject } from '@api/Project';
import { formatDate } from '@utils/dateFormat';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useInitializeWorkspace } from '@/hooks/useWorkspace';
import { toast } from 'react-toastify';
import { getWorkspaceMembers } from '@/api/Member';

export const ProjectPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewingProject, setViewingProject] = useState<ProjectData | null>(null);
  const [projects, setProjects] = useState<ProjectTableData[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  useInitializeWorkspace();

  const workspaceId = useWorkspaceStore(s => s.workspaceId);
  const workspaceName = useWorkspaceStore(state => state.workspaceName);

  useEffect(() => {
    if (workspaceId && workspaceName) {
      handleNavigateProject();
    }
  }, [workspaceId, workspaceName]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      (project.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tag || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.admin || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.createdBy || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilters.every(filter => {
      if (filter === 'public') return project.visibility === '전체 공개';
      if (filter === 'private') return project.visibility === '멤버 공개';
      return project.tag.includes(filter);
    });

    return matchesSearch && matchesFilter;
  });

  const handleFilter = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateProject = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleNavigateProject = async () => {
    try {
      const [projectsRes, membersRes] = await Promise.all([
        getAllProjects(workspaceName),
        getWorkspaceMembers(workspaceId),
      ]);

      const profileMap = new Map(
        membersRes.map(m => [m.email, m.profileFileUrl])
      );

      const parsedProjects: ProjectTableData[] = projectsRes.map((project: any) => ({
        id: Number(project.projectId),
        name: project.projectName,
        description: project.projectDescription,
        tag: (project.projectTag || []).join(', '),
        visibility: project.isPublic ? '전체 공개' : '멤버 공개',
        admin: project.adminInfo.name,
        adminProfileFileUrl: profileMap.get(project.adminInfo.email) || '',
        adminInfo: project.adminInfo,
        createdBy: '알 수 없음',
        createdAt: formatDate(project.createTime),
      }));
      setProjects(parsedProjects);
      console.log("ddddddddddddddd", parsedProjects)
    } catch (error) {
      console.error('프로젝트 조회 실패:', error);
      setProjects([]);
    }
  };

  const handleViewProject = (projectId: number) => {
    const project = projects.find(p => Number(p.id) === projectId);
    if (project) {
      setViewingProject({
        id: Number(project.id),
        name: project.name,
        description: project.description,
        tags: project.tag.split(', '),
        isPublic: project.visibility === '전체 공개',
      });
    }
  };

  const handleCloseViewModal = () => {
    setViewingProject(null);
  };

  const handleCreateProjectSubmit = async (projectData: ProjectData) => {
    try {
      await createProject(workspaceName, {
        name: projectData.name,
        description: projectData.description,
        isPublic: projectData.isPublic,
        tags: projectData.tags,
        profile_file_id: null,
      });

      await handleNavigateProject();
      setSearchQuery('');
      setSelectedFilters([]);
      setShowCreateModal(false);
      toast.success('프로젝트 생성이 완료되었습니다.');
    } catch (error) {
      console.error('프로젝트 생성 실패:', error);
      throw error;
    }
  };

  const handleUpdateProjectSubmit = async (projectId: number, updatedData: ProjectData) => {
    try {
      if (!workspaceName) throw new Error('워크스페이스 이름이 없습니다.');

      await editProject(workspaceName, projectId, {
        name: updatedData.name,
        description: updatedData.description,
        isPublic: updatedData.isPublic,
        profile_file_id: null,
        tags: updatedData.tags,
      });

      setProjects(prev =>
        prev.map(p =>
          p.id === projectId
            ? {
              ...p,
              name: updatedData.name,
              description: updatedData.description,
              tag: updatedData.tags.join(', '),
              visibility: updatedData.isPublic ? '전체 공개' : '멤버 공개',
            }
            : p,
        ),
      );
      setViewingProject(null);
    } catch (err) {
      console.error('프로젝트 수정 실패:', err);
    }
  };

  const handleDeleteProject = (deletedId: number) => {
    setProjects(prev => prev.filter(project => project.id !== deletedId));
  };

  const hasProjects = projects.length > 0;
  const hasSearchResults = filteredProjects.length > 0;

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="project" onNavigateProject={handleNavigateProject} />
        </S.LNBContainer>

        <S.Content>
          <ProjectHeader
            projectCount={projects.length}
            onSearch={handleSearch}
            onCreateProject={handleCreateProject}
            onFilter={handleFilter}
          />
          {!hasProjects ? (
            <EmptyProject onCreateProject={handleCreateProject} />
          ) : hasSearchResults ? (
            <ProjectTable
              projects={filteredProjects}
              onViewProject={handleViewProject}
              onDeleteProject={handleDeleteProject}
            />
          ) : null}
        </S.Content>
      </S.MainContainer>

      {showCreateModal && (
        <CreateProjectModal
          onClose={handleCloseCreateModal}
          onConfirm={handleCreateProjectSubmit}
        />
      )}
      {viewingProject && (
        <ViewProjectModal
          projectId={viewingProject.id}
          projectData={viewingProject}
          isAdmin={true}
          onSubmit={handleUpdateProjectSubmit}
          onClose={handleCloseViewModal}
        />
      )}
    </S.PageContainer>
  );
};
