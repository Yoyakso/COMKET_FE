import { useState, useEffect } from 'react';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { MemberHeader } from '@/components/member/MemberHeader';
import { MemberTable } from '@/components/member/MemberTable';
import { MemberData } from '@/types/member';
import * as S from './MemberPage.Style';
import { getWorkspaceMembers } from '@/api/Member';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { getBillingInfo } from '@/api/Billing';

export const MemberPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<MemberData[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>([]);
  const [activeFilter, setActiveFilter] = useState<{ roles: string[]; states: string[] }>({
    roles: ['admin', 'member'],
    states: ['active', 'inactive', 'deleted'],
  });
  const [planInfo, setPlanInfo] = useState<{ maxMemberCount: number } | null>(null);

  const workspaceId = useWorkspaceStore(state => state.workspaceId);

  useEffect(() => {
    const fetchBillingInfo = async () => {
      try {
        const data = await getBillingInfo(workspaceId);
        setPlanInfo(data);
      } catch (e) {
        console.error('요금제 정보 조회 실패', e);
      }
    };

    if (workspaceId) fetchBillingInfo();
  }, [workspaceId]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getWorkspaceMembers(workspaceId);
        setMembers(data);
      } catch (error) {
        console.error('멤버 불러오기 실패:', error);
        throw error;
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const filtered = members.filter(member => {
      const roleMatch = activeFilter.roles.includes(member.positionType.toLowerCase());
      const stateMatch = activeFilter.states.includes(member.state.toLowerCase());
      return roleMatch && stateMatch;
    });
    setFilteredMembers(filtered);
  }, [members, activeFilter]);

  const handleFilter = ({ roles, states }: { roles: string[]; states: string[] }) => {
    setActiveFilter({ roles, states });
  };

  useEffect(() => {
    if (members.length > 0) {
      const defaultRoles = ['admin', 'member'];
      const defaultStates = ['active', 'inactive', 'deleted'];
      handleFilter({ roles: defaultRoles, states: defaultStates });
    }
  }, [members]);

  const handleNavigateMember = async () => {
    try {
      await getWorkspaceMembers(workspaceId);
    } catch (error) {
      setMembers([]);
    }
  };

  const finalFilteredMembers = filteredMembers.filter(member => {
    const nameMatch = member.name?.includes(searchQuery);
    const emailMatch = member.email?.includes(searchQuery);
    const idMatch = member.id !== undefined && member.id.toString().includes(searchQuery);

    return nameMatch || emailMatch || idMatch;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMemberUpdate = (email: string, newRole: 'ADMIN' | 'MEMBER') => {
    const updated = members.map(m => (m.email === email ? { ...m, positionType: newRole } : m));
    setMembers(updated);

    const { roles, states } = activeFilter;
    const reFiltered = updated.filter(
      member =>
        roles.includes(member.positionType.toLowerCase()) &&
        states.includes(member.state.toLowerCase()),
    );
    setFilteredMembers(reFiltered);
  };

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" onNavigateMember={handleNavigateMember} />
        </S.LNBContainer>

        <S.Content>
          <MemberHeader
            memberCount={finalFilteredMembers.filter(m => m.state !== 'DELETED').length}
            onSearch={handleSearch}
            onFilter={handleFilter}
            currentMemberCount={members.length}
            maxMemberCount={planInfo?.maxMemberCount ?? Infinity}
          />
          <MemberTable members={finalFilteredMembers} onUpdateMember={handleMemberUpdate} />
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
};
