export interface MemberData {
  workspaceMemberid: number;
  id: number;
  name: string;
  email: string;
  positionType: 'ADMIN' | 'MEMBER';
  state: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  createdAt: string;
  updatedAt: string;
  profileFileUrl: string;
}
