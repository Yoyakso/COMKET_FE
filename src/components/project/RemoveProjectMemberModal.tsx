import { DeleteModal } from "@/components/common/modal/DeleteModal"

interface RemoveProjectMemberModalProps {
  onClose: () => void
  onConfirm: () => Promise<void>
  memberName?: string
}

export const RemoveProjectMemberModal = ({ onClose, onConfirm }: RemoveProjectMemberModalProps) => {
  return (
    <DeleteModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="프로젝트 멤버 제거"
      confirmText="제거"
      cancelText="취소"
      message={
        <>
          프로젝트에서 해당 멤버를 제거하시겠습니까?<br />
          멤버를 제거해도 해당 멤버의 활동 기록은 삭제되지 않습니다.
        </>
      }
    />
  )
}
