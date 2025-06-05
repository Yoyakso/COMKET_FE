import type { Ticket } from "@/types/ticket";

export function updateNestedTickets(
  tickets: Ticket[],
  updater: (t: Ticket) => Ticket
): Ticket[] {
  return tickets.map((t) => ({
    ...updater(t),
    subtickets: t.subtickets?.map(updater),
  }));
}

export function deleteNestedTickets(
  tickets: Ticket[],
  idsToDelete: number[]
): Ticket[] {
  return tickets
    .filter((t) => !idsToDelete.includes(t.id))
    .map((t) => ({
      ...t,
      subtickets: t.subtickets?.filter((st) => !idsToDelete.includes(st.id)),
    }));
}

export const findTicketById = (tickets: Ticket[], id: number): Ticket | undefined => {
  for (const t of tickets) {
    if (t.id === id) return t;
    if (t.subtickets && t.subtickets.length > 0) {
      const found = findTicketById(t.subtickets, id);
      if (found) return found;
    }
  }
  return undefined;
};
