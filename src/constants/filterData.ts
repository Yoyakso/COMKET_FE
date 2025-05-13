export const PRIORITY = ["HIGH", "MEDIUM", "LOW"] as const;
export const STATUS = ["TODO", "IN_PROGRESS", "DONE", "HOLD", "DROP", "BACKLOG"] as const;
export const TYPE = [
  "기획", "디자인", "개발", "버그", "테스트", "문서화", "회의/논의", "기타"
] as const;