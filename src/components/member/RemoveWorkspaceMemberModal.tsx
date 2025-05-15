import { DeleteModal } from "@/components/common/modal/DeleteModal"

export const RemoveWorkspaceMemberModal = ({ onClose, onConfirm, memberName = "해당 멤버" }) => {
  return (
    <DeleteModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="워크스페이스 멤버 제거"
      confirmText="제거"
      cancelText="취소"
      message={
        <>
          워크스페이스에서 해당 멤버를 제거하시겠습니까?<br />
          제거된 멤버는 다시 초대되기 전까지 워크스페이스에 접근할 수 없습니다.<br />
          멤버를 제거해도 해당 멤버의 활동 기록은 삭제되지 않습니다.
        </>
      }
    />
  )
}
