import { useState } from "react"
import { LocalNavBar } from "@/components/common/navBar/LocalNavBar"
import { GlobalNavBar } from "@/components/common/navBar/GlobalNavBar"
import { ProjectHeader } from "@/components/project/ProjectHeader"
import { ProjectTable } from "@/components/project/ProjectTable"
import type { ProjectData } from "@/types/project"
import * as S from "./ProjectPage.Style"

export const ProjectPage = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const projects: ProjectData[] = [
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
      name: "COMKET_기획",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "개발",
      visibility: "전체 공개",
      owner: "조민혁 [simh3077]",
      memberCount: 23,
      createdBy: "조민혁 [simh3077]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_디자인",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET, 개발",
      visibility: "전체 공개",
      owner: "원혜연 [won980630]",
      memberCount: 456,
      createdBy: "원혜연 [won980630]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET + 2",
      visibility: "전체 공개",
      owner: "오유민 [ka09023]",
      memberCount: 7890,
      createdBy: "오유민 [ka09023]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_FE_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "전체 공개",
      owner: "지토 [chito]",
      memberCount: 456,
      createdBy: "지토 [chito]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_BE_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "개발",
      visibility: "멤버 공개",
      owner: "유재석 [yoojaeseok]",
      memberCount: 23,
      createdBy: "유재석 [yoojaeseok]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_QA",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET, 개발",
      visibility: "멤버 공개",
      owner: "박명수 [parkmyeongsu]",
      memberCount: 1,
      createdBy: "박명수 [parkmyeongsu]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_운영",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET + 2",
      visibility: "멤버 공개",
      owner: "정형돈 [jhd]",
      memberCount: 23,
      createdBy: "정형돈 [jhd]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_통합",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "멤버 공개",
      owner: "노홍철 [norediron]",
      memberCount: 456,
      createdBy: "노홍철 [norediron]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_기획",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "개발",
      visibility: "멤버 공개",
      owner: "라비엔 [lavieenrose]",
      memberCount: 7890,
      createdBy: "라비엔 [lavieenrose]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_디자인",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET, 개발",
      visibility: "전체 공개",
      owner: "이태희 [tph00300]",
      memberCount: 456,
      createdBy: "이태희 [tph00300]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "전체 공개",
      owner: "조민혁 [simh3077]",
      memberCount: 23,
      createdBy: "조민혁 [simh3077]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_FE_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "전체 공개",
      owner: "원혜연 [won980630]]",
      memberCount: 1,
      createdBy: "원혜연 [won980630]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_BE_개발",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "개발",
      visibility: "전체 공개",
      owner: "오유민 [ka09023]",
      memberCount: 23,
      createdBy: "오유민 [ka09023]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_QA",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET, 개발",
      visibility: "전체 공개",
      owner: "지토 [chito]",
      memberCount: 456,
      createdBy: "지토 [chito]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_운영",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "멤버 공개",
      owner: "유재석 [yoojaeseok]",
      memberCount: 7890,
      createdBy: "유재석 [yoojaeseok]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_통합",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "COMKET",
      visibility: "멤버 공개",
      owner: "박명수 [parkmyeongsu]",
      memberCount: 456,
      createdBy: "박명수 [parkmyeongsu]",
      createdAt: "YYYY-MM-DD",
    },
    {
      name: "COMKET_기획",
      id: "projectId",
      description: "프로젝트설명입니다프로젝트설명입니다프로젝트설명입니다",
      tag: "개발",
      visibility: "멤버 공개",
      owner: "정형돈 [jhd]",
      memberCount: 23,
      createdBy: "정형돈 [jhd]",
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
  ]

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
          <ProjectHeader projectCount={projects.length} onSearch={handleSearch} />
          <ProjectTable projects={filteredProjects} />
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  )
}
