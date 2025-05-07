import { useState, useEffect, type KeyboardEvent as ReactKeyboardEvent } from "react"
import ReactDOM from "react-dom"
import * as S from "./CreateProjectModal.Style"
import { Chip } from "@components/common/chip/Chip"
import { Radio } from "@components/common/radio/Radio"

interface CreateProjectModalProps {
  onClose: () => void
  onConfirm: (projectData: {
    name: string
    description: string
    tags: string[]
    isPublic: boolean
  }) => Promise<void>
}

export const CreateProjectModal = ({ onClose, onConfirm }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

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
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    } else if (e.key === "," || e.key === " ") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
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
      onClose()
    } catch (error) {
      console.error("프로젝트 생성 중 오류 발생:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const modalContent = (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>프로젝트 생성</S.Title>

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
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>공개 범위</S.Label>
          <S.InputContainer>
            <S.RadioGroup>
              <S.RadioGroup>
                <Radio label="전체 공개" checked={isPublic} color="teal" onChange={() => setIsPublic(true)} />
                <Radio label="멤버 공개" checked={!isPublic} color="teal" onChange={() => setIsPublic(false)} />
              </S.RadioGroup>
            </S.RadioGroup>
            <S.HelperText>
              {isPublic
                ? "워크스페이스에 소속된 모든 사용자가 이 프로젝트를 열람할 수 있습니다."
                : "프로젝트 멤버로 등록된 사용자에게만 해당 프로젝트를 공개합니다."}
            </S.HelperText>
          </S.InputContainer>
        </S.FormRow>

        <S.ButtonContainer>
          <S.CancelButton onClick={onClose} disabled={isSubmitting}>
            취소
          </S.CancelButton>
          <S.CreateButton onClick={handleSubmit} disabled={isSubmitting || !projectName.trim()}>
            {isSubmitting ? "생성 중..." : "생성"}
          </S.CreateButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  )

  return ReactDOM.createPortal(modalContent, document.body)
}
