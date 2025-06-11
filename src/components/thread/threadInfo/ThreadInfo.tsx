import { CheckCircle, Tag, User, Calendar, Pencil, Save, X } from "lucide-react"
import * as S from "./ThreadInfo.Style"
import { StatusBadge } from "@components/ticket/StatusBadge"
import { useNavigate, useParams } from "react-router-dom"
import { PriorityBadge } from "@/components/ticket/PriorityBadge"
import { useState, useEffect, useMemo } from "react"
import { toast } from "react-toastify"
import { editSingleTicket, getTicketById, getTicketByProjectId } from "@/api/Ticket"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getProjectMembers } from "@/api/Project"
import { useWorkspaceStore } from "@/stores/workspaceStore"
import { MarkdownEditor } from "@/components/common/markdownEditor/MarkdownEditor"
import { marked } from "marked"
import { TICKET_TEMPLATE_DATA } from "@/constants/ticketTemplateData"
import type { Ticket } from "@/types/ticket"
import { mapTicketFromResponse } from "@/utils/ticketMapper"

interface TicketUpdatePayload {
  ticket_name: string
  ticket_type: string
  ticket_priority: string
  ticket_state: string
  start_date: string
  end_date: string
  description: string
  assignee_member_id_list: number[] | null
  parent_ticket_id: number | null
}

interface ThreadInfoProps {
  projectName?: string
  ticket: Ticket | null
  onUpdateTicket?: (updated: Ticket) => void
}

