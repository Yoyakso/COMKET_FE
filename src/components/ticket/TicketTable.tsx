import React, { useEffect, useRef, useState } from 'react';
import { TicketRow } from './TicketRow';
import * as S from './TicketTable.Style';
import { Ticket } from '@/types/ticket';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { TicketSelectionStore } from '@/components/ticket/TicketSelectionStore';
import { markTicketAlarmAsRead } from '@/api/Alarm';

const INITIAL_WIDTHS = {
  expander: 28,
  checkbox: 28,
  id: 40,
  title: 200,
  type: 80,
  assignee: 140,
  priority: 90,
  status: 120,
  startDate: 120,
  dueDate: 120,
  subticketCount: 40,
  writer: 140,
};

const MIN_WIDTHS = {
  expander: 5,
  checkbox: 5,
  id: 10,
  title: 20,
  type: 80,
  assignee: 100,
  priority: 80,
  status: 80,
  startDate: 80,
  dueDate: 80,
  subticketCount: 40,
  writer: 70,
};

const PRIORITY_ORDER = { HIGH: 3, MEDIUM: 2, LOW: 1 };

const sortIcons = ({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) => {
  if (!active) return <ChevronsUpDown size={16} />;
  return direction === 'asc' ? (
    <ChevronUp size={16} color="#18D9A0" />
  ) : (
    <ChevronDown size={16} color="#18D9A0" />
  );
};

interface TicketTableProps {
  tickets: Ticket[];
  selectedIds?: number[];
  toggleSingle?: (id: number) => void;
  toggleWithSubtickets?: (ticket: Ticket) => void;
  onTicketClick: (ticket: Ticket) => void;
  onInfoClick?: (ticket: Ticket) => void;
  onTicketHover?: (ticket: Ticket | null) => void;
  projectName: string;
  alarmTicketIds?: Set<number>;
}

export const TicketTable = ({
  tickets,
  onTicketClick,
  onInfoClick,
  onTicketHover,
  projectName,
  alarmTicketIds: alarmTicketIdsProp,
}: TicketTableProps) => {
  const [sortKey, setSortKey] = useState<keyof Ticket | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [columnWidths, setColumnWidths] = useState(INITIAL_WIDTHS);

  const resizingCol = useRef<string | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);
  const [alarmTicketIds, setAlarmTicketIds] = useState<Set<number>>(new Set());

  const { selectedIds, toggleSingle, toggleWithSubtickets, setInitialTickets } =
    TicketSelectionStore();

  useEffect(() => {
    setInitialTickets(tickets);
  }, [tickets]);

  useEffect(() => {
    if (alarmTicketIdsProp) {
      setAlarmTicketIds(new Set(alarmTicketIdsProp));
    }
  }, [alarmTicketIdsProp]);

  const handleTicketClick = async (ticket: Ticket) => {
    if (alarmTicketIds.has(ticket.id)) {
      try {
        await markTicketAlarmAsRead(ticket.id);
        setAlarmTicketIds(prev => {
          const updated = new Set(prev);
          updated.delete(ticket.id);
          return updated;
        });
      } catch (e) {
        console.error('알림 읽음 처리 실패:', e);
      }
    }

    // 기존 동작
    onTicketClick(ticket);
  };

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

    // 우선순위 특수 처리
    if (sortKey === 'priority') {
      const aPriority = aValue as keyof typeof PRIORITY_ORDER;
      const bPriority = bValue as keyof typeof PRIORITY_ORDER;
      return sortOrder === 'asc'
        ? PRIORITY_ORDER[aPriority] - PRIORITY_ORDER[bPriority]
        : PRIORITY_ORDER[bPriority] - PRIORITY_ORDER[aPriority];
    }
    // 담당자/작성자 name 기준 정렬
    if (sortKey === 'assignee_member' || sortKey === 'creator_member') {
      const aName = (aValue as { name?: string })?.name ?? '';
      const bName = (bValue as { name?: string })?.name ?? '';
      return sortOrder === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
    }

    // 기본 string
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    // 숫자
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleMouseDown = (e: React.MouseEvent, key: string) => {
    resizingCol.current = key;
    startX.current = e.clientX;
    startWidth.current = columnWidths[key];

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
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
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const headers: {
    key: keyof typeof INITIAL_WIDTHS;
    label: string;
    resizable?: boolean;
    sortable?: boolean;
    align?: 'left' | 'center';
  }[] = [
    { key: 'expander', label: '', resizable: true, sortable: false, align: 'center' },
    { key: 'checkbox', label: '', resizable: true, sortable: false, align: 'center' },
    { key: 'id', label: '', resizable: true, sortable: false, align: 'center' },
    { key: 'title', label: '티켓', resizable: true, sortable: true, align: 'left' },
    { key: 'type', label: '유형', resizable: true, sortable: true, align: 'center' },
    { key: 'assignee', label: '담당자', resizable: true, sortable: true, align: 'left' },
    { key: 'priority', label: '우선순위', resizable: true, sortable: true, align: 'center' },
    { key: 'status', label: '상태', resizable: true, sortable: true, align: 'center' },
    { key: 'startDate', label: '시작일', resizable: true, sortable: true, align: 'center' },
    { key: 'dueDate', label: '마감일', resizable: true, sortable: true, align: 'center' },
    { key: 'subticketCount', label: '하위 티켓', resizable: true, sortable: true, align: 'center' },
    { key: 'writer', label: '작성자', resizable: true, sortable: true, align: 'left' },
  ];

  return (
    <S.TableWrapper>
      <S.Table>
        <S.TableHeader>
          <S.HeaderRow>
            {headers.map(({ key, label, resizable, sortable, align }) => (
              <S.HeaderCell
                key={key}
                $align={align}
                style={{ width: columnWidths[key] }}
                onClick={sortable ? () => handleSort(key as keyof Ticket) : undefined}
              >
                <S.HeaderContent $align={align}>
                  {sortable ? (
                    <S.SortableHeader>
                      {label} {sortIcons({ active: sortKey === key, direction: sortOrder })}
                    </S.SortableHeader>
                  ) : (
                    label
                  )}
                </S.HeaderContent>
                {resizable && <S.Resizer onMouseDown={e => handleMouseDown(e, key)} />}
              </S.HeaderCell>
            ))}
          </S.HeaderRow>
        </S.TableHeader>
        <S.TableBody>
          {sortedTickets.map(ticket => {
            return (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                isChecked={id => selectedIds?.includes(id) ?? false}
                toggleSingle={toggleSingle}
                toggleWithSubtickets={toggleWithSubtickets}
                onTicketClick={handleTicketClick}
                onInfoClick={onInfoClick}
                onTicketHover={onTicketHover}
                projectName={projectName}
                alarmTicketIds={alarmTicketIds}
                hasAlarm={alarmTicketIds.has(ticket.id)}
              />
            );
          })}
        </S.TableBody>
      </S.Table>
    </S.TableWrapper>
  );
};
