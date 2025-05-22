import { Ticket } from '@/types/ticket';
import { MessageSquare } from 'lucide-react';
import { PriorityBadge } from '@/components/ticket/PriorityBadge';
import * as S from './TicketCard.Style'

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
}

export const TicketCard = ({ ticket, onClick }: TicketCardProps) => {
  return (
    <S.CardContainer onClick={onClick}>
      <S.Header>
        <S.Title>{ticket.title}</S.Title>
        {ticket.threadCount > 0 && (
          <S.ThreadIcon>
            <MessageSquare size={14} />
            <span>{ticket.threadCount}</span>
          </S.ThreadIcon>
        )}
      </S.Header>
      <S.Badges>
        <PriorityBadge priority={ticket.priority} />
      </S.Badges>
      <S.DateRange>{ticket.startDate} ~ {ticket.endDate}</S.DateRange>
      <S.Assignee>{ticket.type} | {ticket.assignee_member?.name ?? '담당자 없음'}</S.Assignee>
    </S.CardContainer>
  );
};