export const ThreadInfo = ({ projectName, ticket, onUpdateTicket }: ThreadInfoProps) => {
  const { projectId, ticketId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    data: fetchedTicket,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: async () => {
      return getTicketByProjectId(Number(ticketId), Number(projectId));
    },
    enabled: !!ticketId && !!projectId,
    select: (data: any) => ({
      ...data,
      title: data.ticket_name,
      type: data.ticket_type,
      priority: data.ticket_priority,
      status: data.ticket_state,
      startDate: data.start_date,
      endDate: data.end_date,
      parentId: data.parent_ticket_id,
      subtickets: data.subtickets || [],
    }),
  });

  const { workspaceName } = useWorkspaceStore()
  const {
    data: projectMembers = [],
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useQuery({
    queryKey: ["projectMembers", projectId],
    queryFn: () => getProjectMembers(workspaceName, Number(projectId)),
    enabled: !!projectId,
  })

  const [isEditMode, setIsEditMode] = useState(false)
  const [editedTicket, setEditedTicket] = useState<TicketUpdatePayload | null>(null)
  const [editedAdditionalInfo, setEditedAdditionalInfo] = useState<Record<string, string>>({})

  useEffect(() => {
    if (fetchedTicket) {
      setEditedTicket({
        ticket_name: fetchedTicket.title,
        ticket_type: fetchedTicket.type,
        ticket_priority: fetchedTicket.priority,
        ticket_state: fetchedTicket.status,
        start_date: fetchedTicket.startDate,
        end_date: fetchedTicket.endDate,
        description: fetchedTicket.description,
        assignee_member_id_list: fetchedTicket.assignee_member_list?.projectMemberId ?? null,
        parent_ticket_id: fetchedTicket.parentId ?? null,
      })
    }
  }, [fetchedTicket])

  useEffect(() => {
    if (fetchedTicket?.additional_info) {
      setEditedAdditionalInfo({ ...fetchedTicket.additional_info })
    }
  }, [fetchedTicket])

  marked.setOptions({
    breaks: true,
  });

  const mutation = useMutation<void, Error, TicketUpdatePayload>({
    mutationFn: () =>
      editSingleTicket(Number(ticketId), projectName, {
        ...editedTicket,
        additional_info: editedAdditionalInfo,
      }),
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] })

    //   // const updatedRaw = await getTicketById(Number(ticketId), projectName);
    //   const updatedRaw = projectName
    //     ? await getTicketById(Number(ticketId), projectName)
    //     : await getTicketByProjectId(Number(ticketId), Number(projectId));

    //   const mapped = mapTicketFromResponse(updatedRaw);

    //   onUpdateTicket?.(mapped);
    //   if (mapped.additional_info) {
    //     setEditedAdditionalInfo({ ...mapped.additional_info });
    //   }
    //   setIsEditMode(false)
    //   toast.success("정보가 수정되었습니다.")
    // },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });

      const updatedRaw = await getTicketByProjectId(Number(ticketId), Number(projectId));
      const mapped = mapTicketFromResponse(updatedRaw);

      onUpdateTicket?.(mapped);
      if (mapped.additional_info) {
        setEditedAdditionalInfo({ ...mapped.additional_info });
      }
      setIsEditMode(false);
      toast.success("정보가 수정되었습니다.");
    },

    onError: () => {
      toast.error("정보 수정에 실패했습니다. 다시 시도해주세요.")
    },
  })

  const handleSave = () => {
    if (!editedTicket) return
    mutation.mutate(editedTicket)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    if (fetchedTicket) {
      setEditedTicket({
        ticket_name: fetchedTicket.title,
        ticket_type: fetchedTicket.type,
        ticket_priority: fetchedTicket.priority,
        ticket_state: fetchedTicket.status,
        start_date: fetchedTicket.startDate,
        end_date: fetchedTicket.endDate,
        description: fetchedTicket.description,
        assignee_member_id_list: fetchedTicket.assignee_member_list?.projectMemberId ?? null,
        parent_ticket_id: fetchedTicket.parentId ?? null,
      })
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "YYYY-MM-DD (W)"
    const date = new Date(dateString)
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"]
    const weekday = weekdays[date.getDay()]
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} (${weekday})`
  }

  const handleAdditionalInfoChange = (key: string, value: string) => {
    setEditedAdditionalInfo((prev) => ({ ...prev, [key]: value }))
  }

  // 1. projectMemberId → profileUri 매핑 Map 생성
  const profileMap = useMemo(() => {
    const map = new Map<number, string>()
    projectMembers.forEach((member) => {
      if (member.profileUri) {
        map.set(member.projectMemberId, member.profileUri)
      }
    })
    return map
  }, [projectMembers])

  // 2. assignee_member_list에 profileUri 매핑
  const enrichedAssignees = useMemo(() => {
    const assignees = fetchedTicket?.assignee_member_list ?? [];
    return assignees.map((assignee) => {
      const matched = projectMembers.find((pm) => pm.projectMemberId === assignee.projectMemberId);
      return {
        ...assignee,
        profileUri: matched?.profileUri ?? null,
      };
    });
  }, [fetchedTicket?.assignee_member_list, projectMembers]);

  // 3. creator_member에 profileUri 매핑
  const enrichedCreator = useMemo(() => {
    const member = fetchedTicket?.creator_member
    if (!member) return null
    return {
      ...member,
      profileUri: member.profileUri || profileMap.get(member.projectMemberId) || null,
    }
  }, [fetchedTicket?.creator_member, profileMap])

  if (isLoading) return <div>불러오는 중...</div>
  if (isError || !fetchedTicket || !editedTicket) return <div>티켓 정보를 불러오지 못했습니다.</div>
  const currentTemplate = TICKET_TEMPLATE_DATA.find((t) => t.name === fetchedTicket.type)

  return (
    <S.Container>
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>상세 정보</S.SectionTitle>
          <S.EditButton onClick={() => setIsEditMode((prev) => !prev)}>
            <Pencil size={16} />
          </S.EditButton>
        </S.SectionHeader>

        {isEditMode && (
          <S.DescriptionSection style={{ width: "61%" }}>
            <S.InfoTitle style={{ marginBottom: 10 }}>티켓 제목</S.InfoTitle>
            <S.StyledInput
              type="text"
              value={editedTicket.ticket_name}
              onChange={(e) => setEditedTicket({ ...editedTicket, ticket_name: e.target.value })}
              placeholder="티켓 제목을 입력하세요"
            />
          </S.DescriptionSection>
        )}

        <S.InfoGrid style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <S.InfoSection>
            <S.InfoTitle>
              <Tag size={14} />
              유형
            </S.InfoTitle>
            <S.InfoContent>
              <S.TypeContainer>
                <S.TagBadge>{fetchedTicket.type}</S.TagBadge>
                {isEditMode ? (
                  <S.StyledSelect
                    value={editedTicket.ticket_priority}
                    onChange={(e) => setEditedTicket({ ...editedTicket, ticket_priority: e.target.value })}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </S.StyledSelect>
                ) : (
                  <PriorityBadge priority={fetchedTicket.priority} />
                )}
              </S.TypeContainer>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>상태</S.InfoTitle>
            <S.InfoContent>
              <S.StatusBadgeContainer>
                {isEditMode ? (
                  <S.StyledSelect
                    value={editedTicket.ticket_state}
                    onChange={(e) => setEditedTicket({ ...editedTicket, ticket_state: e.target.value })}
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </S.StyledSelect>
                ) : (
                  <StatusBadge status={fetchedTicket.status} />
                )}
              </S.StatusBadgeContainer>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <Calendar size={14} />
              시작 일자
            </S.InfoTitle>
            <S.InfoContent>
              {isEditMode ? (
                <S.StyledInput
                  type="date"
                  value={editedTicket.start_date}
                  onChange={(e) => setEditedTicket({ ...editedTicket, start_date: e.target.value })}
                />
              ) : (
                <S.DateText>{formatDate(fetchedTicket.startDate)}</S.DateText>
              )}
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <User size={14} />
              담당자
            </S.InfoTitle>
            {isEditMode ? (
              <div>
                {/* 선택된 담당자들 표시 */}
                <S.SelectedAssigneesDisplay>
                  {(editedTicket.assignee_member_id_list || []).length > 0 ? (
                    projectMembers
                      .filter((member) =>
                        (editedTicket.assignee_member_id_list || []).includes(member.projectMemberId),
                      )
                      .map((member) => (
                        <S.SelectedAssigneeTag key={member.projectMemberId}>
                          <S.SelectedAssigneeAvatar>
                            {member.profileFileUri ? (
                              <S.SelectedAssigneeAvatarImage src={member.profileFileUri} alt={member.name} />
                            ) : (
                              member.name?.slice(0, 2) || "미"
                            )}
                          </S.SelectedAssigneeAvatar>
                          {member.name}
                          <S.RemoveAssigneeButton
                            onClick={() => {
                              const newIds = (editedTicket.assignee_member_id_list || []).filter(
                                (id) => id !== member.projectMemberId,
                              )
                              setEditedTicket({ ...editedTicket, assignee_member_id_list: newIds })
                            }}
                          >
                            <X size={12} />
                          </S.RemoveAssigneeButton>
                        </S.SelectedAssigneeTag>
                      ))
                  ) : (
                    <S.SelectLabel>담당자를 선택하세요 (Ctrl/Cmd + 클릭으로 다중선택)</S.SelectLabel>
                  )}
                </S.SelectedAssigneesDisplay>

                {/* 개선된 다중선택 드롭다운 */}
                <S.StyledSelect
                  multiple
                  size={projectMembers.length > 6 ? 6 : projectMembers.length}
                  value={editedTicket.assignee_member_id_list?.map(String) || []}
                  onChange={(e) => {
                    const selectedIds = Array.from(e.target.selectedOptions).map((opt) => Number(opt.value))
                    setEditedTicket({ ...editedTicket, assignee_member_id_list: selectedIds })
                  }}
                >
                  {projectMembers.map((member) => (
                    <option key={member.projectMemberId} value={member.projectMemberId}>
                      {member.name}
                    </option>
                  ))}
                </S.StyledSelect>
              </div>
            ) : (
              <S.UserDisplay>
                {enrichedAssignees.map((member) => (
                  <S.AssigneeWrapper key={member.projectMemberId}>
                    <S.SmallAvatar>
                      {member.profileUri ? (
                        <S.AvatarImage src={member.profileUri} alt={member.name} />
                      ) : (
                        member.name?.slice(0, 2) || "미"
                      )}
                    </S.SmallAvatar>
                    <S.UserInfo>{member.name}</S.UserInfo>
                  </S.AssigneeWrapper>
                ))}
              </S.UserDisplay>

            )}
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <User size={16} />
              요청자
            </S.InfoTitle>
            <S.InfoContent>
              <S.UserDisplay>
                <S.SmallAvatar>
                  <S.AvatarImage
                    src={enrichedCreator?.profileUri || "/images/avatar-me.png"}
                    alt={enrichedCreator?.name || "미지정"}
                  />
                </S.SmallAvatar>
                <S.UserInfo>
                  <span>{fetchedTicket.creator_member?.name || "미지정"}</span>
                </S.UserInfo>
              </S.UserDisplay>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>
              <Calendar size={14} />
              마감 일자
            </S.InfoTitle>
            <S.InfoContent>
              {isEditMode ? (
                <S.StyledInput
                  type="date"
                  value={editedTicket.end_date}
                  onChange={(e) => setEditedTicket({ ...editedTicket, end_date: e.target.value })}
                />
              ) : (
                <S.DateText>{formatDate(fetchedTicket.endDate)}</S.DateText>
              )}
            </S.InfoContent>
          </S.InfoSection>
        </S.InfoGrid>

        <S.DescriptionSection>
          <S.InfoTitle style={{ marginLeft: 10 }}>상세 내용</S.InfoTitle>
          <S.DetailContent>
            {isEditMode ? (
              <MarkdownEditor
                initialValue={editedTicket.description}
                onChange={(value) => setEditedTicket({ ...editedTicket, description: value })}
              />
            ) : fetchedTicket.description ? (
              <div dangerouslySetInnerHTML={{ __html: marked(fetchedTicket.description) }} />
            ) : (
              <S.PlaceholderText>상세 내용이 없습니다.</S.PlaceholderText>
            )}
          </S.DetailContent>
        </S.DescriptionSection>

        {currentTemplate && fetchedTicket.additional_info && (
          <S.DescriptionSection>
            {currentTemplate.fields.map((field) => {
              const snakeKey = field.key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
              const value = fetchedTicket.additional_info[snakeKey]

              if (
                [
                  "title",
                  "priority",
                  "description",
                  "ticketType",
                  "startDate",
                  "endDate",
                  "assignee",
                  "creator",
                ].includes(field.key)
              ) {
                return null
              }

              return (
                <S.InfoSection key={snakeKey} style={{ marginBottom: 10 }}>
                  <S.InfoTitle style={{ marginLeft: 10 }}>{field.label}</S.InfoTitle>
                  <S.AdditionalInfoContent>
                    {isEditMode ? (
                      <MarkdownEditor
                        initialValue={value || ""}
                        onChange={(val) => handleAdditionalInfoChange(snakeKey, val)}
                      />
                    ) : value ? (
                      <div dangerouslySetInnerHTML={{ __html: marked(value) }} />
                    ) : (
                      <S.PlaceholderText>입력된 값이 없습니다.</S.PlaceholderText>
                    )}
                  </S.AdditionalInfoContent>
                </S.InfoSection>
              )
            })}
          </S.DescriptionSection>
        )}

        {isEditMode && (
          <S.ButtonContainer>
            <S.SaveButton onClick={handleSave} disabled={mutation.isPending}>
              <Save size={16} />
              {mutation.isPending ? "저장 중..." : "저장"}
            </S.SaveButton>
            <S.CancelButton onClick={handleCancel}>
              <X size={16} />
              취소
            </S.CancelButton>
          </S.ButtonContainer>
        )}
      </S.Section>

      {ticket?.subtickets && ticket.subtickets.length > 0 && (
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>하위 티켓</S.SectionTitle>
          </S.SectionHeader>
          <S.SubticketList>
            {ticket.subtickets.map((childTicket) => (
              <S.SubticketItem
                key={childTicket.id}
                onClick={() =>
                  navigate(`/${projectId}/tickets/${childTicket.id}/thread`, {
                    state: { ticket: childTicket, projectName },
                  })
                }
              >
                <CheckCircle size={14} />
                <span>{childTicket.title}</span>
              </S.SubticketItem>
            ))}
          </S.SubticketList>
        </S.Section>
      )}
    </S.Container>
  )
}
