import * as S from './TicketRow.Style';
import { useState } from 'react';
import { AvatarWithName } from './AvatarWithName';
import { Ticket } from '@/types/ticket';
import { CheckBox } from '../common/checkbox/CheckBox';
import { ChevronRight, ChevronDown, MessageSquare } from 'lucide-react';
import { TypeBadge } from './TypeBadge';
import { PriorityDropdown } from './PriorityDropdown';
import { StatusDropdown } from './StatusDropdown';
import { AssigneeCell } from '@/components/ticket/AssignCell';
import { Info, Bell } from 'lucide-react';

interface TicketRowProps {
  ticket: Ticket;
  isChecked: (id: number) => boolean;
  toggleSingle: (id: number, parentId?: number) => void;
  toggleWithSubtickets: (ticket: Ticket) => void;
  onTicketClick?: (ticket: Ticket) => void;
  onTicketHover?: (ticket: Ticket | null) => void;
  onInfoClick?: (ticket: Ticket) => void;
  projectName: string;
  depth?: number;
  hasAlarm?: boolean;
  alarmTicketIds?: Set<number>;
}

export const TicketRow = ({
  ticket,
  isChecked,
  toggleSingle,
  toggleWithSubtickets,
  onTicketClick,
  onTicketHover,
  onInfoClick,
  projectName,
  depth = 0,
  hasAlarm = false,
}: TicketRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(prev => !prev);
  const hasSubtickets = ticket.subtickets?.length > 0;

  const getLineColor = (depth: number) => {
    if (depth === 1) return '#87e6d3';
    if (depth === 2) return '#56cbb0';
    return '#C6F3E9';
  };

  const paddingLeft = `${depth * 24}px`;
  const lineColor = getLineColor(depth);

  return (
    <>
      <S.TableRow $depth={depth}>
        <td
          style={{
            paddingLeft,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '4px',
              backgroundColor: lineColor,
            }}
          />
          {hasSubtickets && depth < 2 ? (
            <S.ToggleButton onClick={toggleExpand}>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </S.ToggleButton>
          ) : (
            <S.ToggleButtonPlaceholder />
          )}
        </td>
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

        <S.TableCell $align="center">
          <S.InfoAlarmCell>
            <S.InfoButton onClick={() => onInfoClick?.(ticket)}>
              <Info size={16} />
            </S.InfoButton>
            <S.Alarm $visible={hasAlarm}>
              <Bell size={16} color="#3b82f6" />
              <div
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '0px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                }}
              />
            </S.Alarm>
          </S.InfoAlarmCell>
        </S.TableCell>

        <S.TableCell
          onClick={() => onTicketClick?.(ticket)}
          onMouseEnter={() => onTicketHover?.(ticket)}
          onMouseLeave={() => onTicketHover?.(null)}
          style={{ cursor: 'pointer' }}
        >
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
          <AssigneeCell members={ticket.assignee_member_list ?? []} />
        </S.TableCell>
        <S.TableCell $align="center">
          <PriorityDropdown ticketId={ticket.id} projectName={projectName} />
        </S.TableCell>
        <S.TableCell $align="center">
          <StatusDropdown ticketId={ticket.id} projectName={projectName} />
        </S.TableCell>
        <S.TableCell>{ticket.startDate}</S.TableCell>
        <S.TableCell>{ticket.endDate}</S.TableCell>
        <S.TableCell>{ticket.subticketCount ?? '-'}</S.TableCell>
        <S.TableCell>
          <AvatarWithName user={ticket.creator_member} />
        </S.TableCell>
      </S.TableRow>

      {hasSubtickets &&
        depth < 2 &&
        isExpanded &&
        ticket.subtickets?.map((sub, index) => (
          <TicketRow
            key={sub.id}
            ticket={sub}
            isChecked={isChecked}
            toggleSingle={toggleSingle}
            toggleWithSubtickets={toggleWithSubtickets}
            onTicketClick={onTicketClick}
            onInfoClick={onInfoClick}
            onTicketHover={onTicketHover}
            projectName={projectName}
            depth={depth + 1}
          />
        ))}
    </>
  );
};
