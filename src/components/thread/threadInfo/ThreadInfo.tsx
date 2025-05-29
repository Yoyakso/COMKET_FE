import { CheckCircle, Tag, User, FileText, Calendar, Pencil } from "lucide-react";
import * as S from "./ThreadInfo.Style";
import { StatusBadge } from "@components/ticket/StatusBadge";
import { useNavigate, useParams } from "react-router-dom";
import { PriorityBadge } from "@/components/ticket/PriorityBadge";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { editSingleTicket, getTicketById } from "@/api/Ticket";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TicketUpdatePayload {
  ticket_name: string;
  ticket_type: string;
  ticket_priority: string;
  ticket_state: string;
  start_date: string;
  end_date: string;
  description: string;
  assignee_member_id: number | null;
  parent_ticket_id: number | null;
}

export const ThreadInfo = ({ projectName }: { projectName: string }) => {
  const { projectId, ticketId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: ticket,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getTicketById(Number(ticketId), projectName),
    enabled: !!ticketId && !!projectName,
    select: (data: any) => ({
      ...data,
      title: data.ticket_name,
      type: data.ticket_type,
      priority: data.ticket_priority,
      status: data.ticket_state,
      startDate: data.start_date,
      endDate: data.end_date,
      parentId: data.parent_ticket_id,
    }),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTicket, setEditedTicket] = useState<TicketUpdatePayload | null>(null);
  useEffect(() => {
    if (ticket) {
      setEditedTicket({
        ticket_name: ticket.title,
        ticket_type: ticket.type,
        ticket_priority: ticket.priority,
        ticket_state: ticket.status,
        start_date: ticket.startDate,
        end_date: ticket.endDate,
        description: ticket.description,
        assignee_member_id: ticket.assignee_member?.projectMemberId ?? null,
        parent_ticket_id: ticket.parentId ?? null,
      });
    }
  }, [ticket]);

  const mutation = useMutation({
    mutationFn: (updatedFields: TicketUpdatePayload) =>
      editSingleTicket(Number(ticketId), projectName, updatedFields),
    onSuccess: () => {
      toast.success("수정 완료!");
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      setIsEditMode(false);
    },
    onError: () => {
      toast.error("수정 실패!");
    },
  });

  const handleSave = () => {
    if (!editedTicket) return;
    mutation.mutate(editedTicket);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "YYYY-MM-DD (W)";
    const date = new Date(dateString);
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} (${weekday})`;
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0KB";
    const kb = bytes / 1024;
    return `${Math.round(kb)}KB`;
  };

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !ticket || !editedTicket) return <div>티켓 정보를 불러오지 못했습니다.</div>;

  return (
    <S.Container>
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>상세 정보</S.SectionTitle>
          <S.EditButton onClick={() => setIsEditMode((prev) => !prev)}>
            <Pencil size={16} />
          </S.EditButton>
        </S.SectionHeader>

        <S.InfoGrid style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <S.InfoSection>
            <S.InfoTitle><Tag size={14} />유형</S.InfoTitle>
            <S.InfoContent>
              <S.TypeContainer>
                <S.TagBadge>{ticket.type}</S.TagBadge>
                {isEditMode ? (
                  <select
                    value={editedTicket.ticket_priority}
                    onChange={(e) => setEditedTicket({ ...editedTicket, ticket_priority: e.target.value })}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                ) : (
                  <PriorityBadge priority={ticket.priority} />
                )}
              </S.TypeContainer>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle>상태</S.InfoTitle>
            <S.InfoContent>
              <S.StatusBadgeContainer>
                <StatusBadge status={ticket.status} />
              </S.StatusBadgeContainer>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle><Calendar size={14} />시작 일자</S.InfoTitle>
            <S.InfoContent>
              <S.DateText>{formatDate(ticket.startDate)}</S.DateText>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle><User size={14} />담당자</S.InfoTitle>
            <S.InfoContent>
              <S.UserDisplay>
                <S.SmallAvatar>
                  <S.AvatarImage src={ticket.assignee_member?.profileUrl || "/images/avatar-1.png"} alt={ticket.assignee_member?.name || "미배정"} />
                </S.SmallAvatar>
                <S.UserInfo>
                  <span>{ticket.assignee_member?.name || "미배정"}</span>
                </S.UserInfo>
              </S.UserDisplay>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle><User size={16} />요청자</S.InfoTitle>
            <S.InfoContent>
              <S.UserDisplay>
                <S.SmallAvatar>
                  <S.AvatarImage src={ticket.creator_member?.profileUrl || "/images/avatar-1.png"} alt={ticket.creator_member?.name || "미지정"} />
                </S.SmallAvatar>
                <S.UserInfo>
                  <span>{ticket.creator_member?.name || "미지정"}</span>
                </S.UserInfo>
              </S.UserDisplay>
            </S.InfoContent>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoTitle><Calendar size={14} />마감 일자</S.InfoTitle>
            <S.InfoContent>
              <S.DateText>{formatDate(ticket.end_date)}</S.DateText>
            </S.InfoContent>
          </S.InfoSection>
        </S.InfoGrid>

        <S.DescriptionSection>
          <S.InfoTitle>상세 내용</S.InfoTitle>
          <S.DetailContent>
            {isEditMode ? (
              <textarea
                value={editedTicket.description}
                onChange={(e) => setEditedTicket({ ...editedTicket, description: e.target.value })}
              />
            ) : ticket.description ? (
              <div dangerouslySetInnerHTML={{ __html: ticket.description }} />
            ) : (
              <S.PlaceholderText>상세 내용이 없습니다.</S.PlaceholderText>
            )}
          </S.DetailContent>
        </S.DescriptionSection>
      </S.Section>

      {ticket.subtickets && ticket.subtickets.length > 0 && (
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

      {isEditMode && <button onClick={handleSave}>저장</button>}
    </S.Container>
  );
};
