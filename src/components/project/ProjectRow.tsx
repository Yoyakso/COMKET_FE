import { useState, useEffect } from "react"
import * as S from "./ProjectRow.Style"
import type { ProjectData } from "@/types/project"
import { ChevronDown, DotIcon } from "@assets/icons"

interface ProjectRowProps {
  project: ProjectData
}

export const ProjectRow = ({ project }: ProjectRowProps) => {
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false)
  const [currentVisibility, setCurrentVisibility] = useState(project.visibility)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)

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

  const toggleActionDropdown = (id: string) => {
    setShowVisibilityDropdown(false)
    setActiveDropdownId((prevId) => (prevId === id ? null : id))
  }

  const toggleVisibilityDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowVisibilityDropdown(!showVisibilityDropdown)
    setActiveDropdownId(null)
  }

  const handleVisibilityChange = (visibility: string) => {
    setCurrentVisibility(visibility)
    setShowVisibilityDropdown(false)
  }

  const getUserAvatar = (userName: string) => {
    // 사용자 이름에서 첫 글자 추출
    const initial = userName.charAt(0)
    // 사용자별로 다른 색상 할당 (간단한 해시 함수)
    const colors = ["#4dabf7", "#748ffc", "#69db7c", "#ffa8a8", "#ffa94d", "#ffe066", "#63e6be", "#ff8787"]
    const colorIndex = userName.charCodeAt(0) % colors.length
    const color = colors[colorIndex]

    return { initial, color }
  }

  const ownerAvatar = getUserAvatar(project.owner)
  const creatorAvatar = getUserAvatar(project.createdBy)

  return (
    <S.Row>
      <S.Cell>{project.name}</S.Cell>
      <S.Cell>{project.id}</S.Cell>
      <S.Cell>
        <S.Description>{project.description}</S.Description>
      </S.Cell>
      <S.Cell>
        <S.Tag>{project.tag}</S.Tag>
      </S.Cell>
      <S.Cell>
        <S.VisibilityContainer onClick={toggleVisibilityDropdown}>
          <span>{currentVisibility}</span>
          <ChevronDown width={16} height={16} />

          {showVisibilityDropdown && (
            <S.DropdownMenu className="dropdown-menu">
              {visibilityOptions.map((option) => (
                <S.DropdownItem
                  key={option}
                  $active={currentVisibility === option}
                  onClick={() => handleVisibilityChange(option)}
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
          <S.UserAvatar color={ownerAvatar.color}>{ownerAvatar.initial}</S.UserAvatar>
          <S.UserName>{project.owner}</S.UserName>
        </S.UserInfo>
      </S.Cell>
      <S.Cell $isCentered>{project.memberCount}</S.Cell>
      <S.Cell>
        <S.UserInfo>
          <S.UserAvatar color={creatorAvatar.color}>{creatorAvatar.initial}</S.UserAvatar>
          <S.UserName>{project.createdBy}</S.UserName>
        </S.UserInfo>
      </S.Cell>
      <S.Cell>{project.createdAt}</S.Cell>
      <S.Cell $isCentered>
        <S.ActionButtonContainer>
          <S.ActionButton onClick={() => toggleActionDropdown(project.id)}>
            <DotIcon />
          </S.ActionButton>

          {activeDropdownId === project.id && (
            <S.DropdownMenu className="dropdown-menu">
              <S.DropdownItem>프로젝트 정보 수정</S.DropdownItem>
              <S.DropdownItem>프로젝트 멤버 관리</S.DropdownItem>
              <S.DropdownItem $danger>프로젝트 삭제</S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.ActionButtonContainer>
      </S.Cell>
    </S.Row>
  )
}
