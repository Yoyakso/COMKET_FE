import { DeleteModal } from "@/components/common/modal/DeleteModal"

interface RemoveProjectModalProps {
  onClose: () => void
  onConfirm: () => Promise<void>
  projectId?: number
}

export const RemoveProjectModal = ({ onClose, onConfirm, projectId }: RemoveProjectModalProps) => {
  return (
    <DeleteModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="프로젝트 제거"
      confirmText="제거"
      cancelText="취소"
      message="해당 프로젝트를 제거하시겠습니까?"
    />
  )
}
