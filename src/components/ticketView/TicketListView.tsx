import * as S from "./TicketListView.Style";
import { useState, useMemo, useEffect } from "react";
import { TicketTable } from "@/components/ticket/TicketTable";
import { TicketToolbar } from "@/components/ticket/TicketToolbar";
import { TicketFilterStore, TicketDropdownStore } from "../ticket/Ticket";
import { TicketSelectionStore } from "@/components/ticket/TicketSelectionStore";
import { TicketType, Status } from "@/types/filter";
import { Ticket } from "@/types/ticket";

interface TicketListViewProps {
  listTickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void
}

export const TicketListView = ({ listTickets, onTicketClick }: TicketListViewProps) => {
  const {
    selectedPriorities,
    selectedStatuses,
    selectedTypes,
  } = TicketFilterStore();

  const { tickets, updateManyTicketType, updateManyTicketStatus, deleteManyTicket } =
    TicketDropdownStore();

  const { selectedIds, toggleSingle, toggleWithSubtickets, clearSelection, setInitialTickets } =
    TicketSelectionStore();

  useEffect(() => {
    setInitialTickets(listTickets);
  }, [listTickets]);

  const [searchValue, setSearchValue] = useState('');

  const filteredTickets = listTickets.filter(ticket => {
    const isPriorityMatch =
      selectedPriorities.length === 0 || selectedPriorities.includes(ticket.priority);
    const isStatusMatch =
      selectedStatuses.length === 0 || selectedStatuses.includes(ticket.status);
    const isTypeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(ticket.type);
    const isSearchMatch =
      typeof ticket.title === "string" &&
      ticket.title.toLowerCase().includes(searchValue.toLowerCase());

    return isPriorityMatch && isStatusMatch && isTypeMatch && isSearchMatch;
  });

  return (
    <S.Wrapper>
      <TicketToolbar
        selectedTicketIds={selectedIds}
        onDeleteTickets={() => {
          deleteManyTicket(selectedIds)
          clearSelection();
        }}
        onChangeType={(type) => updateManyTicketType(selectedIds, type as TicketType)}
        onChangeStatus={(status) => updateManyTicketStatus(selectedIds, status as Status)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TicketTable
        tickets={filteredTickets}
        selectedIds={selectedIds}
        toggleSingle={toggleSingle}
        toggleWithSubtickets={toggleWithSubtickets}
        onTicketClick={onTicketClick} />
    </S.Wrapper>
  );
};
