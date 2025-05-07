import { useState } from "react"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import { ProjectHeader } from "@/components/project/ProjectHeader"
import { ProjectTable } from "@/components/project/ProjectTable"
import { EmptyProjectState } from "@/components/project/EmptyProject"
import { CreateProjectModal } from "@/components/project/CreateProjectModal"
import type { ProjectData } from "@/types/project"
import * as S from "./ProjectPage.Style"

export const ProjectPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      name: "COMKET_통합",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "전체 공개",
      owner: "이태희 [tph00300]",
      memberCount: 1,
      createdBy: "이태희 [tph00300]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_디자인",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET, 개발",
      visibility: "멤버 공개",
      owner: "노홍철 [norediron]",
      memberCount: 1,
      createdBy: "노홍철 [norediron]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "멤버 공개",
      owner: "라비엔 [lavieenrose]",
      memberCount: 23,
      createdBy: "라비엔 [lavieenrose]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_FE_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "멤버 공개",
      owner: "유재석 [yoojaeseok]",
      memberCount: 1,
      createdBy: "이태희 [tph00300]",
      createdAt: "YYYY-MM-DD",
    },

  ])

  // 검색 필터링 로직
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.createdBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCreateProject = () => {
    setShowCreateModal(true)
  }

  const handleCloseModal = () => {
    setShowCreateModal(false)
  }

  const handleCreateProjectSubmit = async (projectData: {
    name: string
    description: string
    tags: string[]
    isPublic: boolean
  }) => {
    try {
      // 실제 구현에서는 API 호출로 프로젝트 생성
      console.log("프로젝트 생성 데이터:", projectData)

      // API 호출 시뮬레이션 (2초 지연)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 새 프로젝트 객체 생성
      const newProject: ProjectData = {
        id: `project-${Date.now()}`,
        name: projectData.name,
        description: projectData.description,
        tag: projectData.tags.join(", "), // 태그 배열을 쉼표로 구분된 문자열로 변환
        visibility: projectData.isPublic ? "전체 공개" : "멤버 공개",
        owner: "현재 사용자 [userId]", // 실제 구현에서는 현재 로그인한 사용자 정보 사용
        memberCount: 1,
        createdBy: "현재 사용자 [userId]", // 실제 구현에서는 현재 로그인한 사용자 정보 사용
        createdAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD 형식
      }

      setProjects([newProject, ...projects])

      setShowCreateModal(false)
    } catch (error) {
      console.error("프로젝트 생성 중 오류 발생:", error)
      throw error
    }
  }

  const hasProjects = projects.length > 0
  const hasSearchResults = filteredProjects.length > 0

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" />
        </S.LNBContainer>

        <S.Content>
          <ProjectHeader projectCount={projects.length} onSearch={handleSearch} onCreateProject={handleCreateProject} />

          {/* 프로젝트가 없는 경우 빈 상태 UI 표시 */}
          {!hasProjects ? (
            <EmptyProjectState onCreateProject={handleCreateProject} />
          ) : !hasSearchResults ? (
            // 프로젝트는 있지만 검색 결과가 없는 경우
            <S.NoResultsContainer>
              <S.NoResultsText>검색 결과가 없습니다.</S.NoResultsText>
            </S.NoResultsContainer>
          ) : (
            // 프로젝트가 있고 검색 결과도 있는 경우 테이블 표시
            <ProjectTable projects={filteredProjects} />
          )}
        </S.Content>
      </S.MainContainer>

      {/* 프로젝트 생성 모달 */}
      {showCreateModal && <CreateProjectModal onClose={handleCloseModal} onConfirm={handleCreateProjectSubmit} />}
    </S.PageContainer>
  )
}
