import React, { useState } from 'react';
import * as S from './TicketToolbar.Style';
import { Filter } from '@/components/common/dropdown/Filter';
import { TextInput } from '@/components/common/textInput/TextInput';
import { SlidersHorizontal } from 'lucide-react';

export const TicketToolbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <S.Wrapper>
            <S.FilterBox>
                <S.FilterButton onClick={() => { console.log("필터qjxms"); setIsFilterOpen((prev) => !prev) }}>
                    <SlidersHorizontal size={16} />
                    필터
                </S.FilterButton>
                {isFilterOpen && (
                    <S.FilterMenu >
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
        </S.Wrapper>

    );
}   
