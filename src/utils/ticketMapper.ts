// import { Ticket } from "@/types/ticket"

// export function mapTicketFromResponse(response: any): Ticket {
//   return {
//     id: response.id,
//     title: response.ticket_name,
//     description: response.description,
//     type: response.ticket_type,
//     priority: response.ticket_priority,
//     status: response.ticket_state,
//     startDate: response.start_date,
//     endDate: response.end_date,
//     parentId: response.parent_ticket_id,
//     assignee_member: {
//       name: response.assignee_member.name,
//       email: response.assignee_member.email,
//       profileUrl: "",
//       nickname: "",
//       projectMemberId: response.assignee_member?.projectMemberId ?? null,
//     },
//     creator_member: {
//       name: response.creator_member.name,
//       email: response.creator_member.email,
//       profileUrl: "",
//       nickname: "",
//       projectMemberId: response.creator_member?.projectMemberId ?? null,
//     },
//     subticketCount: response.sub_ticket_count ?? 0,
//     subtickets: [],
//     threadCount: 0, // 서버 응답에 없으므로 기본값 0
//   }
// }

import { Ticket } from "@/types/ticket"

export function mapTicketFromResponse(response: any): Ticket {
  return {
    id: response.id,
    title: response.ticket_name,
    description: response.description,
    type: response.ticket_type,
    priority: response.ticket_priority,
    status: response.ticket_state,
    startDate: response.start_date,
    endDate: response.end_date,
    parentId: response.parent_ticket_id ?? undefined,
    assignee_member: {
      name: response.assignee_member?.name ?? '',
      email: response.assignee_member?.email ?? '',
      profileUrl: '',
      nickname: '',
      projectMemberId: response.assignee_member?.projectMemberId ?? null,
    },
    creator_member: {
      name: response.creator_member?.name ?? '',
      email: response.creator_member?.email ?? '',
      profileUrl: '',
      nickname: '',
      projectMemberId: response.creator_member?.projectMemberId ?? null,
    },
    subticketCount: response.sub_ticket_count ?? 0,
    subtickets: [],
    threadCount: 0,
  };
}
