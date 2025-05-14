import {create} from 'zustand';
import type {Priority, Status, TicketType} from '@/types/filter';
import type {Ticket} from '@/types/ticket';
import { MOCK_TICKETS } from '@/constants/ticketData';


// 필터링된 티켓을 저장하는 스토어
interface TicketFilterStore {
    selectedPriorities: Priority[];
    selectedStatuses: Status[];
    selectedTypes: TicketType[];
    toggleSelectedPriorities: (priorities:Priority) => void;
    toggleSelectedStatuses: (statuses: Status) => void;
    toggleSelectedTypes: (types: TicketType) => void;
    reset: () => void;

}

export const TicketFilterStore = create<TicketFilterStore>((set, get) => ({
  selectedPriorities: [] as Priority[],
  selectedStatuses: [] as Status[],
  selectedTypes: [] as TicketType[],

  toggleSelectedTypes: (type) => {
    const { selectedTypes } = get();
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    set({ selectedTypes: updated });
  },

  toggleSelectedPriorities: (priority) => {
    const { selectedPriorities } = get();
    const updated = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    set({ selectedPriorities: updated });
  },

  toggleSelectedStatuses: (status) => {
    const { selectedStatuses } = get();
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    set({ selectedStatuses: updated });
  },

  reset: () => set({
    selectedPriorities: [],
    selectedStatuses: [],
    selectedTypes: []
  }),
}));




//우선순위-우선순위드롭다운, (상태,유형)-벌크드롭다운 변경 드롭다운
interface TicketDropdownStore {
  tickets: Ticket[];
  openDropdown: { ticketId: number; field: "priority" | "status" } | null;
  setOpenDropdown: (
    dropdown: { ticketId: number; field: "priority" | "status" } | null
  ) => void;
  updateTicketPriority: (ticketId: number, newPriority: Priority) => void;
  updateTicketStatus: (ticketId: number, newStatus: Status) => void;
   updateManyTicketStatus: (ticketIds: number[], newStatus: Status) => void;
  updateManyTicketType: (ticketIds: number[], newType: TicketType) => void;
}

export const TicketDropdownStore = create<TicketDropdownStore>((set) => ({
  tickets: MOCK_TICKETS,

  openDropdown: null,

  setOpenDropdown: (dropdown) => set({ openDropdown: dropdown }),

  updateTicketPriority: (ticketId, newPriority) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId ? { ...t, priority: newPriority } : t
      ),
    })),

  updateTicketStatus: (ticketId, newStatus) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus } : t
      ),
    })),

    
  updateManyTicketStatus: (ticketIds, newStatus) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        ticketIds.includes(t.id) ? { ...t, status: newStatus } : t
      ),
    })),

  updateManyTicketType: (ticketIds, newType) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        ticketIds.includes(t.id) ? { ...t, type: newType } : t
      ),
    })),
}));