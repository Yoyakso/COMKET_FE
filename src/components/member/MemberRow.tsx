import { useState, useEffect } from "react"
import * as S from "./MemberRow.Style"
import type { MemberData } from "@/types/member"
import { ChevronDown, DotIcon } from '@assets/icons'

interface MemberRowProps {
  member: MemberData
}

const roles = ["워크스페이스 소유자", "워크스페이스 관리자", "일반 멤버"]

export const MemberRow = ({ member }: MemberRowProps) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [currentRole, setCurrentRole] = useState(member.department)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-menu")) {
        setActiveDropdownId(null);
        setShowRoleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMemberDeleteDropdown = (id: string) => {
    setShowRoleDropdown(false);
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

  return (
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
          <S.ActionButton onClick={() => toggleMemberDeleteDropdown(member.id)}>
            <DotIcon />
          </S.ActionButton>

          {activeDropdownId === member.id && (
            <S.DropdownMenu>
              <S.DropdownItem $danger>멤버 제거</S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.ActionButtonContainer>
      </S.Cell>
    </S.Row>
  )
}
