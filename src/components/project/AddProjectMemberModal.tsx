import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import * as S from "./AddProjectMemberModal.Style"
import { ChevronDown, X } from "lucide-react"

interface Member {
  id: string
  name?: string
  email: string
  initial: string
  color: string
}

interface AddProjectMemberModalProps {
  onClose: () => void
  onAdd: (members: Member[], role: string) => Promise<void>
}

export const AddProjectMemberModal = ({ onClose, onAdd }: AddProjectMemberModalProps) => {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([
    {
      id: "simh3077",
      name: "조민현",
      email: "simh3077@ajou.co.kr",
      initial: "조",
      color: "#748ffc",
    },
    {
      id: "won980630",
      name: "원해연",
      email: "won980630@ajou.co.kr",
      initial: "원",
      color: "#69db7c",
    },
    {
      id: "ka09023",
      email: "ka09023@ajou.co.kr",
      initial: "오",
      color: "#63e6be",
    },
  ])
  const [emailInput, setEmailInput] = useState<string>("")

  const [role, setRole] = useState<string>("일반 멤버")
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // 컴포넌트가 마운트된 후에만 Portal 사용
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // ESC 키를 누르면 모달이 닫히도록 이벤트 리스너 추가
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  // 클릭 이벤트 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".role-dropdown") && !target.closest(".role-button")) {
        setIsRoleDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleRoleDropdown = () => {
    setIsRoleDropdownOpen(!isRoleDropdownOpen)
  }

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole)
    setIsRoleDropdownOpen(false)
  }

  const removeMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== memberId))
  }

  // 이메일 입력 핸들러 추가
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  // 키 입력 핸들러 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addMember()
    }
  }

  // 멤버 추가 함수
  const addMember = () => {
    const email = emailInput.trim().replace(/,$/, "") // 쉼표 제거
    if (!email) return

    // 이메일 형식 검증 (간단한 검증)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.")
      return
    }

    // 중복 체크
    if (selectedMembers.some((member) => member.email === email)) {
      alert("이미 추가된 이메일입니다.")
      return
    }

    // 랜덤 색상 및 이니셜 생성
    const colors = ["#748ffc", "#69db7c", "#63e6be", "#ffa8a8", "#ffa94d", "#ffe066"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const initial = email.charAt(0).toUpperCase()

    // 새 멤버 추가
    const newMember: Member = {
      id: `temp-${Date.now()}`, // 임시 ID
      email,
      initial,
      color: randomColor,
    }

    setSelectedMembers([...selectedMembers, newMember])
    setEmailInput("")
  }

  const handleSubmit = async () => {
    if (selectedMembers.length === 0) return

    setIsSubmitting(true)
    try {
      await onAdd(selectedMembers, role)
      onClose()
    } catch (error) {
      console.error("멤버 추가 중 오류 발생:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const modalContent = (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Title>프로젝트 멤버 추가</S.Title>

        <S.FormRow>
          <S.Label>추가 대상</S.Label>
          <S.InputContainer>
            <S.MemberTagsContainer>
              {selectedMembers.map((member) => (
                <S.MemberTag key={member.id}>
                  <S.MemberAvatar $bgColor={member.color}>{member.initial}</S.MemberAvatar>
                  {member.name ? `${member.name} [${member.id}]` : member.email}
                  <S.RemoveButton onClick={() => removeMember(member.id)}>
                    <X size={16} />
                  </S.RemoveButton>
                </S.MemberTag>
              ))}
              <S.EmailInput
                type="text"
                placeholder="이메일 입력 후 Enter 또는 쉼표로 추가"
                value={emailInput}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
              />
            </S.MemberTagsContainer>
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>역할</S.Label>
          <S.InputContainer>
            <S.DropdownContainer>
              <S.DropdownButton className="role-button" onClick={toggleRoleDropdown}>
                {role}
                <ChevronDown size={20} />
              </S.DropdownButton>

              {isRoleDropdownOpen && (
                <S.DropdownMenu className="role-dropdown">
                  <S.DropdownItem
                    $active={role === "프로젝트 관리자"}
                    onClick={() => handleRoleSelect("프로젝트 관리자")}
                  >
                    프로젝트 관리자
                  </S.DropdownItem>
                  <S.DropdownItem $active={role === "일반 멤버"} onClick={() => handleRoleSelect("일반 멤버")}>
                    일반 멤버
                  </S.DropdownItem>
                </S.DropdownMenu>
              )}
            </S.DropdownContainer>
          </S.InputContainer>
        </S.FormRow>

        <S.ButtonContainer>
          <S.CancelButton onClick={onClose} disabled={isSubmitting}>
            취소
          </S.CancelButton>
          <S.AddButton onClick={handleSubmit} disabled={isSubmitting || selectedMembers.length === 0}>
            {isSubmitting ? "추가 중..." : "추가"}
          </S.AddButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  )

  return ReactDOM.createPortal(modalContent, document.body)
}
