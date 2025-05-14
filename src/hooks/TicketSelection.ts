import { useState } from "react";
import type { Ticket } from "@/types/ticket";


export const TicketSelection = (initialTickets: Ticket[]) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isSelected = (id: number) => selectedIds.includes(id);

  const toggleSingle = (id: number, parentId?: number) => {
  setSelectedIds((prev) => {
    const isChecked = prev.includes(id);
    let updated = isChecked
      ? prev.filter((v) => v !== id)
      : [...prev, id];

    //하위 티켓 해제 시, 상위도 해제
    if (isChecked && parentId) {
      updated = updated.filter((v) => v !== parentId);
    }
    // 하위 티켓 체크 시, 상위도 체크
    if (!isChecked && parentId) {
      // 상위 티켓 객체 찾기
      const parentTicket = initialTickets.find(t => t.id === parentId);
      const allSubIds = parentTicket?.subtickets?.map(s => s.id) ?? [];

      const allSelected = allSubIds.every(subId =>
        subId === id || prev.includes(subId) 
        // 현재 누른 걸 선택되어졌다고 가정 -> 형제티켓 체크 확인 후 상위티켓에 반영
      );

      if (allSelected) {
        updated = [...updated, parentId];
      }
    }

     // 상위 티켓 체크 해제 시 → 하위 티켓도 모두 해제
    if (isChecked && !parentId) {
      const ticket = initialTickets.find(t => t.id === id);
      const subIds = ticket?.subtickets?.map(s => s.id) ?? [];
      updated = updated.filter((v) => !subIds.includes(v));
    }

    return updated;
  });
};
  // 상위 체크 → 하위 전부 선택 / 해제
  const toggleWithSubtickets = (ticket: Ticket) => {
    const allIds = [ticket.id, ...(ticket.subtickets?.map((s) => s.id) ?? [])];
    const isAllSelected = allIds.every((id) => selectedIds.includes(id));

    if (isAllSelected) {
      // 전체 해제
      setSelectedIds((prev) => prev.filter((id) => !allIds.includes(id)));
    } else {
      // 전체 체크
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allIds])));
    }
  };

  return {
    selectedIds,
    isSelected,
    toggleSingle,
    toggleWithSubtickets,
    setSelectedIds,
  };
};