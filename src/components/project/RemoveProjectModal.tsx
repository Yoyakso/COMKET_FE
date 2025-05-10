import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import * as S from "./RemoveProjectModal.Style"
import { Loader } from "lucide-react"

interface RemoveProjectModalProps {
  onClose: () => void
  onConfirm: () => Promise<void>
  projectId?: number
}

export const RemoveProjectModal = ({ onClose, onConfirm, projectId }: RemoveProjectModalProps) => {
  const [isRemoving, setIsRemoving] = useState(false)

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

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error("프로젝트 제거 중 오류 발생:", error)
    } finally {
      setIsRemoving(false)
    }
  }

  return ReactDOM.createPortal(
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>프로젝트 제거</S.Title>

        <S.MessageContainer>
          <S.Message>해당 프로젝트를 제거하시겠습니까?</S.Message>
        </S.MessageContainer>

        <S.ButtonContainer>
          <S.CancelButton onClick={onClose} disabled={isRemoving}>
            취소
          </S.CancelButton>
          <S.RemoveButton onClick={handleRemove} disabled={isRemoving}>
            {isRemoving ? (
              <>
                제거
                <S.SpinnerContainer>
                  <Loader size={16} />
                </S.SpinnerContainer>
              </>
            ) : (
              "제거"
            )}
          </S.RemoveButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body,
  )
}
