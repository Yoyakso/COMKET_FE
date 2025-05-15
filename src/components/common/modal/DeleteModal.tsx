import { useEffect, useState, type ReactNode } from "react"
import ReactDOM from "react-dom"
import * as S from "./DeleteModal.Style"
import { Loader } from "lucide-react"

interface DeleteModalProps {
  onClose: () => void
  onConfirm: () => Promise<void>
  title: string
  message: ReactNode
  confirmText?: string
  cancelText?: string
}

/**
 * 
 * @param onClose 모달을 닫는 함수
 * @param onConfirm 확인 시 호출되는 비동기 함수
 * @param title 모달 상단에 표시되는 제목
 * @param message 본문에 표시되는 내용
 * @param confirmText 확인 버튼에 표시될 텍스트 (기본값: "확인")
 * @param cancelText 취소 버튼에 표시될 텍스트 (기본값: "취소")
 * @returns 
 */
export const DeleteModal = ({
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
}: DeleteModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscKey)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
    } catch (err) {
      console.error("확인 중 오류 발생:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return ReactDOM.createPortal(
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>

        <S.MessageContainer>
          <S.Message>{message}</S.Message>
        </S.MessageContainer>

        <S.ButtonContainer>
          <S.CancelButton onClick={onClose} disabled={isLoading}>
            {cancelText}
          </S.CancelButton>
          <S.RemoveButton onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                {confirmText}
                <S.SpinnerContainer>
                  <Loader size={16} />
                </S.SpinnerContainer>
              </>
            ) : (
              confirmText
            )}
          </S.RemoveButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body,
  )
}
