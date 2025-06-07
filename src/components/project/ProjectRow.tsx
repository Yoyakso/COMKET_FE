import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import * as S from "./ProjectRow.Style"
import type { ProjectData } from "@/types/project"
import { ChevronDown, DotIcon } from "@assets/icons"
import { ProjectMemberModal } from "./ProjectMemberModal"
import { RemoveProjectModal } from "./RemoveProjectModal"
import { deleteProject, editProject } from "@/api/Project"
import { toast } from "react-toastify"
import { getColorFromString } from "@/utils/avatarColor"
import { useWorkspaceStore } from "@/stores/workspaceStore"

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
  const visibilityOptions = ["전체 공개", "멤버 공개"] as const
  const navigate = useNavigate();
  const workspaceName = useWorkspaceStore((state) => state.workspaceName)

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
    navigate(`/${project.id}/tickets`);
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

  const handleVisibilityChange = async (
    visibility: "전체 공개" | "멤버 공개",
    e: React.MouseEvent
  ) => {
    e.stopPropagation()

    try {
      const isPublic = visibility === "전체 공개"
      setCurrentVisibility(visibility)
      setShowVisibilityDropdown(false)

      await editProject(workspaceName, Number(project.id), {
        name: project.name,
        description: project.description,
        isPublic,
        tags: project.tag ? [project.tag] : [],
        profile_file_id: null,
      })
      toast.success("공개 범위가 변경되었습니다.")
    } catch (err) {
      console.error("공개범위 변경 실패:", err)
      toast.error("공개 범위 변경에 실패했습니다.")
    }
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

  const avatarColor = getColorFromString(project.admin)

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
            <S.UserAvatar color={avatarColor}>
              {project.adminProfileFileUrl ? (
                <img
                  src={project.adminProfileFileUrl}
                  alt={project.admin}
                />
              ) : (
                project.admin?.charAt(0).toUpperCase() ?? "?"
              )}
            </S.UserAvatar>

            <S.UserName>{project.admin}</S.UserName>
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
        <ProjectMemberModal projectId={Number(project.id)} projectName={project.name} onClose={closeMemberModal} />
      )}
      {isRemoveModalOpen && (
        <RemoveProjectModal onClose={closeRemoveModal} onConfirm={handleRemoveProject} projectId={Number(project.id)} />
      )}
    </>
  )
}
