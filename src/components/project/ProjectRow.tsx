import { useState, useEffect } from "react"
import * as S from "./ProjectRow.Style"
import type { ProjectData } from "@/types/project"
import { ChevronDown, DotIcon } from "@assets/icons"
import { ProjectMemberModal } from "./ProjectMemberModal"
import { RemoveProjectModal } from "./RemoveProjectModal"
import { deleteProject } from "@/api/Project"
import { toast } from "react-toastify"

interface ProjectRowProps {
  project: ProjectData
  onViewProject?: (projectId: number) => void
  onDeleteProject?: (projectId: number) => void
}

export const ProjectRow = ({ project, onViewProject, onDeleteProject }: ProjectRowProps) => {
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false)
  const [currentVisibility, setCurrentVisibility] = useState(project.visibility)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const visibilityOptions = ["전체 공개", "멤버 공개"]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-menu")) {
        setActiveDropdownId(null)
        setShowVisibilityDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleRowClick = () => {
    if (onViewProject) {
      onViewProject(Number(project.id))
    }
  }

  const toggleActionDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setShowVisibilityDropdown(false)
    setActiveDropdownId((prevId) => (prevId === id ? null : id))
  }

  const toggleVisibilityDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowVisibilityDropdown(!showVisibilityDropdown)
    setActiveDropdownId(null)
  }

  const handleVisibilityChange = (visibility: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentVisibility(visibility as '전체 공개' | '멤버 공개')
    setShowVisibilityDropdown(false)
  }

  const handleEditProject = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onViewProject) {
      onViewProject(Number(project.id))
    }
    setActiveDropdownId(null)
  }

  const handleManageMembers = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMemberModal(true)
    setActiveDropdownId(null)
  }

  const closeMemberModal = () => {
    setShowMemberModal(false)
  }

  const handleSaveMembers = async () => {
    // 여기에 멤버 저장 로직 구현
    console.log("멤버 저장 로직 실행")
    await new Promise((resolve) => setTimeout(resolve, 1000)) // 저장 시뮬레이션
    return Promise.resolve()
  }

  const getUserAvatar = (userName: string) => {
    const colors = ["#4dabf7", "#748ffc", "#69db7c", "#ffa8a8", "#ffa94d", "#ffe066", "#63e6be", "#ff8787"]
    const randomIndex = Math.floor(Math.random() * colors.length) // 랜덤 인덱스 생성
    const color = colors[randomIndex]

    return { color }
  }

  const ownerAvatar = getUserAvatar(project.owner)
  const creatorAvatar = getUserAvatar(project.createdBy)

  const openRemoveModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRemoveModalOpen(true)
    setActiveDropdownId(null)
  }

  const closeRemoveModal = () => {
    setIsRemoveModalOpen(false)
  }

  const handleRemoveProject = async () => {
    try {
      const workspaceName = localStorage.getItem("workspaceName")
      if (!workspaceName) throw new Error("워크스페이스가 없습니다.")

      await deleteProject(workspaceName, Number(project.id))
      setIsRemoveModalOpen(false)

      if (onDeleteProject) {
        onDeleteProject(Number(project.id))
      }
      toast.success("프로젝트가 삭제되었습니다.")
    } catch (error) {
      console.error("프로젝트 제거 중 오류 발생:", error)
      alert("프로젝트 삭제에 실패했습니다: " + (error?.response?.data?.message || error.message))
    }
  }

  return (
    <>
      <S.Row onClick={handleRowClick}>
        <S.Cell>{project.name}</S.Cell>
        <S.Cell>{project.id}</S.Cell>
        <S.Cell>
          <S.Description>{project.description}</S.Description>
        </S.Cell>
        <S.Cell>
          <S.Tag>{project.tag}</S.Tag>
        </S.Cell>
        <S.Cell onClick={(e) => e.stopPropagation()}>
          <S.VisibilityContainer onClick={toggleVisibilityDropdown}>
            <span>{currentVisibility}</span>
            <ChevronDown width={16} height={16} />

            {showVisibilityDropdown && (
              <S.DropdownMenu className="dropdown-menu">
                {visibilityOptions.map((option) => (
                  <S.DropdownItem
                    key={option}
                    $active={currentVisibility === option}
                    onClick={(e) => handleVisibilityChange(option, e)}
                  >
                    {option}
                  </S.DropdownItem>
                ))}
              </S.DropdownMenu>
            )}
          </S.VisibilityContainer>
        </S.Cell>
        <S.Cell>
          <S.UserInfo>
            <S.UserAvatar color={ownerAvatar.color}></S.UserAvatar>
            <S.UserName>{project.owner}</S.UserName>
          </S.UserInfo>
        </S.Cell>
        <S.Cell>
          <S.UserInfo>
            <S.UserAvatar color={creatorAvatar.color}></S.UserAvatar>
            <S.UserName>{project.createdBy}</S.UserName>
          </S.UserInfo>
        </S.Cell>
        <S.Cell>{project.createdAt}</S.Cell>
        <S.Cell $isCentered onClick={(e) => e.stopPropagation()}>
          <S.ActionButtonContainer>
            <S.ActionButton onClick={(e) => toggleActionDropdown(project.id.toString(), e)}>
              <DotIcon />
            </S.ActionButton>

            {activeDropdownId === project.id.toString() && (
              <S.DropdownMenu className="dropdown-menu">
                <S.DropdownItem onClick={handleEditProject}>프로젝트 정보 수정</S.DropdownItem>
                <S.DropdownItem onClick={handleManageMembers}>프로젝트 멤버 관리</S.DropdownItem>
                <S.DropdownItem $danger onClick={openRemoveModal}>
                  프로젝트 삭제
                </S.DropdownItem>
              </S.DropdownMenu>
            )}
          </S.ActionButtonContainer>
        </S.Cell>
      </S.Row>
      {showMemberModal && (
        <ProjectMemberModal projectId={Number(project.id)} projectName={project.name} onClose={closeMemberModal} onSave={handleSaveMembers} />
      )}
      {isRemoveModalOpen && (
        <RemoveProjectModal onClose={closeRemoveModal} onConfirm={handleRemoveProject} projectId={Number(project.id)} />
      )}
    </>
  )
}
