import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { MarkdownEditor } from "@components/common/markdownEditor/MarkdownEditor"
import * as S from "./CreateTicketModal.Style"
import { PriorityBadge } from "../ticket/PriorityBadge"
import { StatusBadge } from "../ticket/StatusBadge"
import { createTicket } from "@/api/Ticket"
import { getProjectMembers } from "@/api/Project"
import { useWorkspaceStore } from "@/stores/workspaceStore"
import { useUserStore } from "@/stores/userStore"
import { toast } from "react-toastify"
import { mapTicketFromResponse } from "@/utils/ticketMapper"
import type { TicketTemplate } from "@/types/ticketTemplate"
import { mapTemplateToCreateTicketDto } from "@/utils/ticketTemplateMapper"

interface Member {
  memberId: number
  name: string
  projectMemberId: number
  email?: string
}

interface CreateTicketModalProps {
  onClose: () => void
  onSubmit: (ticketData: any) => void
  projectName: string
  projectId: number
  parentTicketId?: number
  template?: TicketTemplate
  initialData?: {
    title?: string
    assignee_member_id_list?: number[] | null
    priority?: string
    start_date?: string
    end_date?: string
  }
}

const TYPE_OPTIONS = ["개발", "디자인", "기획", "테스트", "버그", "회의/논의", "문서화", "기타"]
const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH"]
const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE", "HOLD", "DROP", "BACKLOG"]

