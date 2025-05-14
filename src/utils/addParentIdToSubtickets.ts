import { Ticket } from "@/types/ticket";

/**
 * subtickets 내부에 parentId를 자동으로 세팅하는 유틸
 * 원본 배열을 변형하지 않고 새로운 배열을 리턴함
 */
export function addParentIdToSubtickets(tickets: Ticket[]): Ticket[] {
  const process = (ticket: Ticket, parentId?: number): Ticket => {
    const newTicket: Ticket = {
      ...ticket,
      parentId, // ✅ parentId 삽입
      subtickets: ticket.subtickets?.map((sub) => process(sub, ticket.id)),
    };
    return newTicket;
  };

  return tickets.map((ticket) => process(ticket));
}