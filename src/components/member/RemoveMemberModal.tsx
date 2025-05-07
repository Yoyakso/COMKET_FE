import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import * as S from "./RemoveMemberModal.Style"
import { Loader } from "lucide-react"

interface RemoveMemberModalProps {
  onClose: () => void
  onConfirm: () => Promise<void>
  memberName?: string
}

export const RemoveMemberModal = ({ onClose, onConfirm, memberName = "해당 멤버" }: RemoveMemberModalProps) => {
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
      console.error("멤버 제거 중 오류 발생:", error)
    } finally {
      setIsRemoving(false)
    }
  }

  return ReactDOM.createPortal(
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>워크스페이스 멤버 제거</S.Title>

        <S.MessageContainer>
          <S.Message>워크스페이스에서 해당 멤버를 제거하시겠습니까?<br />제거된 멤버는 다시 초대되기 전까지 워크스페이스에 접근할 수 없습니다.<br />멤버를 제거해도 해당 멤버의 활동 기록은 삭제되지 않습니다.</S.Message>
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
