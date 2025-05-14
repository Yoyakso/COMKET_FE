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