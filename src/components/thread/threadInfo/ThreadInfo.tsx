import { CheckCircle, Tag, User } from "lucide-react"
import * as S from "./ThreadInfo.Style"
import { StatusBadge } from "@components/ticket/StatusBadge"

export const ThreadInfo = ({ ticket }) => (
  <S.InfoGrid>
    <S.InfoSection>
      <S.InfoTitle>
        <User size={16} /> 담당자
      </S.InfoTitle>
      <S.InfoContent>
        <S.AssigneeDisplay>
          <S.SmallAvatar>
            <S.AvatarImage src={ticket.assignee?.avatar || "/placeholder.svg"} alt={ticket.assignee?.name || "미배정"} />
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
        <Tag size={16} /> 태그
      </S.InfoTitle>
      <S.InfoContent>
        <S.TagsContainer>
          {ticket.tags?.map((tag, index) => (
            <S.TagBadge key={index}>{tag}</S.TagBadge>
          ))}
        </S.TagsContainer>
      </S.InfoContent>
    </S.InfoSection>

    <S.InfoSection>
      <S.InfoTitle>하위 티켓</S.InfoTitle>
      <S.InfoContent>
        <S.SubticketList>
          {ticket.childTickets?.map((childTicket) => (
            <S.SubticketItem key={childTicket.id}>
              <CheckCircle size={14} /> <span>{childTicket.title}</span>
            </S.SubticketItem>
          ))}
        </S.SubticketList>
      </S.InfoContent>
    </S.InfoSection>
  </S.InfoGrid>
)
