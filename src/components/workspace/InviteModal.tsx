import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import * as S from "./InviteModal.Style"
import { ChevronDown } from "@assets/icons"

interface InviteType {
  id: string
  email: string
  prefix: string
  color: string
}

interface InviteModalProps {
  onClose: () => void
}

export const InviteModal = ({ onClose }: InviteModalProps) => {
  const [email, setEmail] = useState<string>("")
  const [invitees, setInvitees] = useState<InviteType[]>([
    { id: "1", email: "simh3077@ajou.ac.kr", prefix: "조", color: "#8C9EFF" },
    { id: "2", email: "won980630@ajou.co.kr", prefix: "원", color: "#69F0AE" },
    { id: "3", email: "ka09023@ajou.co.kr", prefix: "오", color: "#64B5F6" },
  ])
  const [role, setRole] = useState<string>("일반 멤버")
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false)
  const [generateLink, setGenerateLink] = useState<boolean>(false)

  // ESC 키를 누르면 모달 닫힘
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
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && email.trim() !== "") {
      addInvitee()
    }
  }

  const addInvitee = () => {
    if (email.trim() === "") return

    const colors = ["#8C9EFF", "#69F0AE", "#64B5F6", "#FFD54F", "#FF8A65"]
    const prefixes = ["조", "원", "오", "김", "이"]

    const newInvitee: InviteType = {
      id: Date.now().toString(),
      email: email.trim(),
      prefix: prefixes[Math.floor(Math.random() * prefixes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }

    setInvitees([...invitees, newInvitee])
    setEmail("")
  }

  const removeInvitee = (id: string) => {
    setInvitees(invitees.filter((invitee) => invitee.id !== id))
  }

  const toggleRoleDropdown = () => {
    setIsRoleOpen(!isRoleOpen)
  }

  const selectRole = (selectedRole: string) => {
    setRole(selectedRole)
    setIsRoleOpen(false)
  }

  const toggleLinkGeneration = () => {
    setGenerateLink(!generateLink)
  }

  const ModalContent = (
    <S.ModalContent onClick={(e) => e.stopPropagation()}>
      <S.Title>워크스페이스 멤버 초대</S.Title>

      <S.Section>
        <S.Label>초대 대상</S.Label>
        <S.ContentContainer>
          <S.InviteInputContainer>
            <S.InviteList>
              {invitees.map((invitee) => (
                <S.InviteTag key={invitee.id}>
                  <S.InvitePrefix style={{ backgroundColor: invitee.color }}>{invitee.prefix}</S.InvitePrefix>
                  {invitee.email}
                  <S.RemoveButton onClick={() => removeInvitee(invitee.id)}>×</S.RemoveButton>
                </S.InviteTag>
              ))}
              <S.EmailInput
                placeholder={invitees.length === 0 && email.trim() === "" ? "이메일을 입력해 워크스페이스 멤버로 초대해 보세요." : undefined}
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
              />
            </S.InviteList>
          </S.InviteInputContainer>
        </S.ContentContainer>
      </S.Section>

      <S.Section>
        <S.Label>역할</S.Label>
        <S.ContentContainer>
          <S.DropdownContainer>
            <S.DropdownButton onClick={toggleRoleDropdown}>
              {role}
              <ChevronDown width={20} height={20} />
            </S.DropdownButton>
            {isRoleOpen && (
              <S.DropdownMenu>
                <S.DropdownItem onClick={() => selectRole("일반 멤버")}>일반 멤버</S.DropdownItem>
                <S.DropdownItem onClick={() => selectRole("관리자")}>관리자</S.DropdownItem>
                <S.DropdownItem onClick={() => selectRole("편집자")}>편집자</S.DropdownItem>
              </S.DropdownMenu>
            )}
          </S.DropdownContainer>
        </S.ContentContainer>
      </S.Section>

      <S.Section>
        <S.Label>초대 링크</S.Label>
        <S.ContentContainer>
          <S.LinkGenerationContainer>
            <S.LinkGenerationText>안 함</S.LinkGenerationText>
            <S.ToggleSwitch>
              <S.ToggleInput type="checkbox" checked={generateLink} onChange={toggleLinkGeneration} />
              <S.ToggleSlider />
            </S.ToggleSwitch>
            <S.LinkGenerationText>링크 생성</S.LinkGenerationText>
            <S.CopyLinkButton disabled={!generateLink}>링크 복사</S.CopyLinkButton>
          </S.LinkGenerationContainer>
        </S.ContentContainer>
      </S.Section>

      <S.ButtonContainer>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
        <S.SendButton>보내기</S.SendButton>
      </S.ButtonContainer>
    </S.ModalContent>
  )

  // Portal을 사용하여 모달을 body의 자식으로 렌더링
  return ReactDOM.createPortal(
    <S.ModalOverlay onClick={onClose}>{ModalContent}</S.ModalOverlay>,
    document.body,
  )
}
