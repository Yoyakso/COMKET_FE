import React, { useState } from 'react';
import { TicketRow } from "./TicketRow";
import * as S from "./TicketTable.Style";
import { Ticket } from "@/types/ticket";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

const sortIcons = ({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) => {
    if (!active)
        return <ChevronsUpDown size={16} />
    if (direction === 'asc')
        return <ChevronUp size={16} color='#18D9A0' />
    return <ChevronDown size={16} color='#18D9A0' />
}

interface TicketTableProps {
    tickets: Ticket[];
}

export const TicketTable = ({ tickets }: TicketTableProps) => {


    const [sortKey, setSortKey] = useState<keyof Ticket | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: keyof Ticket) => {
        if (sortKey === key) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const sortedTickets = [...tickets].sort((a, b) => {
        if (!sortKey) return 0;
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        }
        return 0;
    });

    return (
        <S.TableWrapper>
            <S.Table>
                <S.TableHeader>
                    <S.HeaderRow>
                        <S.HeaderCell ></S.HeaderCell>
                        <S.HeaderCell></S.HeaderCell>
                        <S.HeaderCell onClick={() => handleSort("id")}>
                            <S.SortableHeader>
                                티켓 ID {sortIcons({ active: sortKey === "id", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("title")}>
                            <S.SortableHeader>
                                티켓 {sortIcons({ active: sortKey === "title", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("type")}>
                            <S.SortableHeader>
                                유형 {sortIcons({ active: sortKey === "type", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("priority")}>
                            <S.SortableHeader>
                                우선순위 {sortIcons({ active: sortKey === "priority", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("status")}>
                            <S.SortableHeader>
                                상태 {sortIcons({ active: sortKey === "status", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("startDate")}>
                            <S.SortableHeader>
                                시작일 {sortIcons({ active: sortKey === "startDate", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("endDate")}>
                            <S.SortableHeader>
                                마감일 {sortIcons({ active: sortKey === "endDate", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("subticketCount")}>
                            <S.SortableHeader>
                                하위 티켓 {sortIcons({ active: sortKey === "subticketCount", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>

                        <S.HeaderCell onClick={() => handleSort("writer")}>
                            <S.SortableHeader>
                                작성자 {sortIcons({ active: sortKey === "writer", direction: sortOrder })}
                            </S.SortableHeader>
                        </S.HeaderCell>
                    </S.HeaderRow>
                </S.TableHeader>

                <S.TableBody>
                    {sortedTickets.map((ticket) => (
                        <TicketRow key={ticket.id} ticket={ticket} />
                    ))}
                </S.TableBody>
            </S.Table>
        </S.TableWrapper>
    );
};
