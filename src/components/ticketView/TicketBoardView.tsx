import * as S from './TicketBoardView.Style';
import { Ticket } from '@/types/ticket';
import { TicketCard } from './TicketCard';

interface TicketBoardViewProps {
  ticketList: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const statusGroups = [
  { title: 'TODO', key: 'TODO' },
  { title: 'IN PROGRESS', key: 'IN_PROGRESS' },
  { title: 'DONE', key: 'DONE' },
  { title: 'OTHERS', key: 'OTHERS' }, // DROP / HOLD / BACKLOG
];

export const TicketBoardView = ({ ticketList, onTicketClick }: TicketBoardViewProps) => {
  const groupedTickets = {
    TODO: ticketList.filter(t => t.status === 'TODO'),
    IN_PROGRESS: ticketList.filter(t => t.status === 'IN_PROGRESS'),
    DONE: ticketList.filter(t => t.status === 'DONE'),
    OTHERS: ticketList.filter(t => ['DROP', 'HOLD', 'BACKLOG'].includes(t.status)),
  };

  return (
    <S.BoardContainer>
      {statusGroups.map(group => (
        <S.Column key={group.key}>
          <S.ColumnHeader>{group.title}</S.ColumnHeader>
          <S.TicketList>
            {groupedTickets[group.key as keyof typeof groupedTickets].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} onClick={() => onTicketClick(ticket)} />
            ))}
          </S.TicketList>
        </S.Column>
      ))}
    </S.BoardContainer>
  );
};
