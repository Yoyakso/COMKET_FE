import React, { useState } from 'react';
import * as S from './TicketToolbar.Style';
import { Filter } from '@/components/common/dropdown/Filter';
import { TextInput } from '@/components/common/textInput/TextInput';
import { SlidersHorizontal } from 'lucide-react';
import { TicketFilterStore } from '@/components/ticket/Ticket';
import { BulkDropdown } from '@components/common/dropdown/BulkDropdown'; // ✅ 새로 만든 드롭다운
import { STATUS_COLORS } from './StatusDropdown.Style';

interface TicketToolbarProps {
    selectedTicketIds: number[]; // ✅ 체크된 티켓들
    onDeleteTickets: () => void; // ✅ 삭제 핸들러 (부모에서 전달)
    onChangeType: (newType: string) => void;
    onChangeStatus: (newStatus: string) => void;
}

export const TicketToolbar = ({
    selectedTicketIds,
    onDeleteTickets,
    onChangeType,
    onChangeStatus,
}: TicketToolbarProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { selectedPriorities, selectedStatuses, selectedTypes } = TicketFilterStore();

    const selectedCount =
        selectedPriorities.length + selectedStatuses.length + selectedTypes.length;

    return (
        <S.Wrapper>

            <S.BulkActionBox>
                <S.BulkButton onClick={onDeleteTickets}>삭제</S.BulkButton>

                <BulkDropdown
                    field="type"
                    selectedValue="유형 변경"
                    ticketIds={selectedTicketIds}
                    options={['기획', '디자인', '개발', '버그', '테스트', '문서화', '회의/논의', '기타']}
                    onSelect={onChangeType}
                />

                <BulkDropdown
                    field="status"
                    selectedValue="상태 변경"
                    ticketIds={selectedTicketIds}
                    options={['TODO', 'IN_PROGRESS', 'DONE', 'HOLD', 'DROP', 'BACKLOG']}
                    onSelect={onChangeStatus}
                    getColor={status => STATUS_COLORS[status as keyof typeof STATUS_COLORS]}
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
                    <TextInput
                        value={searchValue}
                        onChange={setSearchValue}
                        placeholder="티켓 검색"
                        size="md"
                        state="enable"
                    />
                </S.SearchBox>
            </S.RightSection>

        </S.Wrapper>
    );
};
