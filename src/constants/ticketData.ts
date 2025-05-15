import { Ticket } from "@/types/ticket";
import { addParentIdToSubtickets } from "@/utils/addParentIdToSubtickets";

export const MOCK_TICKETS: Ticket[] = addParentIdToSubtickets([
  {
    id: 1,
    title: "메인페이지 리팩토링",
    type: "기획",
    assignee: {
      name: "이태경",
      nickname: "tph0300",
      profileUrl: "",
      email: "tph0300@gamil.com",
    },
    threadCount: 0,
    priority: "HIGH",
    status: "TODO",
    startDate: "2025-05-01",
    endDate: "2025-05-10",
    subticketCount: 1,
    writer: {
      name: "이태경",
      nickname: "tph0300",
      profileUrl: "",
      email: "tph0300@gamil.com",
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
      email: "won980630@gamil.com",
    },
    threadCount: 2,
    priority: "LOW",
    status: "DONE",
    startDate: "2025-05-03",
    endDate: "2025-05-09",
    subticketCount: 2,
    subtickets: [ 
    {
      id: 11,
      title: "상단 메뉴 리팩토링",
      type: "디자인",
      assignee: { 
        name: "서브유저", 
        nickname: "sub1", 
        profileUrl: "", 
        email: "sub1@aaa.com" },
      threadCount: 1,
      priority: "MEDIUM",
      status: "TODO",
      startDate: "2025-05-02",
      endDate: "2025-05-07",
      subticketCount: 0,
      writer: { 
        name: "이태경", 
        nickname: "tph0300", 
        profileUrl: "", 
        email: "tph0300@aaa.com" }
    },
    {
      id: 8,
      title: "하단단 메뉴 리팩토링",
      type: "디자인",
      assignee: { 
        name: "서브유저", 
        nickname: "sub2", 
        profileUrl: "", 
        email: "sub2@aaa.com" },
      threadCount: 1,
      priority: "LOW",
      status: "DROP",
      startDate: "2025-05-02",
      endDate: "2025-05-07",
      subticketCount: 0,
      writer: { 
        name: "이태경", 
        nickname: "tph0300", 
        profileUrl: "", 
        email: "tph0300@aaa.com" }
    }
  ],
    writer: {
      name: "정형돈",
      nickname: "lhd",
      profileUrl: "",
      email: "jhdddd@gamil.com",
    },
  },

   {
    id: 3,
    title: "로그아웃 API 버그 수정",
    type: "개발",
    assignee: {
      name: "원해연",
      nickname: "won980630",
      profileUrl: "",
      email: "won980630@gamil.com",
    },
    threadCount: 0,
    priority: "MEDIUM",
    status: "HOLD",
    startDate: "2025-05-03",
    endDate: "2025-05-09",
    subticketCount: 0,
    writer: {
      name: "조민현",
      nickname: "coolguy",
      profileUrl: "",
      email: "coolguy@gamil.com",
    },
  },

   {
    id: 4,
    title: "회원가입 UI 디자인",
    type: "개발",
    assignee: {
      name: "오유민",
      nickname: "alienvoice",
      profileUrl: "",
      email: "walienvoice@gamil.com",
    },
    threadCount: 5,
    priority: "HIGH",
    status: "IN_PROGRESS",
    startDate: "2025-05-03",
    endDate: "2025-05-09",
    subticketCount: 0,
    writer: {
      name: "정형돈",
      nickname: "lhd",
      profileUrl: "",
      email: "jhdddd@gamil.com",
    },
  },
]);
