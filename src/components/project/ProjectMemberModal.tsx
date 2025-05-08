import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import * as S from "./ProjectMemberModal.Style"
import { Search, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { AddProjectMemberModal } from "./AddProjectMemberModal"

interface ProjectMember {
  id: string
  name: string
  position: string
  role: "프로젝트 관리자" | "일반 멤버"
  initial: string
  color: string
}

interface AddMember {
  id: string
  name?: string
  email: string
  initial: string
  color: string
}

interface ProjectMemberModalProps {
  projectName?: string
  onClose: () => void
  onSave?: () => Promise<void>
}

export const ProjectMemberModal = ({ projectName = "프로젝트", onClose, onSave }: ProjectMemberModalProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [members, setMembers] = useState<ProjectMember[]>([
    {
      id: "tph00300",
      name: "이태희",
      position: "PM/PO",
      role: "프로젝트 관리자",
      initial: "이",
      color: "#4dabf7",
    },
    {
      id: "simh3077",
      name: "조민현",
      position: "기획",
      role: "프로젝트 관리자",
      initial: "조",
      color: "#748ffc",
    },
    {
      id: "won980630",
      name: "원해연",
      position: "디자인",
      role: "프로젝트 관리자",
      initial: "원",
      color: "#69db7c",
    },
    {
      id: "ka09023",
      name: "오유민",
      position: "프론트엔드 개발",
      role: "프로젝트 관리자",
      initial: "오",
      color: "#63e6be",
    },
    {
      id: "chito",
      name: "치토",
      position: "백엔드 개발",
      role: "일반 멤버",
      initial: "치",
      color: "#ffa8a8",
    },
    {
      id: "yoojaesok",
      name: "유재석",
      position: "웹 개발",
      role: "일반 멤버",
      initial: "유",
      color: "#ffa94d",
    },
    {
      id: "parkmeyonsu",
      name: "박명수",
      position: "데이터 분석",
      role: "일반 멤버",
      initial: "박",
      color: "#ffe066",
    },
    {
      id: "jhd",
      name: "정형돈",
      position: "데이터 엔지니어링",
      role: "일반 멤버",
      initial: "정",
      color: "#63e6be",
    },
    {
      id: "norediron",
      name: "노홍철",
      position: "QA",
      role: "일반 멤버",
      initial: "노",
      color: "#ff8787",
    },
    {
      id: "lavieenrose",
      name: "라미란",
      position: "기타",
      role: "일반 멤버",
      initial: "라",
      color: "#748ffc",
    },
    {
      id: "tph00300_2",
      name: "이태희",
      position: "PM/PO",
      role: "일반 멤버",
      initial: "이",
      color: "#4dabf7",
    },
    {
      id: "simh3077_2",
      name: "조민현",
      position: "기획",
      role: "일반 멤버",
      initial: "조",
      color: "#748ffc",
    },
    {
      id: "won980630_2",
      name: "원해연",
      position: "디자인",
      role: "일반 멤버",
      initial: "원",
      color: "#69db7c",
    },
  ])

  const [activeRoleDropdown, setActiveRoleDropdown] = useState<string | null>(null)
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [mounted, setIsMounted] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".role-dropdown") && !target.closest(".role-selector")) {
        setActiveRoleDropdown(null)
      }
      if (!target.closest(".action-menu") && !target.closest(".action-button")) {
        setActiveActionMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const toggleRoleDropdown = (memberId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveRoleDropdown(activeRoleDropdown === memberId ? null : memberId)
    setActiveActionMenu(null)
  }

  const toggleActionMenu = (memberId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveActionMenu(activeActionMenu === memberId ? null : memberId)
    setActiveRoleDropdown(null)
  }

  const handleRoleChange = (memberId: string, role: "프로젝트 관리자" | "일반 멤버") => {
    setMembers(members.map((member) => (member.id === memberId ? { ...member, role } : member)))
    setActiveRoleDropdown(null)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronDown size={16} />
    }
    return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  // 검색 및 정렬 적용
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (!sortField) return 0

    let valueA = ""
    let valueB = ""

    switch (sortField) {
      case "name":
        valueA = a.name
        valueB = b.name
        break
      case "position":
        valueA = a.position
        valueB = b.position
        break
      case "role":
        valueA = a.role
        valueB = b.role
        break
      default:
        return 0
    }

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave()
      }
      onClose()
    } catch (error) {
      console.error("멤버 저장 중 오류 발생:", error)
    }
  }

  const openAddMemberModal = () => {
    setShowAddMemberModal(true)
  }

  const closeAddMemberModal = () => {
    setShowAddMemberModal(false)
  }

  const handleAddMembers = async (newMembers: AddMember[], role: string) => {
    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 새 멤버 추가 (실제로는 API 응답으로 받은 데이터를 사용)
      const addedMembers: ProjectMember[] = newMembers.map((member) => ({
        id: member.id,
        name: member.name || member.email.split("@")[0],
        position: "미지정", // 기본 직무
        role: role === "프로젝트 관리자" ? "프로젝트 관리자" : "일반 멤버",
        initial: member.initial,
        color: member.color,
      }))

      // 중복 멤버 제외하고 추가
      const existingIds = members.map((m) => m.id)
      const uniqueNewMembers = addedMembers.filter((m) => !existingIds.includes(m.id))

      setMembers([...members, ...uniqueNewMembers])

      console.log(`${uniqueNewMembers.length}명의 멤버가 추가되었습니다.`)
      return Promise.resolve()
    } catch (error) {
      console.error("멤버 추가 중 오류 발생:", error)
      throw error
    }
  }

  if (!mounted) return null

  const modalContent = (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>{projectName} 멤버</S.Title>

        <S.HeaderSection>
          <S.MemberCount>{members.length}명</S.MemberCount>
          <S.SearchSection>
            <S.SearchInput>
              <S.Input type="text" placeholder="이름/이메일로 검색" value={searchQuery} onChange={handleSearch} />
              <S.SearchIcon>
                <Search size={18} />
              </S.SearchIcon>
            </S.SearchInput>
            <S.AddButton onClick={openAddMemberModal}>
              멤버 추가
            </S.AddButton>
          </S.SearchSection>
        </S.HeaderSection>

        <S.TableContainer>
          <S.Table>
            <S.TableHeader>
              <S.HeaderRow>
                <S.HeaderCell onClick={() => handleSort("name")}>성명 {getSortIcon("name")}</S.HeaderCell>
                <S.HeaderCell onClick={() => handleSort("position")}>직무 {getSortIcon("position")}</S.HeaderCell>
                <S.HeaderCell onClick={() => handleSort("role")}>역할 {getSortIcon("role")}</S.HeaderCell>
                <S.HeaderCell>관리</S.HeaderCell>
              </S.HeaderRow>
            </S.TableHeader>
            <S.TableBody>
              {sortedMembers.map((member) => (
                <S.Row key={member.id}>
                  <S.Cell>
                    <S.UserInfo>
                      <S.Avatar $bgColor={member.color}>{member.initial}</S.Avatar>
                      <S.UserName>
                        {member.name} [{member.id}]
                      </S.UserName>
                    </S.UserInfo>
                  </S.Cell>
                  <S.Cell>{member.position}</S.Cell>
                  <S.Cell>
                    <S.RoleSelector className="role-selector" onClick={(e) => toggleRoleDropdown(member.id, e)}>
                      {member.role}
                      <ChevronDown size={16} />

                      {activeRoleDropdown === member.id && (
                        <S.RoleDropdown className="role-dropdown">
                          <S.RoleOption
                            $active={member.role === "프로젝트 관리자"}
                            onClick={() => handleRoleChange(member.id, "프로젝트 관리자")}
                          >
                            프로젝트 관리자
                          </S.RoleOption>
                          <S.RoleOption
                            $active={member.role === "일반 멤버"}
                            onClick={() => handleRoleChange(member.id, "일반 멤버")}
                          >
                            일반 멤버
                          </S.RoleOption>
                        </S.RoleDropdown>
                      )}
                    </S.RoleSelector>
                  </S.Cell>
                  <S.Cell>
                    <S.ActionButtonContainer>
                      <S.ActionButton className="action-button" onClick={(e) => toggleActionMenu(member.id, e)}>
                        <MoreHorizontal size={18} />
                      </S.ActionButton>

                      {activeActionMenu === member.id && (
                        <S.ActionMenu className="action-menu">
                          <S.ActionMenuItem>멤버 정보 보기</S.ActionMenuItem>
                          <S.ActionMenuItem $danger>멤버 제거</S.ActionMenuItem>
                        </S.ActionMenu>
                      )}
                    </S.ActionButtonContainer>
                  </S.Cell>
                </S.Row>
              ))}
            </S.TableBody>
          </S.Table>
        </S.TableContainer>

        <S.ButtonContainer>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  )

  return (
    <>
      {ReactDOM.createPortal(modalContent, document.body)}
      {showAddMemberModal && <AddProjectMemberModal onClose={closeAddMemberModal} onAdd={handleAddMembers} />}
    </>
  )
}
