import { Ticket } from "@/types/ticket"; // 경로는 프로젝트 기준으로 조정

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    title: "메인페이지 리팩토링",
    type: "기획",
    assignee: {
      name: "이태경",
      nickname: "tph0300",
      profileUrl: "",
    },
    priority: "HIGH",
    status: "TODO",
    startDate: "2025-05-01",
    endDate: "2025-05-10",
    subticketCount: 1,
    writer: {
      name: "이태경",
      nickname: "tph0300",
      profileUrl: "",
    },
  },
  {
    id: 2,
    title: "이미지 업로드 버그 수정",
    type: "개발",
    assignee: {
      name: "원해연",
      nickname: "won980630",
      profileUrl: "",
    },
    priority: "LOW",
    status: "DONE",
    startDate: "2025-05-03",
    endDate: "2025-05-09",
    subticketCount: 2,
    writer: {
      name: "정형돈",
      nickname: "lhd",
      profileUrl: "",
    },
  },
];
