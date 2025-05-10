export interface ProjectData {
  id: string
  name: string
  description: string
  tag: string
  visibility: "전체 공개" | "멤버 공개";
  owner: string
  memberCount: number
  createdBy: string
  createdAt: string
}

export interface ProjectFormData {
  name: string
  description: string
  isPublic: boolean
  tags: string[]
}

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
