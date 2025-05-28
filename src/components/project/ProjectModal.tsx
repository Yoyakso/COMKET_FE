import { useState, useEffect, type KeyboardEvent as ReactKeyboardEvent } from "react"
import ReactDOM from "react-dom"
import * as S from "./ProjectModal.Style"
import { Chip } from "@/components/common/chip/Chip"
import { Radio } from "@/components/common/radio/Radio"
import { toast } from "react-toastify"

export type ProjectModalMode = "create" | "view" | "edit"

export interface ProjectData {
  id: number
  name: string
  description: string
  tags: string[]
  ownerInfo?: []
  isPublic: boolean
}

interface ProjectModalProps {
  mode: ProjectModalMode
  initialData?: ProjectData
  onClose: () => void
  onConfirm?: (projectData: ProjectData) => Promise<void>
  title?: string
  onEditClick?: () => void; //관리자만
}

export const ProjectModal = ({
  mode,
  initialData = { id: 0, name: "", description: "", tags: [], isPublic: false },
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
  const [isEditing, setIsEditing] = useState(mode === "view")
  const [isComposing, setIsComposing] = useState(false)
  const isCreateMode = mode === "create"

  const modalTitle = title || (isCreateMode ? "프로젝트 생성" : "프로젝트 정보")

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput("")
    }
  }

  const handleTagInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    if (!onConfirm) return

    const trimmedName = projectName.trim()
    const trimmedDescription = projectDescription.trim()

    if (!projectName.trim()) return

    const isUnchanged =
      trimmedName === initialData.name &&
      trimmedDescription === initialData.description &&
      JSON.stringify(tags) === JSON.stringify(initialData.tags) &&
      isPublic === initialData.isPublic

    if (isUnchanged) {
      toast.info("변경된 내용이 없습니다.")
      return
    }

    setIsSubmitting(true)
    try {
      await onConfirm({
        id: initialData.id,
        name: trimmedName,
        description: trimmedDescription,
        tags,
        isPublic,
      })

      if (mode === "view" && isEditing) {
        setIsEditing(false)
      } else {
        onClose()
      }
    } catch (error) {
      console.error("프로젝트 처리 중 오류 발생:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) return null

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
            />
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>프로젝트 태그</S.Label>
          <S.InputContainer>
            <S.TagContainer>
              {tags.map((tag) => (
                <Chip $styleType="filled" key={tag} $variant="lightTeal" size="sm" onClose={() => handleRemoveTag(tag)}>
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
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
              />
            </S.TagContainer>
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
              />
              <Radio
                label="멤버 공개"
                checked={!isPublic}
                color="teal"
                onChange={() => setIsPublic(false)}
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
                <S.ConfirmButton>저장</S.ConfirmButton>
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

  return isMounted
    ? ReactDOM.createPortal(modalContent, document.body)
    : null;
}
