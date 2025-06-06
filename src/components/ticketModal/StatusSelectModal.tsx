import { useState } from "react"
import { Archive, Pause, Layers } from "lucide-react"
import * as S from "./StatusSelectModal.Style"
import { Button } from "@/components/common/button/Button"

interface StatusSelectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (status: string) => void
  ticketTitle: string
}

const statusOptions = [
  { value: "DROP", label: "DROP", icon: <Archive size={16} />, description: "작업을 중단합니다" },
  { value: "HOLD", label: "HOLD", icon: <Pause size={16} />, description: "작업을 일시 보류합니다" },
  { value: "BACKLOG", label: "BACKLOG", icon: <Layers size={16} />, description: "백로그로 이동합니다" },
]

export const StatusSelectModal = ({ isOpen, onClose, onConfirm, ticketTitle }: StatusSelectModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("")

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm(selectedStatus)
      setSelectedStatus("")
      onClose()
    }
  }

  const handleClose = () => {
    setSelectedStatus("")
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <S.DialogOverlay onClick={handleOverlayClick}>
      <S.DialogContent>
        <S.DialogHeader>
          <S.DialogTitle>상태 선택</S.DialogTitle>
        </S.DialogHeader>

        <S.Container>
          <S.Description>
            <span className="font-medium">"{ticketTitle}"</span> 티켓의 상태를 선택해주세요.
          </S.Description>

          <S.RadioGroup>
            {statusOptions.map((option) => (
              <S.RadioOption key={option.value}>
                <S.RadioGroupItem
                  value={option.value}
                  id={option.value}
                  name="status"
                  checked={selectedStatus === option.value}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                <S.Label htmlFor={option.value}>
                  {option.icon}
                  <S.RadioContent>
                    <span className="title">{option.label}</span>
                    <span className="description">{option.description}</span>
                  </S.RadioContent>
                </S.Label>
              </S.RadioOption>
            ))}
          </S.RadioGroup>
        </S.Container>

        <S.ButtonGroup>
          <Button $variant="neutralOutlined" size="md" onClick={handleClose}>취소</Button>
          <Button $variant="tealFilled" size="md" onClick={handleConfirm} disabled={!selectedStatus}>확인</Button>
        </S.ButtonGroup>
      </S.DialogContent>
    </S.DialogOverlay>
  )
}