export const CreateTicketModal = ({
  onClose,
  onSubmit,
  projectName,
  projectId,
  parentTicketId,
  template,
  initialData,
}: CreateTicketModalProps) => {
  const workspaceName = useWorkspaceStore((state) => state.workspaceName)
  const [members, setMembers] = useState<Member[]>([])
  const { name, email, memberId } = useUserStore()
  const [ticketData, setTicketData] = useState({
    type: template?.type || "",
    title: initialData?.title || "",
    content: "",
    priority: template ? "MEDIUM" : "",
    status: "TODO",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    assignee_member_id_list: initialData?.assignee_member_id_list || [],
    requester: {
      id: memberId,
      name: name,
      avatar: name ? name.charAt(0) : "?",
    },
    parentTicketId: parentTicketId ?? null,
  })

  const [additionalFields, setAdditionalFields] = useState<Record<string, any>>({})
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  const priorityRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const assigneeRef = useRef<HTMLDivElement>(null)

  const isFormValid =
    ticketData.title.trim() !== "" &&
    ticketData.content.trim() !== "" &&
    ticketData.type !== "" &&
    ticketData.priority !== "" &&
    ticketData.status !== ""

  useEffect(() => {
    if (name && memberId) {
      setTicketData((prev) => ({
        ...prev,
        requester: {
          id: memberId,
          name: name,
          avatar: name.charAt(0),
        },
      }))
    }
  }, [name, memberId])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getProjectMembers(workspaceName, projectId)
        setMembers(response)
      } catch (error) {
        console.error("멤버 조회 실패:", error)
      }
    }
    fetchMembers()
  }, [workspaceName, projectId])

  useEffect(() => {
    if (template) {
      setTicketData((prev) => ({
        ...prev,
        type: template.type || "",
        title: prev.title || "",
        content: "",
        priority: initialData?.priority || "MEDIUM",
        status: "TODO",
      }))
    }
  }, [template])

  const handleContentChange = (content: string) => {
    setTicketData({ ...ticketData, content })
  }

  const handleAdditionalFieldChange = (key: string, value: any) => {
    setAdditionalFields((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSelfAssign = () => {
    console.log("현재 멤버 목록:", members)
    console.log("현재 로그인 유저:", { email, name })

    if (!members || members.length === 0) {
      toast.error("멤버 목록을 불러오지 못했습니다.")
      return
    }

    const self = members.find((m) => m.email === email || m.name === name)
    console.log("검색된 나:", self)

    if (self) {
      setTicketData((prev) => ({
        ...prev,
        assignee_member_id_list: [self.projectMemberId], // 기존 목록 초기화 후 본인만 설정
      }))
      toast.success("담당자가 나로 설정되었습니다.")
    } else {
      toast.error("현재 멤버 목록에서 본인을 찾을 수 없습니다.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!template) {
      const dto: any = {
        ticket_name: ticketData.title,
        description: ticketData.content,
        ticket_type: ticketData.type,
        ticket_priority: ticketData.priority as any,
        ticket_state: ticketData.status as any,
        start_date: ticketData.start_date,
        end_date: ticketData.end_date,
        assignee_member_id_list: ticketData.assignee_member_id_list,
      }

      if (typeof ticketData.parentTicketId === "number") {
        dto.parent_ticket_id = ticketData.parentTicketId
      }
      try {
        const response = await createTicket(projectName, dto)
        const mappedTicket = mapTicketFromResponse(response)
        onSubmit(mappedTicket)
        toast.success("티켓 생성이 완료되었습니다.")
        onClose()
      } catch (err) {
        console.error("티켓 생성 에러:", err)
        toast.error("티켓 생성에 실패했습니다.")
      }
    } else {
      try {
        const assigneeMemberIdList = ticketData.assignee_member_id_list ?? []

        const allFieldValues = {
          ...ticketData,
          ...additionalFields,
          priority: ticketData.priority,
          ticketState: ticketData.status,
        }
        const dto = mapTemplateToCreateTicketDto(template, allFieldValues, assigneeMemberIdList)
        const response = await createTicket(projectName, dto)
        const mappedTicket = mapTicketFromResponse(response)
        onSubmit(mappedTicket)
        toast.success("티켓 생성이 완료되었습니다.")
        onClose()
      } catch (err) {
        console.error("티켓 생성 에러:", err)
        toast.error("티켓 생성에 실패했습니다.")
      }
    }
  }

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const toggleDropdown = (dropdown: "priority" | "status" | "assignee" | "type", currentState: boolean) => {
    setShowPriorityDropdown(false)
    setShowStatusDropdown(false)
    setShowAssigneeDropdown(false)
    setShowTypeDropdown(false)
    const shouldOpen = !currentState

    switch (dropdown) {
      case "priority":
        setShowPriorityDropdown(shouldOpen)
        if (shouldOpen) scrollToRef(priorityRef)
        break
      case "status":
        setShowStatusDropdown(shouldOpen)
        if (shouldOpen) scrollToRef(statusRef)
        break
      case "assignee":
        setShowAssigneeDropdown(shouldOpen)
        if (shouldOpen) scrollToRef(assigneeRef)
        break
      case "type":
        setShowTypeDropdown(shouldOpen)
        break
    }
  }

  const renderAdditionalFields = () => {
    if (!template) return null

    switch (template.id) {
      case "feature-development":
        return (
          <S.FormRow>
            <S.FormLabel>기대 결과</S.FormLabel>
            <S.EditorWrapper>
              <MarkdownEditor
                initialValue={additionalFields.expectedResult || ""}
                onChange={(value) => handleAdditionalFieldChange("expectedResult", value)}
              />
            </S.EditorWrapper>
          </S.FormRow>
        )

      case "planning-proposal":
        return (
          <S.FormRow>
            <S.FormLabel>제안 내용</S.FormLabel>
            <S.EditorWrapper>
              <MarkdownEditor
                initialValue={additionalFields.proposalContent || ""}
                onChange={(value) => handleAdditionalFieldChange("proposalContent", value)}
              />
            </S.EditorWrapper>
          </S.FormRow>
        )

      case "qa-test":
        return (
          <>
            <S.FormRow>
              <S.FormLabel>테스트 시나리오</S.FormLabel>
              <S.EditorWrapper>
                <MarkdownEditor
                  initialValue={additionalFields.testScenario || ""}
                  onChange={(value) => handleAdditionalFieldChange("testScenario", value)}
                />
              </S.EditorWrapper>
            </S.FormRow>
            <S.FormRow>
              <S.FormLabel>예상 결과</S.FormLabel>
              <S.EditorWrapper>
                <MarkdownEditor
                  initialValue={additionalFields.expectedResult || ""}
                  onChange={(value) => handleAdditionalFieldChange("expectedResult", value)}
                />
              </S.EditorWrapper>
            </S.FormRow>
          </>
        )

      case "bug-report":
        return (
          <>
            <S.FormRow>
              <S.FormLabel>재현 절차</S.FormLabel>
              <S.EditorWrapper>
                <MarkdownEditor
                  initialValue={additionalFields.reproductionSteps || ""}
                  onChange={(value) => handleAdditionalFieldChange("reproductionSteps", value)}
                />
              </S.EditorWrapper>
            </S.FormRow>
            <S.FormRow>
              <S.FormLabel>기대 결과 <br /> vs <br />실제 결과</S.FormLabel>
              <S.EditorWrapper>
                <MarkdownEditor
                  initialValue={additionalFields.expectedVsActual || ""}
                  onChange={(value) => handleAdditionalFieldChange("expectedVsActual", value)}
                />
              </S.EditorWrapper>
            </S.FormRow>
            <S.FormRow>
              <S.FormLabel>발생 환경 정보</S.FormLabel>
              <S.TextField
                placeholder="브라우저, OS, 버전 등 환경 정보를 입력하세요"
                value={additionalFields.environment || ""}
                onChange={(e) => handleAdditionalFieldChange("environment", e.target.value)}
              />
            </S.FormRow>
          </>
        )

      case "meeting-scrum":
        return (
          <S.FormRow>
            <S.FormLabel>회의 내용 요약</S.FormLabel>
            <S.EditorWrapper>
              <MarkdownEditor
                initialValue={additionalFields.description || ""}
                onChange={(value) =>
                  handleAdditionalFieldChange("description", value)
                }
              />
            </S.EditorWrapper>
          </S.FormRow>
        )

      case "data-analysis":
        return (
          <>
            <S.FormRow>
              <S.FormLabel>필요한 데이터 항목</S.FormLabel>
              <S.EditorWrapper>
                <MarkdownEditor
                  initialValue={additionalFields.dataItems || ""}
                  onChange={(value) => handleAdditionalFieldChange("dataItems", value)}
                />
              </S.EditorWrapper>
            </S.FormRow>
            <S.FormRow>
              <S.FormLabel>분석 결과 링크</S.FormLabel>
              <S.TextField
                placeholder="분석 결과 링크 (완료 후 입력)"
                value={additionalFields.resultLink || ""}
                onChange={(e) => handleAdditionalFieldChange("resultLink", e.target.value)}
              />
            </S.FormRow>
          </>
        )

      default:
        return null
    }
  }

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>{template ? `${template.name} 티켓 등록` : "티켓 등록"}</S.ModalTitle>
        </S.ModalHeader>

        <S.ModalContent>
          <S.Form onSubmit={handleSubmit}>
            {/* 템플릿이 있는 경우 유형을 표시만 하고, 없는 경우 드롭다운 표시 */}
            {template ? (
              <S.FormRow>
                <S.FormLabel>유형</S.FormLabel>
                <S.TypeDisplay>{template.name}</S.TypeDisplay>
              </S.FormRow>
            ) : (
              <S.FormRow>
                <S.FormLabel>유형</S.FormLabel>
                <S.SelectField onClick={() => toggleDropdown("type", showTypeDropdown)}>
                  <S.AssigneeText>{ticketData.type || "유형 선택"}</S.AssigneeText>
                  <ChevronDown size={16} />
                  {showTypeDropdown && (
                    <S.DropdownMenu>
                      {TYPE_OPTIONS.map((type) => (
                        <S.DropdownItem
                          key={type}
                          onClick={() => {
                            setTicketData({ ...ticketData, type })
                            setShowTypeDropdown(false)
                          }}
                        >
                          {type}
                        </S.DropdownItem>
                      ))}
                    </S.DropdownMenu>
                  )}
                </S.SelectField>
              </S.FormRow>
            )}

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
                <MarkdownEditor initialValue={ticketData.content} onChange={handleContentChange} />
              </S.EditorWrapper>
            </S.FormRow>

            {renderAdditionalFields()}

            <S.FormRow>
              <S.FormLabel>기간</S.FormLabel>
              <S.DateRangeWrapper>
                <S.DateField
                  type="date"
                  value={ticketData.start_date}
                  onChange={(e) => setTicketData({ ...ticketData, start_date: e.target.value })}
                />
                <span>~</span>
                <S.DateField
                  type="date"
                  value={ticketData.end_date}
                  onChange={(e) => setTicketData({ ...ticketData, end_date: e.target.value })}
                />
              </S.DateRangeWrapper>
            </S.FormRow>

            <S.FormRow ref={priorityRef}>
              <S.FormLabel>우선 순위</S.FormLabel>
              <S.SelectField onClick={() => toggleDropdown("priority", showPriorityDropdown)}>
                <PriorityBadge priority={ticketData.priority as any} />
                <ChevronDown size={16} />
                {showPriorityDropdown && (
                  <S.DropdownMenu>
                    {PRIORITY_OPTIONS.map((priority) => (
                      <S.DropdownItem
                        key={priority}
                        onClick={() => {
                          setTicketData({ ...ticketData, priority })
                          setShowPriorityDropdown(false)
                        }}
                      >
                        <PriorityBadge priority={priority as any} />
                      </S.DropdownItem>
                    ))}
                  </S.DropdownMenu>
                )}
              </S.SelectField>
            </S.FormRow>

            <S.FormRow ref={statusRef}>
              <S.FormLabel>상태</S.FormLabel>
              <S.SelectField onClick={() => toggleDropdown("status", showStatusDropdown)}>
                <StatusBadge status={ticketData.status as any} />
                <ChevronDown size={16} />
                {showStatusDropdown && (
                  <S.DropdownMenu>
                    {STATUS_OPTIONS.map((status) => (
                      <S.DropdownItem
                        key={status}
                        onClick={(e) => {
                          e.stopPropagation()
                          setTicketData({ ...ticketData, status })
                          setShowStatusDropdown(false)
                        }}
                      >
                        <StatusBadge status={status as any} />
                      </S.DropdownItem>
                    ))}
                  </S.DropdownMenu>
                )}
              </S.SelectField>
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>요청자</S.FormLabel>
              <S.SelectField>
                <S.UserOption>
                  <S.UserAvatar>{ticketData.requester.avatar}</S.UserAvatar>
                  <S.UserName>{ticketData.requester.name}</S.UserName>
                </S.UserOption>
              </S.SelectField>
            </S.FormRow>

            <S.FormRow ref={assigneeRef}>
              <S.FormLabel>담당자</S.FormLabel>
              <S.SelectField onClick={() => toggleDropdown("assignee", showAssigneeDropdown)}>
                {(() => {
                  const assignees = members.filter((m) =>
                    ticketData.assignee_member_id_list?.includes(m.projectMemberId)
                  )

                  return assignees.length > 0 ? (
                    assignees.map((assignee) => (
                      <S.UserOption key={assignee.projectMemberId}>
                        <S.UserAvatar>{assignee.name.charAt(0)}</S.UserAvatar>
                        <S.UserName>{assignee.name}</S.UserName>
                      </S.UserOption>
                    ))
                  ) : (
                    <S.AssigneeText>담당자 선택</S.AssigneeText>
                  )
                })()}

                <ChevronDown size={16} />
                {showAssigneeDropdown && (
                  <S.DropdownMenu>
                    {members.map((member) => (
                      <S.DropdownItem
                        key={member.projectMemberId}
                        onClick={() => {
                          const selected = ticketData.assignee_member_id_list ?? []
                          const alreadySelected = selected.includes(member.projectMemberId)
                          const updatedList = alreadySelected
                            ? selected.filter((id) => id !== member.projectMemberId)
                            : [...selected, member.projectMemberId]

                          setTicketData({
                            ...ticketData,
                            assignee_member_id_list: updatedList,
                          })
                        }}
                      >
                        <S.UserOption>
                          <S.UserAvatar>{member.name.charAt(0)}</S.UserAvatar>
                          <S.UserName>
                            {member.name} {ticketData.assignee_member_id_list?.includes(member.projectMemberId) ? "(선택됨)" : ""}
                          </S.UserName>
                        </S.UserOption>
                      </S.DropdownItem>

                    ))}
                  </S.DropdownMenu>
                )}
              </S.SelectField>
            </S.FormRow>
            <S.AssigneeButton onClick={handleSelfAssign}>나에게 할당</S.AssigneeButton>
          </S.Form>
        </S.ModalContent>

        <S.ModalFooter>
          <S.CancelButton type="button" onClick={onClose}>
            취소
          </S.CancelButton>
          <S.SubmitButton
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={!isFormValid ? "disabled" : ""}
          >
            등록
          </S.SubmitButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  )
}
