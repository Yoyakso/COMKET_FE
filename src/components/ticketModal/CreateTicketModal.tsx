import { useState, useEffect } from "react"
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
}

const TYPE_OPTIONS = ["개발", "디자인", "기획", "테스트"]; // 임시 지정
const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH", "URGENT"];
const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE", "HOLD", "DROP", "BACKLOG", "DELETED"];

export const CreateTicketModal = ({ onClose, onSubmit, projectName, projectId }: CreateTicketModalProps) => {
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
    assignee_member_id: null as number | null, // 임시 지정
    requester: {
      id: memberId,
      name: name,
      avatar: name ? name.charAt(0) : "?",
    },
  })
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

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

    if (!ticketData.assignee_member_id) {
      toast.error("담당자를 선택해주세요.");
      return;
    }
    console.log("제출 데이터:", ticketData);
    const dto = {
      ticket_name: ticketData.title,
      description: ticketData.content,
      ticket_type: ticketData.type,
      ticket_priority: ticketData.priority as any,
      ticket_state: ticketData.status as any,
      start_date: ticketData.start_date,
      end_date: ticketData.end_date,
      parent_ticket_id: null,
      assignee_member_id: ticketData.assignee_member_id,
    };
    console.log("dto", dto)
    try {
      const response = await createTicket(projectName, dto);
      onSubmit(response);
      toast.success("티켓 생성이 완료되었습니다.")
      onClose();
    } catch (err) {
      console.error("티켓 생성 에러:", err);
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
            <S.FormRow>
              <S.FormLabel>유형</S.FormLabel>
              <S.SelectField>
                <select
                  value={ticketData.type}
                  onChange={(e) => setTicketData({ ...ticketData, type: e.target.value })}
                >
                  <option value="">선택</option>
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
              <S.SelectField onClick={() => setShowPriorityDropdown((prev) => !prev)}>
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

            <S.FormRow>
              <S.FormLabel>상태</S.FormLabel>
              <S.SelectField onClick={() => setShowStatusDropdown((prev) => !prev)}>
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
                    {ticketData.requester.name} [{ticketData.requester.id}]
                  </S.UserName>
                </S.UserOption>
                <ChevronDown size={16} />
              </S.SelectField>
            </S.FormRow>

            <S.FormRow>
              <S.FormLabel>담당자</S.FormLabel>
              <S.SelectField onClick={() => setShowAssigneeDropdown(prev => !prev)}>
                <S.AssigneeText>
                  {
                    members.find((m) => m.projectMemberId === ticketData.assignee_member_id)?.name || "담당자 선택"
                  }
                </S.AssigneeText>
                <ChevronDown size={16} />
                {showAssigneeDropdown && (
                  <S.DropdownMenu>
                    {members.map((member) => (
                      <S.DropdownItem
                        key={member.projectMemberId}
                        onClick={() => {
                          setTicketData({ ...ticketData, assignee_member_id: member.projectMemberId });
                          setShowAssigneeDropdown(false); // 자동 닫힘
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
          <S.SubmitButton type="submit" onClick={handleSubmit}>
            등록
          </S.SubmitButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalOverlay>
  )
}
