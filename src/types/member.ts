export interface MemberData {
  id: number;
  name: string
  email: string
  positionType: "OWNER" | "ADMIN" | "MEMBER";
  state: "ACTIVE" | "INACTIVE" | "DELETED";
  createdAt: string;
  updatedAt: string;
}
