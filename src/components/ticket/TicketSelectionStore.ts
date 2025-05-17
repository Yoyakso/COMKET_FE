import { create } from 'zustand';
import type { Ticket } from '@/types/ticket';

interface TicketSelectionState {
  selectedIds: number[];
  setInitialTickets: (tickets: Ticket[]) => void;
  toggleSingle: (id: number, parentId?: number) => void;
  toggleWithSubtickets: (ticket: Ticket) => void;
  clearSelection: () => void;
}

let ticketsSnapshot: Ticket[] = []; // 내부 티켓 참조용

export const TicketSelectionStore = create<TicketSelectionState>((set, get) => ({
  selectedIds: [],

  setInitialTickets: tickets => {
    ticketsSnapshot = tickets;
  },

  toggleSingle: (id, parentId) => {
    set(state => {
      const isChecked = state.selectedIds.includes(id);
      let updated = isChecked
        ? state.selectedIds.filter(v => v !== id)
        : [...state.selectedIds, id];

      if (isChecked && parentId) {
        updated = updated.filter(v => v !== parentId);
      }

      // if (!isChecked && parentId) {
      //   const parentTicket = ticketsSnapshot.find(t => t.id === parentId);
      //   const allSubIds = parentTicket?.subtickets?.map(s => s.id) ?? [];
      //   const allSelected = allSubIds.every(subId => subId === id || state.selectedIds.includes(subId));
      //   if (allSelected) {
      //     updated = [...updated, parentId];
      //   }
      // }

      // if (isChecked && !parentId) {
      //   const ticket = ticketsSnapshot.find(t => t.id === id);
      //   const subIds = ticket?.subtickets?.map(s => s.id) ?? [];
      //   updated = updated.filter((v) => !subIds.includes(v));
      // }

      // if (!isChecked && !parentId) {
      //   const ticket = ticketsSnapshot.find(t => t.id === id);
      //   const subIds = ticket?.subtickets?.map(s => s.id) ?? [];
      //   updated = [...updated, ...subIds];
      // }

      return { selectedIds: updated };
    });
  },

  toggleWithSubtickets: ticket => {
    set(state => {
      const allIds = [ticket.id, ...(ticket.subtickets?.map(s => s.id) ?? [])];
      const isAllSelected = allIds.every(id => state.selectedIds.includes(id));

      if (isAllSelected) {
        return { selectedIds: state.selectedIds.filter(id => !allIds.includes(id)) };
      } else {
        return { selectedIds: Array.from(new Set([...state.selectedIds, ...allIds])) };
      }
    });
  },

  clearSelection: () => set({ selectedIds: [] }),
}));
