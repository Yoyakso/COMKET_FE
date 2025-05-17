import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TicketDropdownStore } from '@/components/ticket/Ticket';
import { PRIORITY_COLORS } from './PriorityDropdown.Style';
import * as S from './PriorityDropdown.Style';
import { OutsideClick } from '@/utils/OutsideClick';
import type { Priority } from '@/types/filter';
import { PortalDropdown } from '@/utils/PortalDropdown';

const findTicketById = (tickets: any[], id: number) => {
  for (const t of tickets) {
    if (t.id === id) return t;
    const found = t.subtickets?.find((st: any) => st.id === id);
    if (found) return found;
  }
  return undefined;
};

export const PriorityDropdown = ({ ticketId }: { ticketId: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Priority | null>(null);

  const { tickets, openDropdown, setOpenDropdown, updateTicketPriority } = TicketDropdownStore();

  const ticket = findTicketById(tickets, ticketId);
  const currentPriority = ticket?.priority ?? 'LOW';
  const isOpen = openDropdown?.ticketId === ticketId && openDropdown.field === 'priority';

  OutsideClick(ref, () => isOpen && setOpenDropdown(null));

  const handleSelect = (priority: Priority) => {
    updateTicketPriority(ticketId, priority);
    setOpenDropdown(null);
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
