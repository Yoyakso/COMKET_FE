export interface Ticket {
  id: number;
  title: string;
  type: string;
  assignee: {
    name: string;
    nickname: string;
    profileUrl?: string;
  };
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "HOLD" | "BACKLOG" | "DROP";
  startDate: string;
  endDate: string;
  subticketCount: number;
  writer: {
    name: string;
    nickname: string;
    profileUrl?: string;
  };
}
