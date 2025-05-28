import * as S from './TicketBoardView.Style';
import { Ticket } from '@/types/ticket';
import { TicketCard } from './TicketCard';
import { ClipboardList, Clock, CheckCircle, Layers } from "lucide-react"

interface TicketBoardViewProps {
  ticketList: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const statusGroups = [
  { title: "TODO", key: "TODO", icon: <ClipboardList size={16} /> },
  { title: "IN PROGRESS", key: "IN_PROGRESS", icon: <Clock size={16} /> },
  { title: "DONE", key: "DONE", icon: <CheckCircle size={16} /> },
  { title: "OTHERS", key: "OTHERS", icon: <Layers size={16} /> }, // DROP / HOLD / BACKLOG
]

export const TicketBoardView = ({ ticketList, onTicketClick, onTicketDrop
}: TicketBoardViewProps & { onTicketDrop: (ticketId: number, newStatus: string) => void }) => {
  const groupedTickets = {
    TODO: ticketList.filter(t => t.status === 'TODO'),
    IN_PROGRESS: ticketList.filter(t => t.status === 'IN_PROGRESS'),
    DONE: ticketList.filter(t => t.status === 'DONE'),
    OTHERS: ticketList.filter(t => ['DROP', 'HOLD', 'BACKLOG'].includes(t.status)),
  };

  return (
    <S.BoardContainer>
      {statusGroups.map(group => (
        <S.Column key={group.key} $columnType={group.key}>
          <S.ColumnHeader $columnType={group.key}>
            <S.ColumnTitle>
              {group.icon}
              <span style={{ marginLeft: "8px" }}>{group.title}</span>
            </S.ColumnTitle>
            <S.TicketCount>{(groupedTickets[group.key] || []).length}</S.TicketCount>

          </S.ColumnHeader>

          <S.TicketList
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const ticketId = e.dataTransfer.getData('ticketId')
              onTicketDrop(Number(ticketId), group.key)
            }}
            style={{ minHeight: "700px" }}
          >
            {groupedTickets[group.key as keyof typeof groupedTickets].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} onClick={() => onTicketClick(ticket)} />
            ))}
          </S.TicketList>
        </S.Column>
      ))
      }
    </S.BoardContainer >
  );
};
