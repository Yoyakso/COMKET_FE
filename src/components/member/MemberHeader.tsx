import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpgradePlanModal } from '@/components/billing/UpgradePlanModal';
import * as S from './MemberHeader.Style';
import { Search } from '../common/search/Search';
import { InviteModal } from '../workspace/InviteModal';
import { Dropdown, type DropdownOption } from '@/components/common/dropdown/Dropdown';
import { MemberData } from '@/types/member';

interface MemberHeaderProps {
  memberCount: number;
  onSearch: (query: string) => void;
  onFilter?: (filters: { roles: string[]; states: string[] }) => void;
  onUpdateMemberList?: (members: MemberData[]) => void;
  currentMemberCount: number;
  maxMemberCount: number;
}

const allFilterValues = ['admin', 'member', 'active', 'inactive', 'removed'];

export const MemberHeader = ({
  memberCount,
  onSearch,
  onFilter,
  onUpdateMemberList,
  currentMemberCount,
  maxMemberCount,
}: MemberHeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(allFilterValues);
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const roles = allFilterValues.filter(v => ['admin', 'member'].includes(v));
    const states = allFilterValues.filter(v => ['active', 'inactive', 'removed'].includes(v));
    onFilter?.({ roles, states });
  }, []);

  const filterOptions: DropdownOption[] = [
    { label: '워크스페이스 관리자', value: 'admin', groupName: '역할' },
    { label: '일반 멤버', value: 'member', groupName: '역할' },
    { label: '활성', value: 'active', groupName: '계정 상태' },
    { label: '비활성', value: 'inactive', groupName: '계정 상태' },
    { label: '제거', value: 'removed', groupName: '계정 상태' },
  ];

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const openInviteModal = () => {
    if (currentMemberCount >= 1) {
      setShowUpgradeModal(true);
      return;
    }

    setInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalOpen(false);
  };

  const handleFilterChange = (values: string | string[]) => {
    if (!Array.isArray(values)) return;

    setSelectedFilters(values);
    const roles = values.filter(v => ['admin', 'member'].includes(v));
    const states = values.filter(v => ['active', 'inactive', 'removed'].includes(v));

    if (onFilter) {
      onFilter({ roles, states });
    }
  };

  return (
    <S.HeaderContainer>
      <S.Title>워크스페이스 멤버 관리</S.Title>
      <S.HeaderTop>
        <S.MemberCount>{memberCount}명</S.MemberCount>
        <S.RightSection>
          <S.SearchContainer>
            <S.FilterButtonContainer ref={filterButtonRef}>
              <S.FilterDropdownWrapper>
                <Dropdown
                  options={filterOptions}
                  selectedValues={selectedFilters}
                  onChange={handleFilterChange}
                  placeholder="필터"
                  size="sm"
                  $variant={selectedFilters.length > 0 ? 'activated' : 'none'}
                  type="group-check"
                  iconLeft={true}
                />
              </S.FilterDropdownWrapper>
            </S.FilterButtonContainer>
            <S.SearchInputWrapper>
              <Search
                $state="enable"
                $variant="outlined"
                size="sm"
                onSearch={handleSearchChange}
                defaultValue={searchValue}
                disabled={false}
                onChange={handleSearchChange}
                value={searchValue}
              />
            </S.SearchInputWrapper>
          </S.SearchContainer>
          <S.InviteButton onClick={openInviteModal}>멤버 초대</S.InviteButton>
        </S.RightSection>
      </S.HeaderTop>

      {isInviteModalOpen && (
        <InviteModal onClose={closeInviteModal} onUpdateMemberList={onUpdateMemberList} />
      )}
      {showUpgradeModal && (
        <UpgradePlanModal
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={() => {
            setShowUpgradeModal(false);
            navigate('/billing');
          }}
        />
      )}
    </S.HeaderContainer>
  );
};
