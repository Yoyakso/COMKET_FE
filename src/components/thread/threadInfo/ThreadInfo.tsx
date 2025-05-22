import { CheckCircle, Tag, User } from "lucide-react"
import * as S from "./ThreadInfo.Style"
import { StatusBadge } from "@components/ticket/StatusBadge"
import { useNavigate, useParams } from "react-router-dom";

export const ThreadInfo = ({ ticket }) => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <S.InfoGrid>
      <S.InfoSection>
        <S.InfoTitle>
          <User size={16} /> 담당자
        </S.InfoTitle>
        <S.InfoContent>
          <S.AssigneeDisplay>
            <S.SmallAvatar>
              <S.AvatarImage src={ticket.assignee?.avatar || "/images/avatar-1.png"} alt={ticket.assignee?.name || "미배정"} />
            </S.SmallAvatar>
            <span>{ticket.assignee?.name || "미배정"}</span>
          </S.AssigneeDisplay>
        </S.InfoContent>
      </S.InfoSection>

      <S.InfoSection>
        <S.InfoTitle>진행 상태</S.InfoTitle>
        <S.InfoContent>
          <S.StatusBadgeContainer>
            <StatusBadge status={ticket.status} />
          </S.StatusBadgeContainer>
        </S.InfoContent>
      </S.InfoSection>

      <S.InfoSection>
        <S.InfoTitle>
          <Tag size={16} />유형
        </S.InfoTitle>
        <S.InfoContent>
          <S.TagsContainer>
            <S.TagBadge>{ticket.type}</S.TagBadge>
          </S.TagsContainer>
        </S.InfoContent>
      </S.InfoSection>

      <S.InfoSection>
        <S.InfoTitle>하위 티켓</S.InfoTitle>
        <S.InfoContent>
          <S.SubticketList>
            {ticket.subtickets?.map((childTicket) => (
              <S.SubticketItem
                key={childTicket.id}
                onClick={() =>
                  navigate(`/${projectId}/tickets/${childTicket.id}/thread`, {
                    state: { ticket: childTicket, projectName: ticket.projectName },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <CheckCircle size={14} /> <span>{childTicket.title}</span>
              </S.SubticketItem>
            ))}
          </S.SubticketList>
        </S.InfoContent>
      </S.InfoSection>
    </S.InfoGrid>
  )
}
