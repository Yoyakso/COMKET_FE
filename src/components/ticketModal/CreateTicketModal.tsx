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
import { Ticket } from '@/types/ticket';

interface Member {
  memberId: number
  name: string
  projectMemberId: number
}

interface CreateTicketModalProps {
  onClose: () => void
  onSubmit: (ticketData: any) => void
  projectName: string
  projectId: number
  parentTicketId?: number
}

const TYPE_OPTIONS = ["개발", "디자인", "기획", "테스트", "버그", "회의/논의", "문서화", "기타"];
const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH"];
const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE", "HOLD", "DROP", "BACKLOG"];

export const CreateTicketModal = ({ onClose, onSubmit, projectName, projectId, parentTicketId }: CreateTicketModalProps) => {
  const workspaceName = useWorkspaceStore((state) => state.workspaceName)
  const [members, setMembers] = useState<Member[]>([])
  const { name, memberId } = useUserStore()
  const [ticketData, setTicketData] = useState({
    type: "",
    title: "",
    content: "",
    priority: "",
    status: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    assignee_member_id: null as number | null,
    requester: {
      id: memberId,
      name: name,
      avatar: name ? name.charAt(0) : "?",
    },
    parentTicketId: parentTicketId ?? null,
  })
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const priorityRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const assigneeRef = useRef<HTMLDivElement>(null);
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
      }));
    }
  }, [name, memberId]);

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

  const handleContentChange = (content: string) => {
    setTicketData({ ...ticketData, content })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("제출 데이터:", ticketData);
    const dto: any = {
      ticket_name: ticketData.title,
      description: ticketData.content,
      ticket_type: ticketData.type,
      ticket_priority: ticketData.priority as any,
      ticket_state: ticketData.status as any,
      start_date: ticketData.start_date,
      end_date: ticketData.end_date,
      assignee_member_id: ticketData.assignee_member_id,
    };
    if (typeof ticketData.parentTicketId === "number") {
      dto.parent_ticket_id = ticketData.parentTicketId;
    }
    console.log("dto", dto)
    try {
      const response = await createTicket(projectName, dto);
      const mappedTicket: Ticket = {
        id: response.id,
        title: response.ticket_name,
        description: response.description,
        type: response.ticket_type,
        priority: response.ticket_priority,
        status: response.ticket_state,
        startDate: response.start_date,
        endDate: response.end_date,
        subticketCount: 0,
        subtickets: [],
        parentId: response.parent_ticket_id,
        threadCount: 0,
        assignee: {
          name: members.find(m => m.projectMemberId === ticketData.assignee_member_id)?.name || '',
          email: '',
          profileUrl: '',
          nickname: ''
        },
        writer: {
          name: ticketData.requester.name,
          email: '',
          profileUrl: '',
          nickname: ''
        }
      };
      onSubmit(mappedTicket);
      toast.success("티켓 생성이 완료되었습니다.")
      onClose();
    } catch (err) {
      console.error("티켓 생성 에러:", err);
    }
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toggleDropdown = (
    dropdown: "type" | "priority" | "status" | "assignee",
    currentState: boolean
  ) => {
    setShowTypeDropdown(false);
    setShowPriorityDropdown(false);
    setShowStatusDropdown(false);
    setShowAssigneeDropdown(false);
    const shouldOpen = !currentState;

    switch (dropdown) {
      case "type":
        setShowTypeDropdown(shouldOpen);
        if (shouldOpen) scrollToRef(typeRef);
        break;
      case "priority":
        setShowPriorityDropdown(shouldOpen);
        if (shouldOpen) scrollToRef(priorityRef);
        break;
      case "status":
        setShowStatusDropdown(shouldOpen);
        if (shouldOpen) scrollToRef(statusRef);
        break;
      case "assignee":
        setShowAssigneeDropdown(shouldOpen);
        if (shouldOpen) scrollToRef(assigneeRef);
        break;
    }
  };

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>티켓 등록</S.ModalTitle>
        </S.ModalHeader>

        <S.ModalContent>
          <S.Form onSubmit={handleSubmit}>
            <S.FormRow ref={typeRef}>
              <S.FormLabel>유형</S.FormLabel>
              <S.SelectField onClick={() => toggleDropdown("type", showTypeDropdown)}>
                <S.AssigneeText>
                  {ticketData.type || "유형 선택"}
                </S.AssigneeText>
                <ChevronDown size={16} />
                {showTypeDropdown && (
                  <S.DropdownMenu>
                    {TYPE_OPTIONS.map((type) => (
                      <S.DropdownItem
                        key={type}
                        onClick={() => {
                          setTicketData({ ...ticketData, type });
                          setShowTypeDropdown(false);
                        }}
                      >
                        {type}
                      </S.DropdownItem>
                    ))}
                  </S.DropdownMenu>
                )}
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
              <S.FormLabel>기간</S.FormLabel>
              <S.DateRangeWrapper>
                <S.DateField
                  type="date"
                  value={ticketData.start_date}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, start_date: e.target.value })
                  }
                />
                <span>~</span>
                <S.DateField
                  type="date"
                  value={ticketData.end_date}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, end_date: e.target.value })
                  }
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
                          setTicketData({ ...ticketData, priority });
                          setShowPriorityDropdown(false);
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
                          e.stopPropagation();
                          setTicketData({ ...ticketData, status });
                          setShowStatusDropdown(false);
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
                  <S.UserName>
                    {ticketData.requester.name}
                  </S.UserName>
                </S.UserOption>
              </S.SelectField>
            </S.FormRow>

            <S.FormRow ref={assigneeRef}>
              <S.FormLabel>담당자</S.FormLabel>
              <S.SelectField onClick={() => toggleDropdown("assignee", showAssigneeDropdown)}>
                {(() => {
                  const assignee = members.find(m => m.projectMemberId === ticketData.assignee_member_id);
                  return assignee ? (
                    <S.UserOption>
                      <S.UserAvatar>{assignee.name.charAt(0)}</S.UserAvatar>
                      <S.UserName>{assignee.name}</S.UserName>
                    </S.UserOption>
                  ) : (
                    <S.AssigneeText>담당자 선택</S.AssigneeText>
                  );
                })()}
                <ChevronDown size={16} />
                {showAssigneeDropdown && (
                  <S.DropdownMenu>
                    {members.map((member) => (
                      <S.DropdownItem
                        key={member.projectMemberId}
                        onClick={() => {
                          setTicketData({ ...ticketData, assignee_member_id: member.projectMemberId });
                          setShowAssigneeDropdown(false);
                        }}
                      >
                        <S.UserOption>
                          <S.UserAvatar>{member.name.charAt(0)}</S.UserAvatar>
                          <S.UserName>{member.name}</S.UserName>
                        </S.UserOption>
                      </S.DropdownItem>
                    ))}
                  </S.DropdownMenu>
                )}
              </S.SelectField>
            </S.FormRow>
          </S.Form>
        </S.ModalContent>

        <S.ModalFooter>
          <S.CancelButton type="button" onClick={onClose}>
            취소
          </S.CancelButton>
          <S.SubmitButton type="submit" onClick={handleSubmit} disabled={!isFormValid} className={!isFormValid ? "disabled" : ""}>
            등록
          </S.SubmitButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  )
}
