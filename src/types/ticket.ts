import { TicketType } from "./filter";

export interface Ticket {
  id: number;
  title: string;
  type: TicketType;
  assignee: {
    name: string;
    nickname: string;
    profileUrl?: string;
    email: string;
  };
  threadCount: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "HOLD" | "BACKLOG" | "DROP";
  startDate: string;
  endDate: string;
  subticketCount: number;
  subtickets?: Ticket[];
  writer: {
    name: string;
    nickname: string;
    profileUrl?: string;
    email: string;

  };
}
