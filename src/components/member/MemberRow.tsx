import { useState, useEffect, useRef } from "react"
import * as S from "./MemberRow.Style"
import type { MemberData } from "@/types/member"
import { ChevronDown, DotIcon } from "@assets/icons"
import { RemoveMemberModal } from "./RemoveMemberModal"
import { getColorFromString } from "@/utils/avatarColor"
import { formatDate } from "@/utils/dateFormat"

interface MemberRowProps {
  member: MemberData
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



export const MemberRow = ({ member }: MemberRowProps) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [currentRole, setCurrentRole] = useState(translateRole(member.positionType))
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

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

  const handleRoleChange = (koreanRole: string) => {
    setCurrentRole(koreanRole)
    setShowRoleDropdown(false)

    const newPositionType = reverseRoleMap[koreanRole]

    console.log("역할 변경:", newPositionType)
    //여기서 API 호출
  }


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
      // 멤버 제거 API 호출 로직 구현

      // API 호출 시뮬레이션 (2초 지연)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log(`멤버 ${member.name}(${member.id}) 제거 완료`)
      // 성공 후 추가 작업 (예: 부모 컴포넌트에 알림)
    } catch (error) {
      console.error("멤버 제거 중 오류 발생:", error)
    }
  }

  return (
    <>
      <S.Row>
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
          <S.RoleContainer onClick={toggleRoleDropdown}>
            <span>{currentRole}</span>
            <ChevronDown />

            {showRoleDropdown && (
              <S.RoleDropdownMenu className="dropdown-menu">
                {roles.map((role) => (
                  <S.RoleDropdownItem
                    key={role}
                    $active={translateRole(member.positionType) === role}
                    onClick={() => {
                      setCurrentRole(role)
                      setShowRoleDropdown(false)
                      handleRoleChange(role)
                      // 서버로 positionType 업데이트하려면 여기에 reverseRoleMap 사용:
                      // const newType = reverseRoleMap[role]
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
        <RemoveMemberModal onClose={closeRemoveModal} onConfirm={handleRemoveMember} memberName={member.name} />
      )}
    </>
  )
}
