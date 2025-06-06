import type { TicketTemplate } from "@/types/ticketTemplate";

export const TICKET_TEMPLATE_DATA: TicketTemplate[] = [
  {
    id: "basic",
    name: "기본형",
    purpose: "일반적인 업무 요청 및 문의사항",
    type: "기본",
    color: "#6b7280",
    icon: "FileText",
    fields: [
      { key: "title", label: "티켓 제목", required: true, type: "text", placeholder: "티켓 제목을 입력하세요" },
      {
        key: "ticketType",
        label: "티켓 유형",
        required: true,
        type: "select",
        options: ["개발", "기획", "회의", "QA", "버그", "분석", "문서"],
      },
      { key: "priority", label: "우선순위", required: true, type: "select", options: ["높음", "보통", "낮음"] },
      {
        key: "description",
        label: "상세 설명",
        required: true,
        type: "textarea",
        placeholder: "상세 설명을 입력하세요",
      },
      { key: "startDate", label: "작업 시작일", required: true, type: "date" },
      { key: "endDate", label: "작업 마감일", required: true, type: "date" },
      { key: "assignee", label: "담당자", required: true, type: "user" },
      { key: "creator", label: "생성자", required: true, type: "user" },
    ],
  },
  {
    id: "feature-development",
    name: "기능 개발",
    purpose: "새로운 기능 또는 개선 작업 요청",
    type: "개발",
    color: "#3b82f6",
    icon: "Code",
    fields: [
      { key: "title", label: "기능 명", required: true, type: "text", placeholder: "개발할 기능명을 입력하세요" },
      { key: "priority", label: "우선순위", required: true, type: "select", options: ["높음", "보통", "낮음"] },
      {
        key: "description",
        label: "요구 사항",
        required: true,
        type: "textarea",
        placeholder: "기능 요구사항을 상세히 입력하세요",
      },
      {
        key: "expectedResult",
        label: "기대 결과",
        required: true,
        type: "textarea",
        placeholder: "기대하는 결과를 입력하세요",
      },
      {
        key: "ticketType",
        label: "티켓 유형",
        required: true,
        type: "select",
        defaultValue: "개발",
        options: ["개발", "기획", "회의", "QA", "버그", "분석", "문서"],
      },
      { key: "startDate", label: "작업 시작일", required: true, type: "date" },
      { key: "endDate", label: "작업 마감일", required: true, type: "date" },
      { key: "assignee", label: "담당자", required: true, type: "user" },
      { key: "creator", label: "생성자", required: true, type: "user" },
    ],
  },
  {
    id: "planning-proposal",
    name: "기획/정책 제안",
    purpose: "기능 기획, 정책 제안 등 기초 설계 단계",
    type: "기획",
    color: "#8b5cf6",
    icon: "Lightbulb",
    fields: [
      { key: "title", label: "제안 제목", required: true, type: "text", placeholder: "제안 제목을 입력하세요" },
      { key: "priority", label: "우선순위", required: true, type: "select", options: ["높음", "보통", "낮음"] },
      {
        key: "description",
        label: "제안 배경 및 필요성",
        required: true,
        type: "textarea",
        placeholder: "제안 배경과 필요성을 설명하세요",
      },
      {
        key: "proposalContent",
        label: "제안 내용",
        required: true,
        type: "textarea",
        placeholder: "구체적인 제안 내용을 입력하세요",
      },
      {
        key: "ticketType",
        label: "티켓 유형",
        required: true,
        type: "select",
        defaultValue: "기획",
        options: ["개발", "기획", "회의", "QA", "버그", "분석", "문서"],
      },
      { key: "startDate", label: "작업 시작일", required: true, type: "date" },
      { key: "endDate", label: "작업 마감일", required: true, type: "date" },
      { key: "assignee", label: "담당자", required: true, type: "user" },
      { key: "creator", label: "생성자", required: true, type: "user" },
    ],
  },
  {
    id: "meeting-scrum",
    name: "회의/논의",
    purpose: "회의 내용 정리 및 공유",
    type: "회의/논의",
    color: "#10b981",
    icon: "Users",
    fields: [
      { key: "title", label: "회의 주제", required: true, type: "text", placeholder: "회의 주제를 입력하세요" },
      { key: "priority", label: "우선순위", required: true, type: "select", options: ["높음", "보통", "낮음"] },
      {
        key: "description",
        label: "회의 요약 및 주요 논의 내용",
        required: true,
        type: "textarea",
        placeholder: "회의 내용을 요약하여 입력하세요",
      },
      { key: "assignee", label: "참석자", required: true, type: "user" },
      {
        key: "ticketType",
        label: "티켓 유형",
        required: true,
        type: "select",
        defaultValue: "회의",
        options: ["개발", "기획", "회의", "QA", "버그", "분석", "문서"],
      },
      { key: "startDate", label: "회의 일자", required: true, type: "date" },
      { key: "creator", label: "생성자", required: true, type: "user" },
    ],
  },
  {
    id: "qa-test",
    name: "QA 테스트",
    purpose: "QA 테스트 요청 및 테스트 결과 정리",
    type: "QA",
    color: "#f59e0b",
    icon: "ClipboardCheck",
    fields: [
      {
        key: "title",
        label: "테스트 대상 기능명",
        required: true,
        type: "text",
        placeholder: "테스트할 기능명을 입력하세요",
      },
      { key: "priority", label: "우선순위", required: true, type: "select", options: ["높음", "보통", "낮음"] },
      {
        key: "description",
        label: "테스트 목적 및 범위",
        required: true,
        type: "textarea",
        placeholder: "테스트 목적과 범위를 설명하세요",
      },
      {
        key: "testScenario",
        label: "테스트 시나리오",
        required: true,
        type: "textarea",
        placeholder: "테스트 시나리오를 입력하세요",
      },
      {
        key: "expectedResult",
        label: "예상 결과",
        required: true,
        type: "textarea",
        placeholder: "예상되는 테스트 결과를 입력하세요",
      },
      {
        key: "ticketType",
        label: "티켓 유형",
        required: true,
        type: "select",
        defaultValue: "QA",
        options: ["개발", "기획", "회의", "QA", "버그", "분석", "문서"],
      },
      { key: "startDate", label: "작업 시작일", required: true, type: "date" },
      { key: "endDate", label: "작업 마감일", required: true, type: "date" },
      { key: "assignee", label: "담당자", required: true, type: "user" },
      { key: "creator", label: "생성자", required: true, type: "user" },
    ],
  },
  {
    id: "bug-report",
    name: "이슈/버그 리포트",
    purpose: "시스템 오류나 예외 상황 보고",
    type: "버그",
    color: "#ef4444",
    icon: "Bug",
    fields: [
      { key: "title", label: "버그 요약", required: true, type: "text", placeholder: "버그를 간단히 요약하세요" },
      { key: "priority", label: "우선순위", required: true, type: "select", options: ["높음", "보통", "낮음"] },
      {
        key: "description",
        label: "문제 설명 및 현상",
        required: true,
        type: "textarea",
        placeholder: "문제 상황을 상세히 설명하세요",
      },
      {
        key: "reproductionSteps",
        label: "재현 절차",
        required: true,
        type: "textarea",
        placeholder: "버그 재현 절차를 단계별로 입력하세요",
      },
      {
        key: "expectedVsActual",
        label: "기대 결과 vs 실제 결과",
        required: true,
        type: "textarea",
        placeholder: "기대했던 결과와 실제 결과를 비교하여 입력하세요",
      },
      {
        key: "environment",
        label: "발생 환경 정보",
        required: true,
        type: "textarea",
        placeholder: "브라우저, OS, 버전 등 환경 정보를 입력하세요",
      },
      {
        key: "ticketType",
        label: "티켓 유형",
        required: true,
        type: "select",
        defaultValue: "버그",
        options: ["개발", "기획", "회의", "QA", "버그", "분석", "문서"],
      },
      { key: "startDate", label: "작업 시작일", required: true, type: "date" },
      { key: "endDate", label: "작업 마감일", required: true, type: "date" },
      { key: "assignee", label: "담당자", required: true, type: "user" },
      { key: "creator", label: "생성자", required: true, type: "user" },
    ],
  },
  {
    id: "data-analysis",
    name: "데이터 분석",
    purpose: "지표 확인, 로그 분석 등 데이터 기반 인사이트",
    type: "분석",
    color: "#06b6d4",
    icon: "BarChart3",
    fields: [
      { key: "title", label: "분석 주제", required: true, type: "text", placeholder: "분석할 주제를 입력하세요" },
      { key: "priority", label: "우선순위", required: true, type: "select", options: ["높음", "보통", "낮음"] },
      {
        key: "description",
        label: "분석 배경 및 목적",
        required: true,
        type: "textarea",
        placeholder: "분석이 필요한 배경과 목적을 설명하세요",
      },
      {
        key: "dataItems",
        label: "필요한 데이터 항목",
        required: true,
        type: "textarea",
        placeholder: "분석에 필요한 데이터 항목들을 나열하세요",
      },
      {
        key: "resultLink",
        label: "분석 결과 링크",
        required: false,
        type: "text",
        placeholder: "분석 결과 링크 (완료 후 입력)",
      },
      {
        key: "ticketType",
        label: "티켓 유형",
        required: true,
        type: "select",
        defaultValue: "분석",
        options: ["개발", "기획", "회의", "QA", "버그", "분석", "문서"],
      },
      { key: "startDate", label: "작업 시작일", required: true, type: "date" },
      { key: "endDate", label: "작업 마감일", required: true, type: "date" },
      { key: "assignee", label: "담당자", required: true, type: "user" },
      { key: "creator", label: "생성자", required: true, type: "user" },
    ],
  },
]
