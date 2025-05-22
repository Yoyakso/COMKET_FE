import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TicketDropdownStore } from '@/stores/ticketStore';
import { PRIORITY_COLORS } from './PriorityDropdown.Style';
import * as S from './PriorityDropdown.Style';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import type { Priority } from '@/types/filter';
import { PortalDropdown } from '@/utils/PortalDropdown';
import { editSingleTicket } from '@/api/Ticket';
import { toast } from 'react-toastify';

interface PriorityDropdownProps {
  ticketId: number;
  projectName: string;
}

const findTicketById = (tickets: any[], id: number) => {
  for (const t of tickets) {
    if (t.id === id) return t;
    const found = t.subtickets?.find((st: any) => st.id === id);
    if (found) return found;
  }
  return undefined;
};

export const PriorityDropdown = ({ ticketId, projectName }: PriorityDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Priority | null>(null);
  const { tickets, openDropdown, setOpenDropdown, updateTicketPriority } = TicketDropdownStore();
  const ticket = findTicketById(tickets, ticketId);
  const currentPriority = ticket?.priority ?? 'LOW';
  const isOpen = openDropdown?.ticketId === ticketId && openDropdown.field === 'priority';

  useOutsideClick(ref, () => isOpen && setOpenDropdown(null));

  const handleSelect = async (priority: Priority) => {
    updateTicketPriority(ticketId, priority);
    setOpenDropdown(null);

    try {
      const payload = {
        ticket_name: ticket.title,
        description: ticket.description,
        ticket_type: ticket.type ?? null,
        ticket_priority: priority,
        ticket_state: ticket.status,
        start_date: ticket.startDate ?? null,
        end_date: ticket.endDate ?? null,
        parent_ticket_id: ticket.parentId ?? null,
        assignee_member_id: ticket.assignee_member?.projectMemberId ?? null,
      };

      await editSingleTicket(ticketId, projectName, payload);
      toast.success("우선순위가 변경되었습니다.");
    } catch (error) {
      console.error('우선순위 서버 반영 실패', error);
      toast.error("우선순위 변경에 실패했습니다.");
    }
  };

  const options: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];

  return (
    <S.Positioner ref={ref}>
      <S.Wrapper
        $color={PRIORITY_COLORS[currentPriority]}
        onClick={() => setOpenDropdown(isOpen ? null : { ticketId, field: 'priority' })}
      >
        {currentPriority}
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
              $color={PRIORITY_COLORS[hovered ?? currentPriority]}
            >
              {options.map(p => (
                <S.Option
                  key={p}
                  onMouseEnter={() => setHovered(p)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(p)}
                >
                  {p}
                </S.Option>
              ))}
            </S.MorphDropdown>
          </PortalDropdown>
        )}
      </AnimatePresence>
    </S.Positioner>
  );
};
