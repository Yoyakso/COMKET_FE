import { TicketType } from './filter';

export interface Ticket {
  id: number;
  title: string;
  type: TicketType;
  description: string;
  assignee_member: {
    name: string;
    nickname: string;
    profileUrl?: string;
    email: string;
    projectMemberId: number | null;
  };
  threadCount: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'HOLD' | 'BACKLOG' | 'DROP';
  startDate: string;
  endDate: string;
  subticketCount: number;
  subtickets?: Ticket[];
  parentId?: number;
  creator_member: {
    name: string;
    nickname: string;
    profileUrl?: string;
    email: string;
    projectMemberId: number | null;
  };
}
