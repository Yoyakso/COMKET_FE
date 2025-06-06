import { useState } from 'react';
import * as S from './MemberTable.Style';
import { MemberRow } from './MemberRow';
import type { MemberData } from '@/types/member';
import { ChevronDown, ChevronUp } from '@/assets/icons';
import { MemberDetailPanel } from '@/components/memberDetailPanel/MemberDetailPanel';

interface MemberTableProps {
  members: MemberData[];
  onUpdateMember: (email: string, newRole: 'ADMIN' | 'MEMBER') => void;
}

type SortField = 'name' | 'email' | 'positionType' | 'state' | 'updatedAt' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export const MemberTable = ({ members, onUpdateMember }: MemberTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronDown />;
    }
    return sortDirection === 'asc' ? <ChevronUp width="16px" height="16px" /> : <ChevronDown />;
  };

  const sortedMembers = [...members].sort((a, b) => {
    const isDeletedA = a.state === 'DELETED';
    const isDeletedB = b.state === 'DELETED';

    if (isDeletedA && !isDeletedB) return 1;
    if (!isDeletedA && isDeletedB) return -1;

    if (!sortField) return 0;

    let valueA: string | number = '';
    let valueB: string | number = '';
    switch (sortField) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'email':
        valueA = a.email;
        valueB = b.email;
        break;
      case 'positionType':
        const roleRank = { OWNER: 0, ADMIN: 1, MEMBER: 2 } as const;
        valueA = roleRank[a.positionType] ?? 99;
        valueB = roleRank[b.positionType] ?? 99;
        break;
      case 'state':
        valueA = a.state;
        valueB = b.state;
        break;
      case 'createdAt':
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      case 'updatedAt':
        valueA = new Date(a.updatedAt).getTime();
        valueB = new Date(b.updatedAt).getTime();
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

  return (
    <S.TableContainer>
      <S.Table>
        <S.TableHeader>
          <S.HeaderRow>
            <S.HeaderCell onClick={() => handleSort('name')}>
              <S.HeaderContent>
                <span>성명</span>
                {getSortIcon('name')}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort('email')}>
              <S.HeaderContent>
                <span>이메일</span>
                {getSortIcon('email')}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort('positionType')}>
              <S.HeaderContent>
                <span>역할</span>
                {getSortIcon('positionType')}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort('state')}>
              <S.HeaderContent>
                <span>계정 상태</span>
                {getSortIcon('state')}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort('updatedAt')}>
              <S.HeaderContent>
                <span>비활성/제거 일자</span>
                {getSortIcon('updatedAt')}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell onClick={() => handleSort('createdAt')}>
              <S.HeaderContent>
                <span>참여 일자</span>
                {getSortIcon('createdAt')}
              </S.HeaderContent>
            </S.HeaderCell>
            <S.HeaderCell>관리</S.HeaderCell>
          </S.HeaderRow>
        </S.TableHeader>
        <S.TableBody>
          {sortedMembers.map((member, index) => (
            <MemberRow
              key={`${member.id}-${index}`}
              member={member}
              onUpdateMember={onUpdateMember}
              onClickDetail={id => setSelectedMemberId(id)}
            />
          ))}
        </S.TableBody>
      </S.Table>
      {selectedMemberId !== null && (
        <MemberDetailPanel memberId={selectedMemberId} onClose={() => setSelectedMemberId(null)} />
      )}
    </S.TableContainer>
  );
};
