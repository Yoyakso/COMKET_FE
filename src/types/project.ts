// 프로젝트 요약 정보 (리스트나 테이블에 표시할 때 사용)
export interface ProjectData {
  id: string
  name: string
  description: string
  tag: string
  visibility: string // 예: "전체 공개", "멤버 공개"
  owner: string
  memberCount: number
  createdBy: string
  createdAt: string // YYYY-MM-DD
}

export interface ProjectFormData {
  name: string
  description: string
  isPublic: boolean
  tags: string[]
}

// 프로젝트 생성에 사용되는 데이터
export interface CreateProjectDto {
  name: string
  description: string
  isPublic: boolean
  profile_file_id: number | null
  tags: string[] // 프론트 내부에서 사용
}

// 단일 프로젝트 상세 조회 응답에 사용
export interface ProjectDetail {
  id: string
  name: string
  description: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  // 필요한 경우 members 등 포함 가능
}

// 프로젝트 멤버 타입
export interface ProjectMember {
  memberId: number
  name: string
  email: string
  positionType: "OWNER" | "ADMIN" | "MEMBER"
  isActive: "true" | "false" // 서버 응답 그대로 문자열 처리
}

// 멤버 전체 응답 타입 (getProjectMembers 호출 시 사용)
export interface ProjectMembersResponse {
  members: ProjectMember[]
}
