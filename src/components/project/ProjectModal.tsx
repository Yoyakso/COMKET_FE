import { useState, useEffect, type KeyboardEvent as ReactKeyboardEvent } from "react"
import ReactDOM from "react-dom"
import * as S from "./ProjectModal.Style"
import { Chip } from "@/components/common/chip/Chip"
import { Radio } from "@/components/common/radio/Radio"

export type ProjectModalMode = "create" | "view" | "edit"

export interface ProjectData {
  name: string
  description: string
  tags: string[]
  isPublic: boolean
}

interface ProjectModalProps {
  mode: ProjectModalMode
  initialData?: ProjectData
  onClose: () => void
  onConfirm?: (projectData: ProjectData) => Promise<void>
  title?: string
}

export const ProjectModal = ({
  mode,
  initialData = { name: "", description: "", tags: [], isPublic: false },
  onClose,
  onConfirm,
  title,
}: ProjectModalProps) => {
  const [projectName, setProjectName] = useState(initialData.name)
  const [projectDescription, setProjectDescription] = useState(initialData.description)
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>(initialData.tags)
  const [isPublic, setIsPublic] = useState(initialData.isPublic)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(mode === "edit")

  const isViewMode = mode === "view" && !isEditing
  const isCreateMode = mode === "create"

  // 모달 제목 설정
  const modalTitle = title || (isCreateMode ? "프로젝트 생성" : isViewMode ? "프로젝트 정보" : "프로젝트 수정")

  // 컴포넌트가 마운트된 후에만 Portal 사용
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // ESC 키를 누르면 모달이 닫히도록 이벤트 리스너 추가
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)

    // 모달이 열릴 때 body에 스크롤 방지
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleAddTag = () => {
    if (isViewMode) return

    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput("")
    }
  }

  const handleTagInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (isViewMode) return

    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    } else if (e.key === "," || e.key === " ") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (isViewMode) return

    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    if (!onConfirm) return

    if (!projectName.trim()) {
      // 프로젝트 이름은 필수 입력 항목
      return
    }

    setIsSubmitting(true)
    try {
      await onConfirm({
        name: projectName.trim(),
        description: projectDescription.trim(),
        tags,
        isPublic,
      })

      // 편집 모드였다면 보기 모드로 전환
      if (mode === "view" && isEditing) {
        setIsEditing(false)
      } else {
        // 생성 모드나 편집 모드였다면 모달 닫기
        onClose()
      }
    } catch (error) {
      console.error("프로젝트 처리 중 오류 발생:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  const modalContent = (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>{modalTitle}</S.Title>

        <S.FormRow>
          <S.Label>프로젝트 이름</S.Label>
          <S.InputContainer>
            <S.Input
              type="text"
              placeholder="프로젝트 이름 입력"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              readOnly={isViewMode}
            />
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>프로젝트 설명</S.Label>
          <S.InputContainer>
            <S.TextArea
              placeholder="프로젝트 설명 입력"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              readOnly={isViewMode}
            />
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>프로젝트 태그</S.Label>
          <S.InputContainer>
            {isViewMode ? (
              <S.TagContainer>
                {tags.map((tag) => (
                  <Chip $styleType="filled" key={tag} variant="lightTeal" size="sm">
                    {tag}
                  </Chip>
                ))}
                {tags.length === 0 && <S.EmptyText>태그 없음</S.EmptyText>}
              </S.TagContainer>
            ) : (
              <S.TagContainer>
                {tags.map((tag) => (
                  <Chip $styleType="filled" key={tag} variant="lightTeal" size="sm" onClose={() => handleRemoveTag(tag)}>
                    {tag}
                  </Chip>
                ))}
                <S.TagInput
                  type="text"
                  placeholder={tags.length > 0 ? "" : "태그 입력 후 Enter 또는 쉼표로 구분"}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  onBlur={handleAddTag}
                />
              </S.TagContainer>
            )}
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>공개 범위</S.Label>
          <S.InputContainer>
            <S.RadioGroup>
              <Radio
                label="전체 공개"
                checked={isPublic}
                color="teal"
                onChange={() => setIsPublic(true)}
                disabled={isViewMode}
              />
              <Radio
                label="멤버 공개"
                checked={!isPublic}
                color="teal"
                onChange={() => setIsPublic(false)}
                disabled={isViewMode}
              />
            </S.RadioGroup>
            <S.HelperText>
              {isPublic
                ? "워크스페이스에 소속된 모든 사용자가 이 프로젝트를 열람할 수 있습니다."
                : "프로젝트 멤버로 등록된 사용자에게만 해당 프로젝트를 공개합니다."}
            </S.HelperText>
          </S.InputContainer>
        </S.FormRow>

        <S.ButtonContainer>
          {mode === "view" ? (
            <>
              <S.CancelButton onClick={onClose}>닫기</S.CancelButton>
              {isEditing ? (
                <S.ConfirmButton onClick={handleSubmit} disabled={isSubmitting || !projectName.trim()}>
                  {isSubmitting ? "저장 중..." : "저장"}
                </S.ConfirmButton>
              ) : (
                <S.ConfirmButton onClick={toggleEditMode}>수정</S.ConfirmButton>
              )}
            </>
          ) : (
            <>
              <S.CancelButton onClick={onClose} disabled={isSubmitting}>
                취소
              </S.CancelButton>
              {onConfirm && (
                <S.ConfirmButton onClick={handleSubmit} disabled={isSubmitting || !projectName.trim()}>
                  {isSubmitting ? (isCreateMode ? "생성 중..." : "저장 중...") : isCreateMode ? "생성" : "저장"}
                </S.ConfirmButton>
              )}
            </>
          )}
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  )

  return ReactDOM.createPortal(modalContent, document.body)
}
