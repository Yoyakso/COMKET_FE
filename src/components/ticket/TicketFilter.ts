import {create} from 'zustand';
import type {Priority, Status, TicketType} from '@/types/filter';

interface TicketFilterStore {
    selectedPriorities: Priority[];
    selectedStatuses: Status[];
    selectedTypes: TicketType[];
    toggleSelectedPriorities: (priorities:Priority) => void;
    toggleSelectedStatuses: (statuses: Status) => void;
    toggleSelectedTypes: (types: TicketType) => void;

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
