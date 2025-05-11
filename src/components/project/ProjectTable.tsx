import { useState } from "react"
import * as S from "./ProjectTable.Style"
import { ProjectRow } from "./ProjectRow"
import type { ProjectData } from "@/types/project"
import { ChevronDown, ChevronUp } from "@assets/icons"

interface ProjectTableProps {
  projects: ProjectData[]
  onViewProject?: (projectId: number) => void
  onDeleteProject?: (projectId: number) => void
}

type SortField =
  | "name"
  | "id"
  | "description"
  | "tag"
  | "visibility"
  | "owner"
  | "memberCount"
  | "createdBy"
  | "createdAt"
type SortDirection = "asc" | "desc"

export const ProjectTable = ({ projects, onViewProject, onDeleteProject }: ProjectTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // 같은 필드를 다시 클릭하면 정렬 방향 전환
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // 다른 필드를 클릭하면 해당 필드로 오름차순 정렬
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronDown width={16} height={16} />
    }
    return sortDirection === "asc" ? <ChevronUp width={16} height={16} /> : <ChevronDown width={16} height={16} />
  }

  const sortedProjects = [...projects].sort((a, b) => {
    if (!sortField) return 0

    let valueA: string | number = ""
    let valueB: string | number = ""

    switch (sortField) {
      case "name":
        valueA = a.name
        valueB = b.name
        break
      case "id":
        valueA = a.id
        valueB = b.id
        break
      case "description":
        valueA = a.description
        valueB = b.description
        break
      case "tag":
        valueA = a.tag
        valueB = b.tag
        break
      case "visibility":
        valueA = a.visibility
        valueB = b.visibility
        break
      case "owner":
        valueA = a.owner
        valueB = b.owner
        break
      case "memberCount":
        valueA = a.memberCount
        valueB = b.memberCount
        break
      case "createdBy":
        valueA = a.createdBy
        valueB = b.createdBy
        break
      case "createdAt":
        valueA = a.createdAt
        valueB = b.createdAt
        break
      default:
        return 0
    }

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  return (
    <S.TableContainer>
      <S.Table>
        <S.TableHeader>
          <S.HeaderRow>
            <S.HeaderCell onClick={() => handleSort("name")}>
              <S.HeaderContent>
                <span>프로젝트 이름</span>
                {getSortIcon("name")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("id")}>
              <S.HeaderContent>
                <span>프로젝트 ID</span>
                {getSortIcon("id")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("description")}>
              <S.HeaderContent>
                <span>프로젝트 설명</span>
                {getSortIcon("description")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("tag")}>
              <S.HeaderContent>
                <span>프로젝트 태그</span>
                {getSortIcon("tag")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("visibility")}>
              <S.HeaderContent>
                <span>공개 범위</span>
                {getSortIcon("visibility")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("owner")}>
              <S.HeaderContent>
                <span>관리자</span>
                {getSortIcon("owner")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("createdBy")}>
              <S.HeaderContent>
                <span>만든 사람</span>
                {getSortIcon("createdBy")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort("createdAt")}>
              <S.HeaderContent>
                <span>생성 일자</span>
                {getSortIcon("createdAt")}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell>관리</S.HeaderCell>
          </S.HeaderRow>
        </S.TableHeader>
        <S.TableBody>
          {sortedProjects.map((project, index) => (
            <ProjectRow
              key={`${project.id}-${index}`}
              project={project}
              onViewProject={onViewProject}
              onDeleteProject={onDeleteProject} />
          ))}
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
  )
}
