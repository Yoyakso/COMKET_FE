import * as S from './TicketRow.Style';
import { useState } from 'react';
import { AvatarWithName } from './AvatarWithName';
import { Ticket } from '@/types/ticket';
import { CheckBox } from '../common/checkbox/CheckBox';
import { ChevronRight, ChevronDown, MessageSquare } from 'lucide-react';
import { TypeBadge } from './TypeBadge';
import { PriorityDropdown } from './PriorityDropdown';
import { StatusDropdown } from './StatusDropdown';

interface TicketRowProps {
  ticket: Ticket;
  isChecked: (id: number) => boolean;
  toggleSingle: (id: number, parentId?: number) => void;
  toggleWithSubtickets: (ticket: Ticket) => void;
  onTicketClick?: (ticket: Ticket) => void;
  onTicketHover?: (ticket: Ticket | null) => void;
}

export const TicketRow = ({
  ticket,
  isChecked,
  toggleSingle,
  toggleWithSubtickets,
  onTicketClick,
  onTicketHover,
}: TicketRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(prev => !prev);
  const hasSubtickets = ticket.subtickets?.length > 0;

  return (
    <>
      <S.TableRow
        onMouseEnter={() => onTicketHover?.(ticket)}
        onMouseMove={() => onTicketHover?.(ticket)}
        onMouseLeave={() => onTicketHover?.(null)}
      >
        <S.TableCell>
          {hasSubtickets ? (
            <S.ToggleButton onClick={toggleExpand}>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </S.ToggleButton>
          ) : (
            <S.ToggleButtonPlaceholder />
          )}
        </S.TableCell>
        <S.TableCell>
          <CheckBox
            $variant="primary"
            size="md"
            checked={isChecked(ticket.id)}
            onChange={() =>
              hasSubtickets
                ? toggleWithSubtickets(ticket)
                : toggleSingle(ticket.id, ticket.parentId)
            }
          />
        </S.TableCell>
        <S.TableCell>{ticket.id}</S.TableCell>
        <S.TableCell onClick={() => onTicketClick?.(ticket)} style={{ cursor: 'pointer' }}>
          <S.TicketTitleGroup>
            {ticket.title}
            {ticket.threadCount > 0 && (
              <S.ThreadIcon>
                <MessageSquare width={'14px'} height={'14px'} />
                <span>{ticket.threadCount}</span>
              </S.ThreadIcon>
            )}
          </S.TicketTitleGroup>
        </S.TableCell>
        <S.TableCell>
          <TypeBadge type={ticket.type} />
        </S.TableCell>
        <S.TableCell>
          <AvatarWithName user={ticket.assignee} />
        </S.TableCell>
        <S.TableCell $align="center">
          <PriorityDropdown ticketId={ticket.id} />
        </S.TableCell>
        <S.TableCell $align="center">
          <StatusDropdown ticketId={ticket.id} />
        </S.TableCell>
        <S.TableCell>{ticket.startDate}</S.TableCell>
        <S.TableCell>{ticket.endDate}</S.TableCell>
        <S.TableCell>{ticket.subticketCount}</S.TableCell>
        <S.TableCell>
          <AvatarWithName user={ticket.writer} />
        </S.TableCell>
      </S.TableRow>

      {isExpanded &&
        ticket.subtickets?.map(sub => (
          <S.SubticketRow key={sub.id}
            onClick={() => onTicketClick?.(sub)}
            style={{ cursor: 'pointer' }}
          >
            <S.SubticketCell />
            <S.SubticketCell>
              <CheckBox
                $variant="primary"
                size="md"
                checked={isChecked(sub.id)}
                onChange={() => toggleSingle(sub.id, ticket.id)}
              />
            </S.SubticketCell>
            <S.SubticketCell>{sub.id}</S.SubticketCell>
            <S.SubticketCell>
              <S.TicketTitleGroup>
                {sub.title}
                {sub.threadCount > 0 && (
                  <S.ThreadIcon>
                    <MessageSquare width={'14px'} height={'14px'} />
                    <span>{sub.threadCount}</span>
                  </S.ThreadIcon>
                )}
              </S.TicketTitleGroup>
            </S.SubticketCell>
            <S.SubticketCell>
              <TypeBadge type={sub.type} />
            </S.SubticketCell>
            <S.SubticketCell>
              <AvatarWithName user={sub.assignee} />
            </S.SubticketCell>
            <S.SubticketCell $align="center">
              <PriorityDropdown ticketId={sub.id} />
            </S.SubticketCell>
            <S.SubticketCell $align="center">
              <StatusDropdown ticketId={sub.id} />
            </S.SubticketCell>
            <S.SubticketCell>{sub.startDate}</S.SubticketCell>
            <S.SubticketCell>{sub.endDate}</S.SubticketCell>
            <S.SubticketCell>-</S.SubticketCell>
            <S.SubticketCell>
              <AvatarWithName user={sub.writer} />
            </S.SubticketCell>
          </S.SubticketRow>
        ))}
    </>
  );
};
