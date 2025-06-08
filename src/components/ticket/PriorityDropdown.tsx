import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TicketDropdownStore } from '@/stores/ticketStore';
import * as S from './PriorityDropdown.Style';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import type { Priority } from '@/types/filter';
import { PortalDropdown } from '@/utils/PortalDropdown';
import { editSingleTicket } from '@/api/Ticket';
import { toast } from 'react-toastify';
import { findTicketById } from '@/utils/ticketUtills';

interface PriorityDropdownProps {
  ticketId: number;
  projectName: string;
}

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
        assignee_member_id_list: ticket.assignee_member_list?.[0]?.projectMemberId ?? null,
      };

      await editSingleTicket(ticketId, projectName, payload);
      toast.success('우선순위가 변경되었습니다.');
    } catch (error) {
      console.error('우선순위 서버 반영 실패', error);
      toast.error('우선순위 변경에 실패했습니다.');
    }
  };

  const options: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];

  return (
    <S.Positioner ref={ref}>
      <S.Wrapper onClick={() => setOpenDropdown(isOpen ? null : { ticketId, field: 'priority' })}>
        <S.PriorityDot priority={currentPriority} />
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
            >
              {options.map(p => (
                <S.Option
                  key={p}
                  onMouseEnter={() => setHovered(p)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(p)}
                  $isHovered={hovered === p}
                >
                  <S.PriorityDot priority={p} />
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
