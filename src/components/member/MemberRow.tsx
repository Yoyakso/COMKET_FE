import { useState, useEffect, useRef } from "react"
import * as S from "./MemberRow.Style"
import type { MemberData } from "@/types/member"
import { ChevronDown, DotIcon } from "@assets/icons"
import { RemoveMemberModal } from "./RemoveMemberModal"

interface MemberRowProps {
  member: MemberData
}

const roles = ["워크스페이스 소유자", "워크스페이스 관리자", "일반 멤버"]

export const MemberRow = ({ member }: MemberRowProps) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [currentRole, setCurrentRole] = useState(member.department)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  // 드롭다운 참조 추가
  const dropdownRef = useRef<HTMLDivElement>(null)
  const actionButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // 드롭다운 메뉴나 액션 버튼 외부를 클릭했는지 확인
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

  const toggleMemberDeleteDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 버블링 방지
    setShowRoleDropdown(false)
    setActiveDropdownId((prevId) => (prevId === id ? null : id))
  }

  const toggleRoleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowRoleDropdown(!showRoleDropdown)
    setActiveDropdownId(null)
  }

  const handleRoleChange = (role: string) => {
    setCurrentRole(role)
    setShowRoleDropdown(false)
  }

  const openRemoveModal = (e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 버블링 방지
    setIsRemoveModalOpen(true)
    setActiveDropdownId(null) // 드롭다운 메뉴 닫기
    console.log("Opening remove modal for:", member.name) // 디버깅용 로그
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
            <S.UserAvatar color={member.color}>{member.initial}</S.UserAvatar>
            <S.UserName>
              {member.name} [{member.id}]
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
                  <S.RoleDropdownItem key={role} $active={currentRole === role} onClick={() => handleRoleChange(role)}>
                    {role}
                  </S.RoleDropdownItem>
                ))}
              </S.RoleDropdownMenu>
            )}
          </S.RoleContainer>
        </S.Cell>
        <S.Cell $isCentered>{member.status}</S.Cell>
        <S.Cell $isCentered>{member.registrationDate}</S.Cell>
        <S.Cell $isCentered>{member.lastLoginDate}</S.Cell>
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
