import React, { useState } from 'react';
import * as S from './TicketToolbar.Style';
import { Filter } from '@/components/common/dropdown/Filter';
import { Search } from '@/components/common/search/Search';
import { SlidersHorizontal } from 'lucide-react';
import { TicketFilterStore } from '@/components/ticket/Ticket';
import { BulkDropdown } from '@components/common/dropdown/BulkDropdown'; // ✅ 새로 만든 드롭다운
import { STATUS_COLORS } from './StatusDropdown.Style';
import { TicketType, Status } from '@/types/filter';
import { TYPE, STATUS } from '@/constants/filterData';

interface TicketToolbarProps {
  selectedTicketIds: number[]; //체크된 티켓들
  onDeleteTickets: () => void; //삭제 핸들러 (부모에서 전달)
  onChangeType: (newType: string) => void;
  onChangeStatus: (newStatus: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const TicketToolbar = ({
  selectedTicketIds,
  onDeleteTickets,
  onChangeType,
  onChangeStatus,
  searchValue,
  setSearchValue,
}: TicketToolbarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { selectedPriorities, selectedStatuses, selectedTypes } = TicketFilterStore();

  const selectedCount = selectedPriorities.length + selectedStatuses.length + selectedTypes.length;

  return (
    <S.Wrapper>
      <S.BulkActionBox>
        <S.BulkButton onClick={onDeleteTickets}>삭제</S.BulkButton>

        <BulkDropdown<TicketType>
          field="type"
          selectedValue="유형 변경"
          ticketIds={selectedTicketIds}
          options={TYPE}
          onSelect={value => {
            onChangeType(value);
          }}
        />

        <BulkDropdown<Status>
          field="status"
          selectedValue="상태 변경"
          ticketIds={selectedTicketIds}
          options={STATUS}
          onSelect={value => {
            onChangeStatus(value);
          }}
          getColor={status => STATUS_COLORS[status]}
        />
      </S.BulkActionBox>

      <S.RightSection>
        <S.FilterBox>
          <S.FilterButton onClick={() => setIsFilterOpen(prev => !prev)}>
            <SlidersHorizontal size={16} />
            필터
            {selectedCount > 0 && <S.FilterBadge>{selectedCount}</S.FilterBadge>}
          </S.FilterButton>
          {isFilterOpen && (
            <S.FilterMenu>
              <Filter />
            </S.FilterMenu>
          )}
        </S.FilterBox>

        <S.SearchBox>
          <Search
            size="md"
            $variant="outlined"
            placeholder="티켓 검색"
            onSearch={value => setSearchValue(value)}
            onClear={() => setSearchValue('')}
          />
        </S.SearchBox>
      </S.RightSection>
    </S.Wrapper>
  );
};
