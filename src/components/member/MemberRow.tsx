import { useState, useEffect, useRef } from "react"
import * as S from "./MemberRow.Style"
import type { MemberData } from "@/types/member"
import { ChevronDown, DotIcon } from "@assets/icons"
import { RemoveWorkspaceMemberModal } from "./RemoveWorkspaceMemberModal"
import { getColorFromString } from "@/utils/avatarColor"
import { formatDate } from "@/utils/dateFormat"
import { deleteWorkspaceMember, updateWorkspaceMember } from "@/api/Member"
import { useWorkspaceStore } from "@/stores/workspaceStore"
import { toast } from "react-toastify"

interface MemberRowProps {
  member: MemberData
  onUpdateMember: (email: string, newRole: "OWNER" | "ADMIN" | "MEMBER") => void
}

const translateRole = (positionType: string) => {
  switch (positionType) {
    case "OWNER":
      return "워크스페이스 소유자"
    case "ADMIN":
      return "워크스페이스 관리자"
    case "MEMBER":
      return "일반 멤버"
    default:
      return "-"
  }
}

const translateState = (state: string) => {
  switch (state) {
    case "ACTIVE":
      return "활성"
    case "INACTIVE":
      return "비활성"
    case "DELETED":
      return "제거"
    default:
      return "-"
  }
}

const roleMap = {
  OWNER: "워크스페이스 소유자",
  ADMIN: "워크스페이스 관리자",
  MEMBER: "일반 멤버"
} as const

const reverseRoleMap = Object.fromEntries(
  Object.entries(roleMap).map(([eng, kor]) => [kor, eng])
)

const roles = Object.values(roleMap)

export const MemberRow = ({ member, onUpdateMember }: MemberRowProps) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [currentRole, setCurrentRole] = useState(translateRole(member.positionType))
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const workspaceId = useWorkspaceStore((state) => state.workspaceId)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const actionButtonRef = useRef<HTMLButtonElement>(null)

  const color = getColorFromString(member.email)
  const joinedAt = formatDate(member.createdAt)
  const updatedAt = formatDate(member.updatedAt)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        actionButtonRef.current &&
        !actionButtonRef.current.contains(target)
      ) {
        setActiveDropdownId(null)
        setShowRoleDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMemberDeleteDropdown = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setShowRoleDropdown(false)
    setActiveDropdownId((prevId) => (prevId === id ? null : id))
  }

  const toggleRoleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowRoleDropdown(!showRoleDropdown)
    setActiveDropdownId(null)
  }

  const handleRoleChange = async (koreanRole: string) => {
    const newPositionType = reverseRoleMap[koreanRole];
    setCurrentRole(koreanRole)
    setShowRoleDropdown(false)

    try {
      await updateWorkspaceMember(workspaceId, {
        workspace_member_email: member.email,
        position_type: newPositionType as "OWNER" | "ADMIN" | "MEMBER",
        state: member.state as "ACTIVE" | "INACTIVE" | "DELETED",
      });
      console.log(`역할이 ${newPositionType}로 변경됨`);
      onUpdateMember(member.email, newPositionType as "OWNER" | "ADMIN" | "MEMBER");
      toast.success("역할 변경이 완료됐습니다.")
    } catch (error) {
      console.error("역할 변경 실패:", error);
      toast.error("역할 변경에 실패했습니다. 다시 시도해주세요")
    }
  };

  const openRemoveModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRemoveModalOpen(true)
    setActiveDropdownId(null)
    console.log("Opening remove modal for:", member.name)
  }

  const closeRemoveModal = () => {
    setIsRemoveModalOpen(false)
  }

  const handleRemoveMember = async () => {
    try {
      await deleteWorkspaceMember(workspaceId, member.email)
      console.log(`멤버 ${member.name}(${member.email}) 제거 완료`)
      toast.success("멤버 제거를 완료했습니다.")
      setIsRemoveModalOpen(false)
    } catch (error) {
      toast.error("멤버 제거에 실패했습니다.")
    }
  }

  return (
    <>
      <S.Row $isDeleted={member.state === "DELETED"}>
        <S.Cell>
          <S.UserInfo>
            <S.UserAvatar color={color}>{member.name?.[0] ?? "?"}</S.UserAvatar>
            <S.UserName>
              {member.name} [{member.email.split("@")[0]}]
            </S.UserName>
          </S.UserInfo>
        </S.Cell>
        <S.Cell>{member.email}</S.Cell>
        <S.Cell>
          <S.RoleContainer onClick={member.state === "DELETED" ? undefined : toggleRoleDropdown}>
            <span>{currentRole}</span>
            {member.state !== "DELETED" && <ChevronDown />}

            {showRoleDropdown && member.state !== "DELETED" && (
              <S.RoleDropdownMenu className="dropdown-menu">
                {roles.map((role) => (
                  <S.RoleDropdownItem
                    key={role}
                    $active={translateRole(member.positionType) === role}
                    onClick={() => {
                      setCurrentRole(role)
                      setShowRoleDropdown(false)
                      handleRoleChange(role)
                    }}
                  >
                    {role}
                  </S.RoleDropdownItem>
                ))}
              </S.RoleDropdownMenu>
            )}
          </S.RoleContainer>
        </S.Cell>
        <S.Cell $isCentered>{translateState(member.state)}</S.Cell>
        <S.Cell $isCentered>{joinedAt}</S.Cell>
        <S.Cell $isCentered>{updatedAt}</S.Cell>
        <S.Cell $isCentered>
          <S.ActionButtonContainer>
            <S.ActionButton ref={actionButtonRef} onClick={(e) => toggleMemberDeleteDropdown(member.id, e)}>
              <DotIcon />
            </S.ActionButton>

            {activeDropdownId === member.id && (
              <S.DropdownMenu ref={dropdownRef} className="dropdown-menu">
                <S.DropdownItem $danger onClick={openRemoveModal}>
                  멤버 제거
                </S.DropdownItem>
              </S.DropdownMenu>
            )}
          </S.ActionButtonContainer>
        </S.Cell>
      </S.Row>

      {isRemoveModalOpen && (
        <RemoveWorkspaceMemberModal onClose={closeRemoveModal} onConfirm={handleRemoveMember} memberName={member.name} />
      )}
    </>
  )
}
