import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as S from './ProjectMemberModal.Style';
import { Search, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { AddProjectMemberModal } from './AddProjectMemberModal';
import { getProjectMembers, editProjectMemberRole, deleteProjectMember } from '@/api/Project';
import { getWorkspaceMembers } from '@/api/Member';
import { getColorFromString } from '@/utils/avatarColor';
import { toast } from 'react-toastify';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { RemoveProjectMemberModal } from './RemoveProjectMemberModal';

export interface ProjectMember {
  id: number;
  email: string;
  name: string;
  position: string;
  role: '프로젝트 관리자' | '일반 멤버';
  initial: string;
  color: string;
  profileFileUrl: string;
}

interface ProjectMemberModalProps {
  projectId: number;
  projectName?: string;
  onClose: () => void;
  onSave?: () => Promise<void>;
}

export const ProjectMemberModal = ({
  projectId,
  projectName = '프로젝트',
  onClose,
  onSave,
}: ProjectMemberModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [activeRoleDropdown, setActiveRoleDropdown] = useState<number | null>(null);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [mounted, setIsMounted] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [memberMap, setMemberMap] = useState<
    Map<
      string,
      {
        memberId: number;
        name: string;
        email: string;
      }
    >
  >(new Map());
  const [roleChanges, setRoleChanges] = useState<Record<string, '프로젝트 관리자' | '일반 멤버'>>(
    {},
  );
  const workspaceName = useWorkspaceStore(state => state.workspaceName);
  const workspaceId = useWorkspaceStore(state => state.workspaceId);
  const [removeTarget, setRemoveTarget] = useState<ProjectMember | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('.role-dropdown') && !target.closest('.role-selector')) {
        setActiveRoleDropdown(null);
      }
      if (!target.closest('.action-menu') && !target.closest('.action-button')) {
        setActiveActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const data = await getProjectMembers(workspaceName, projectId);
        const workspaceMembers = await getWorkspaceMembers(workspaceId); // 👉 추가
        const memberMap = new Map(
          workspaceMembers.map(m => [m.email, m.profileFileUrl])
        );

        const mappedMembers: ProjectMember[] = data
          .filter((m: any) => m.state === 'ACTIVE')
          .map((m: any) => ({
            email: m.email,
            id: m.projectMemberId,
            name: m.name,
            position: '',
            role: m.positionType === 'MEMBER' ? '일반 멤버' : '프로젝트 관리자',
            initial: m.name?.charAt(0) || '?',
            color: getColorFromString(m.name),
            profileFileUrl: memberMap.get(m.email) || '',
          }));

        setMembers(mappedMembers);
      } catch (error) {
        console.error('프로젝트 멤버 불러오기 실패!!!!!:', error);
        throw error;
      }
    };

    fetchProjectMembers();
  }, [projectId]);

  useEffect(() => {
    const fetchWorkspaceMembers = async () => {
      try {
        const members = await getWorkspaceMembers(workspaceId);
        console.log("memememe", members)
        const memberMap = new Map<
          string,
          {
            memberId: number;
            name: string;
            email: string;
            profileFileUrl: string;
          }
        >();
        members.forEach(m => {
          memberMap.set(m.email, {
            memberId: m.workspaceMemberid,
            name: m.name,
            email: m.email,
            profileFileUrl: m.profileFileUrl,
          });
        });

        setMemberMap(memberMap);
      } catch (error) {
        console.error('워크스페이스 멤버 조회 실패:', error);
      }
    };

    fetchWorkspaceMembers();
  }, []);

  console.log("members", members);


  const addMembersToList = (newMembers: ProjectMember[]) => {
    setMembers(prev => [...prev, ...newMembers]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleRoleDropdown = (memberId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveRoleDropdown(activeRoleDropdown === memberId ? null : memberId);
    setActiveActionMenu(null);
  };

  const toggleActionMenu = (memberId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveActionMenu(activeActionMenu === memberId ? null : memberId);
    setActiveRoleDropdown(null);
  };

  const handleRoleChange = (memberId: number, newRole: '프로젝트 관리자' | '일반 멤버') => {
    setRoleChanges(prev => ({ ...prev, [memberId]: newRole }));
    setMembers(prev =>
      prev.map(member => (member.id === memberId ? { ...member, role: newRole } : member)),
    );
    setActiveRoleDropdown(null);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronDown size={16} />;
    }
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const filteredMembers = members.filter(
    member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = '';
    let valueB = '';

    switch (sortField) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'position':
        valueA = a.position;
        valueB = b.position;
        break;
      case 'role':
        valueA = a.role;
        valueB = b.role;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const handleSave = async () => {
    try {
      if (!workspaceName) throw new Error('워크스페이스 정보가 없습니다.');

      const editPromises = Object.entries(roleChanges).map(([memberId, role]) => {
        const positionType = role === '프로젝트 관리자' ? 'ADMIN' : 'MEMBER';
        return editProjectMemberRole(workspaceName, projectId, {
          projectMemberId: Number(memberId),
          positionType,
        });
      });

      await Promise.all(editPromises);
      toast.success('역할이 저장되었습니다.');
      setRoleChanges({});
      if (onSave) await onSave();
      onClose();
    } catch (error) {
      console.error('역할 변경 저장 실패:', error);
      alert('역할 변경 저장 중 오류가 발생했습니다.');
    }
  };

  const openAddMemberModal = () => {
    setShowAddMemberModal(true);
  };

  const closeAddMemberModal = () => {
    setShowAddMemberModal(false);
  };

  const confirmRemoveMember = async () => {
    if (!removeTarget || !workspaceName) return;
    try {
      await deleteProjectMember(workspaceName, projectId, removeTarget.id);
      setMembers(prev => prev.filter(m => m.id !== removeTarget.id));
      setActiveActionMenu(null);
      toast.success('멤버가 성공적으로 제거되었습니다.');
      setRemoveTarget(null);
    } catch (error: any) {
      console.error('멤버 제거 실패:', error);
      toast.error('멤버 제거 중 오류가 발생했습니다.');
      setRemoveTarget(null);
    }
  };

  const modalContent = (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.Title>{projectName} 멤버</S.Title>

        <S.HeaderSection>
          <S.MemberCount>{members.length}명</S.MemberCount>
          <S.SearchSection>
            <S.SearchInput>
              <S.Input
                type="text"
                placeholder="이름/이메일로 검색"
                value={searchQuery}
                onChange={handleSearch}
              />
              <S.SearchIcon>
                <Search size={18} />
              </S.SearchIcon>
            </S.SearchInput>
            <S.AddButton onClick={openAddMemberModal}>멤버 추가</S.AddButton>
          </S.SearchSection>
        </S.HeaderSection>

        <S.TableContainer>
          <S.Table>
            <S.TableHeader>
              <S.HeaderRow>
                <S.HeaderCell onClick={() => handleSort('name')}>
                  성명 {getSortIcon('name')}
                </S.HeaderCell>
                <S.HeaderCell onClick={() => handleSort('position')}>
                  직무 {getSortIcon('position')}
                </S.HeaderCell>
                <S.HeaderCell onClick={() => handleSort('role')}>
                  역할 {getSortIcon('role')}
                </S.HeaderCell>
                <S.HeaderCell>관리</S.HeaderCell>
              </S.HeaderRow>
            </S.TableHeader>
            <S.TableBody>
              {sortedMembers.map(member => (
                <S.Row key={member.id}>
                  <S.Cell>
                    <S.UserInfo>
                      <S.Avatar $bgColor={member.color}>
                        {member.profileFileUrl ? (
                          <img
                            src={member.profileFileUrl}
                            alt={member.name}
                          />
                        ) : (
                          member.initial
                        )}
                      </S.Avatar>
                      <S.UserName>
                        {member.name} [{member.email.split('@')[0]}]
                      </S.UserName>
                    </S.UserInfo>
                  </S.Cell>
                  <S.Cell>{member.position}</S.Cell>
                  <S.Cell>
                    <S.RoleSelector
                      className="role-selector"
                      onClick={e => toggleRoleDropdown(member.id, e)}
                    >
                      {member.role}
                      <ChevronDown size={16} />

                      {activeRoleDropdown === member.id && (
                        <S.RoleDropdown className="role-dropdown">
                          <S.RoleOption
                            $active={member.role === '프로젝트 관리자'}
                            onClick={() => handleRoleChange(member.id, '프로젝트 관리자')}
                          >
                            프로젝트 관리자
                          </S.RoleOption>
                          <S.RoleOption
                            $active={member.role === '일반 멤버'}
                            onClick={() => handleRoleChange(member.id, '일반 멤버')}
                          >
                            일반 멤버
                          </S.RoleOption>
                        </S.RoleDropdown>
                      )}
                    </S.RoleSelector>
                  </S.Cell>
                  <S.Cell>
                    <S.ActionButtonContainer>
                      <S.ActionButton
                        className="action-button"
                        onClick={e => toggleActionMenu(member.id, e)}
                      >
                        <MoreHorizontal size={18} style={{ pointerEvents: 'none' }} />
                      </S.ActionButton>

                      {activeActionMenu === member.id && (
                        <S.ActionMenu className="action-menu">
                          <S.ActionMenuItem
                            $danger
                            // onClick={() => handleDeleteMember(member.id)}
                            onClick={() => setRemoveTarget(member)}
                          >
                            멤버 제거
                          </S.ActionMenuItem>
                        </S.ActionMenu>
                      )}
                    </S.ActionButtonContainer>
                  </S.Cell>
                </S.Row>
              ))}
            </S.TableBody>
          </S.Table>
        </S.TableContainer>

        <S.ButtonContainer>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalOverlay>
  );

  return (
    <>
      {ReactDOM.createPortal(modalContent, document.body)}
      {showAddMemberModal && (
        <AddProjectMemberModal
          onClose={closeAddMemberModal}
          memberMap={memberMap}
          projectId={projectId}
          onAddSuccess={addMembersToList}
        />
      )}
      {removeTarget && (
        <RemoveProjectMemberModal
          onClose={() => setRemoveTarget(null)}
          onConfirm={confirmRemoveMember}
          memberName={removeTarget.name}
        />
      )}
    </>
  );
};
