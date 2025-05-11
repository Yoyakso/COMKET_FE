import { useState, useEffect } from "react"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import { ProjectHeader } from "@/components/project/ProjectHeader"
import { ProjectTable } from "@/components/project/ProjectTable"
import { EmptyProject } from "@/components/project/EmptyProject"
import { CreateProjectModal } from "@/components/project/CreateProjectModal"
import { ViewProjectModal } from "@/components/project/ViewProjectModal"
import type { ProjectData as ProjectTableData } from "@/types/project"
import type { ProjectData } from "@/components/project/ProjectModal"
import * as S from "./ProjectPage.Style"
import { createProject, getAllProjects } from "@api/Project"
import { formatDate } from "@utils/dateFormat"

export const ProjectPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [viewingProject, setViewingProject] = useState<ProjectData | null>(null)
  const [projects, setProjects] = useState<ProjectTableData[]>([])

  useEffect(() => {
    handleNavigateProject();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      (project.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tag || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.owner || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.createdBy || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCreateProject = () => {
    setShowCreateModal(true)
  }

  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
  }

  const handleNavigateProject = async () => {
    try {
      const data = await getAllProjects();

      const parsedProjects: ProjectTableData[] = data.map((project: any) => ({
        id: project.projectId,
        name: project.projectName,
        description: project.projectDescription,
        tag: "",
        visibility: project.isPublic ? "전체 공개" : "멤버 공개",
        owner: "알 수 없음",
        createdBy: "알 수 없음",
        memberCount: 1, // 예시로 1명, 실제 백엔드에 따라 조정
        createdAt: formatDate(project.createTime),
      }));

      setProjects(parsedProjects);
    } catch (error) {
      console.error("프로젝트 조회 실패:", error);
      setProjects([]);
    }
  };

  const handleViewProject = (projectId: string) => {
    // 프로젝트 ID로 프로젝트 찾기
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      // ProjectData 형식으로 변환
      setViewingProject({
        name: project.name,
        description: project.description,
        tags: project.tag.split(", "),
        isPublic: project.visibility === "전체 공개",
      })
    }
  }

  const handleCloseViewModal = () => {
    setViewingProject(null)
  }

  const handleCreateProjectSubmit = async (projectData: ProjectData) => {
    try {
      const response = await createProject({
        name: projectData.name,
        description: projectData.description,
        isPublic: projectData.isPublic,
        profile_file_id: null,
      });

      const newProject: ProjectTableData = {
        id: response.projectId,
        name: response.projectName,
        description: response.projectDescription,
        tag: projectData.tags.join(", "),
        visibility: response.isPublic ? "전체 공개" : "멤버 공개",
        owner: "알 수 없음",
        memberCount: 1, // 예시로 1명, 실제 백엔드에 따라 조정
        createdBy: "알 수 없음",
        createdAt: formatDate(response.createTime),
      };

      setProjects([newProject, ...projects]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
      throw error;
    }
  };

  const hasProjects = projects.length > 0
  const hasSearchResults = filteredProjects.length > 0

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" onNavigateProject={handleNavigateProject} />
        </S.LNBContainer>

        <S.Content>
          <ProjectHeader projectCount={projects.length} onSearch={handleSearch} onCreateProject={handleCreateProject} />

          {!hasProjects ? (
            <EmptyProject onCreateProject={handleCreateProject} />
          ) : !hasSearchResults ? (
            <S.NoResultsContainer>
              <S.NoResultsText>
                검색 결과가 없습니다.<br />
                입력한 검색어를 다시 한 번 확인해 주세요.
              </S.NoResultsText>
            </S.NoResultsContainer>
          ) : (
            <ProjectTable projects={filteredProjects} onViewProject={handleViewProject} />
          )}
        </S.Content>


      </S.MainContainer>

      {showCreateModal && <CreateProjectModal onClose={handleCloseCreateModal} onConfirm={handleCreateProjectSubmit} />}
      {viewingProject && <ViewProjectModal projectData={viewingProject} onClose={handleCloseViewModal} />}
    </S.PageContainer>
  )
}
