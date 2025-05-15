import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { MarkdownEditor } from "@components/common/markdownEditor/markdownEditor"
import * as S from "./CreateTicketModal.Style"
import { PriorityBadge } from "../ticket/PriorityBadge"
import { StatusBadge } from "../ticket/StatusBadge"

interface CreateTicketModalProps {
  onClose: () => void
  onSubmit: (ticketData: any) => void
}

export const CreateTicketModal = ({ onClose, onSubmit }: CreateTicketModalProps) => {
  const [ticketData, setTicketData] = useState({
    type: "티켓 유형 선택",
    title: "",
    content: "",
    priority: "HIGH",
    status: "TO DO",
    requester: {
      id: "tph00300",
      name: "이태경",
      avatar: "이",
    },
    assignee: "",
  })

  const handleContentChange = (content: string) => {
    setTicketData({ ...ticketData, content })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(ticketData)
  }

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>티켓 등록</S.ModalTitle>
        </S.ModalHeader>

        <S.ModalContent>
          <S.Form onSubmit={handleSubmit}>
            <S.FormRow>
              <S.FormLabel>유형</S.FormLabel>
              <S.SelectField>
                <S.SelectText>{ticketData.type}</S.SelectText>
                <ChevronDown size={16} />
              </S.SelectField>
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>티켓 제목</S.FormLabel>
              <S.TextField
                placeholder="티켓 제목 입력"
                value={ticketData.title}
                onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
              />
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>상세 내용</S.FormLabel>
              <S.EditorWrapper>
                <MarkdownEditor
                  initialValue={ticketData.content}
                  onChange={handleContentChange}
                />
              </S.EditorWrapper>
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>우선 순위</S.FormLabel>
              <S.SelectField>
                <S.PriorityOption>
                  <PriorityBadge priority="HIGH" />
                </S.PriorityOption>
                <ChevronDown size={16} />
              </S.SelectField>
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>상태</S.FormLabel>
              <S.SelectField>
                <StatusBadge status="TODO" />
                <ChevronDown size={16} />
              </S.SelectField>
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>요청자</S.FormLabel>
              <S.SelectField>
                <S.UserOption>
                  <S.UserAvatar>{ticketData.requester.avatar}</S.UserAvatar>
                  <S.UserName>
                    {ticketData.requester.name} [{ticketData.requester.id}]
                  </S.UserName>
                </S.UserOption>
                <ChevronDown size={16} />
              </S.SelectField>
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>담당자</S.FormLabel>
              <S.SelectField>
                {/* 프로젝트 멤버 전체 조회 필요 */}
                <S.AssigneeText>담당자 선택</S.AssigneeText>
                <ChevronDown size={16} />
              </S.SelectField>
            </S.FormRow>
          </S.Form>
        </S.ModalContent>

        <S.ModalFooter>
          <S.CancelButton type="button" onClick={onClose}>
            취소
          </S.CancelButton>
          <S.SubmitButton type="submit" onClick={handleSubmit}>
            등록
          </S.SubmitButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  )
}
