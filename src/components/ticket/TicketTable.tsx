import React, { useEffect, useRef, useState } from 'react';
import { TicketRow } from "./TicketRow";
import * as S from "./TicketTable.Style";
import { Ticket } from "@/types/ticket";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { TicketSelectionStore } from "@/components/ticket/TicketSelectionStore";

const INITIAL_WIDTHS = {
    expander: 32,
    checkbox: 32,
    id: 60,
    title: 240,
    type: 100,
    assignee: 160,
    priority: 100,
    status: 120,
    startDate: 120,
    dueDate: 120,
    subticketCount: 80,
    writer: 160,
};

const MIN_WIDTHS = {
    expander: 20,
    checkbox: 20,
    id: 40,
    title: 80,
    type: 80,
    assignee: 100,
    priority: 80,
    status: 80,
    startDate: 80,
    dueDate: 80,
    subticketCount: 40,
    writer: 100,
};

const sortIcons = ({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) => {
    if (!active) return <ChevronsUpDown size={16} />;
    return direction === 'asc' ? <ChevronUp size={16} color='#18D9A0' /> : <ChevronDown size={16} color='#18D9A0' />;
};

interface TicketTableProps {
    tickets: Ticket[];
    selectedIds?: number[];
    toggleSingle?: (id: number) => void;
    toggleWithSubtickets?: (ticket: Ticket) => void;
}

export const TicketTable = ({ tickets }: TicketTableProps) => {
    const [sortKey, setSortKey] = useState<keyof Ticket | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [columnWidths, setColumnWidths] = useState(INITIAL_WIDTHS);

    const resizingCol = useRef<string | null>(null);
    const startX = useRef<number>(0);
    const startWidth = useRef<number>(0);

    const {
        selectedIds,
        toggleSingle,
        toggleWithSubtickets,
        setInitialTickets
    } = TicketSelectionStore();

    useEffect(() => {
        setInitialTickets(tickets);
    }, [tickets]);

    const handleSort = (key: keyof Ticket) => {
        if (sortKey === key) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
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
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
    });

    const handleMouseDown = (e: React.MouseEvent, key: string) => {
        resizingCol.current = key;
        startX.current = e.clientX;
        startWidth.current = columnWidths[key];

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!resizingCol.current) return;
        const delta = e.clientX - startX.current;
        const key = resizingCol.current;
        const min = MIN_WIDTHS[key] ?? 40;
        const newWidth = Math.max(min, startWidth.current + delta);

        setColumnWidths(prev => ({
            ...prev,
            [key]: newWidth,
        }));
    };

    const handleMouseUp = () => {
        resizingCol.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const headers: { key: keyof typeof INITIAL_WIDTHS; label: string; resizable?: boolean; sortable?: boolean }[] = [
        { key: 'expander', label: '', resizable: true, sortable: false },
        { key: 'checkbox', label: '', resizable: true, sortable: false },
        { key: 'id', label: '티켓 ID', resizable: true, sortable: true },
        { key: 'title', label: '티켓', resizable: true, sortable: true },
        { key: 'type', label: '유형', resizable: true, sortable: true },
        { key: 'assignee', label: '담당자', resizable: true, sortable: true },
        { key: 'priority', label: '우선순위', resizable: true, sortable: true },
        { key: 'status', label: '상태', resizable: true, sortable: true },
        { key: 'startDate', label: '시작일', resizable: true, sortable: true },
        { key: 'dueDate', label: '마감일', resizable: true, sortable: true },
        { key: 'subticketCount', label: '하위 티켓', resizable: true, sortable: true },
        { key: 'writer', label: '작성자', resizable: true, sortable: true },
    ];

    return (
        <S.TableWrapper>
            <S.Table>
                <S.TableHeader>
                    <S.HeaderRow>
                        {headers.map(({ key, label, resizable, sortable }) => (
                            <S.HeaderCell
                                key={key}
                                style={{ width: columnWidths[key] }}
                                onClick={sortable ? () => handleSort(key as keyof Ticket) : undefined}
                            >
                                <S.HeaderContent>
                                    {sortable ? (
                                        <S.SortableHeader>
                                            {label} {sortIcons({ active: sortKey === key, direction: sortOrder })}
                                        </S.SortableHeader>
                                    ) : (
                                        label
                                    )}
                                </S.HeaderContent>
                                {resizable && (
                                    <S.Resizer onMouseDown={(e) => handleMouseDown(e, key)} />
                                )}
                            </S.HeaderCell>
                        ))}
                    </S.HeaderRow>
                </S.TableHeader>
                <S.TableBody>
                    {sortedTickets.map(ticket => (
                        <TicketRow
                            key={ticket.id}
                            ticket={ticket}
                            isChecked={id => selectedIds.includes(id)}
                            onCheckToggle={toggleSingle}
                            toggleWithSubtickets={toggleWithSubtickets}
                        />
                    ))}
                </S.TableBody>
            </S.Table>
        </S.TableWrapper >
    );
};