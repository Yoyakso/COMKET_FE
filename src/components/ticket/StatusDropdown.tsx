import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TicketDropdownStore } from '@/stores/ticketStore';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { PortalDropdown } from '@/utils/PortalDropdown';
import * as S from './StatusDropdown.Style';
import type { Status } from '@/types/filter';
import { editSingleTicket } from '@/api/Ticket';
import { toast } from 'react-toastify'

interface StatusDropdownProps {
  ticketId: number;
  projectName: string;
}

export const STATUS_COLORS: Record<Status, string> = {
  TODO: '#9CA3AF',
  IN_PROGRESS: '#3B82F6',
  DONE: '#10B981',
  HOLD: '#F59E0B',
  DROP: '#EF4444',
  BACKLOG: '#6B7280',
};

const findTicketById = (tickets: any[], id: number) => {
  for (const t of tickets) {
    if (t.id === id) return t;
    const found = t.subtickets?.find((st: any) => st.id === id);
    if (found) return found;
  }
  return undefined;
};

export const StatusDropdown = ({ ticketId, projectName }: StatusDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Status | null>(null);

  const { tickets, openDropdown, setOpenDropdown, updateTicketStatus } = TicketDropdownStore();

  const ticket = findTicketById(tickets, ticketId);
  const currentStatus = ticket?.status ?? 'TODO';
  const isOpen = openDropdown?.ticketId === ticketId && openDropdown.field === 'status';

  useOutsideClick(ref, () => isOpen && setOpenDropdown(null));

  const handleSelect = async (status: Status) => {
    updateTicketStatus(ticketId, status);
    setOpenDropdown(null);

    try {
      const payload = {
        ticket_name: ticket.title,
        description: ticket.description,
        ticket_type: ticket.type ?? null,
        ticket_priority: ticket.priority ?? null,
        ticket_state: status,
        start_date: ticket.startDate ?? null,
        end_date: ticket.endDate ?? null,
        parent_ticket_id: ticket.parentId ?? null,
        assignee_member_id: ticket.assignee_member?.projectMemberId ?? null,
      };

      await editSingleTicket(ticketId, projectName, payload);
      toast.success("상태가 변경되었습니다.");
    } catch (error) {
      toast.error("상태 변경에 실패했습니다.");
      console.error('상태 서버 반영 실패:', error);
    }
  };

  const options: Status[] = ['TODO', 'IN_PROGRESS', 'DONE', 'HOLD', 'DROP', 'BACKLOG'];

  return (
    <S.Positioner ref={ref}>
      <S.Wrapper
        $color={STATUS_COLORS[currentStatus]}
        onClick={() => setOpenDropdown(isOpen ? null : { ticketId, field: 'status' })}
      >
        {currentStatus.replace('_', ' ')}
      </S.Wrapper>

      <AnimatePresence>
        {isOpen && (
          <PortalDropdown triggerRef={ref}>
            <S.MorphDropdown
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {options.map(s => (
                <S.Option
                  key={s}
                  $color={STATUS_COLORS[s]}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(s)}
                >
                  {s.replace('_', ' ')}
                </S.Option>
              ))}
            </S.MorphDropdown>
          </PortalDropdown>
        )}
      </AnimatePresence>
    </S.Positioner>
  );
};
