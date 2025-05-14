import * as S from "./TicketListView.Style";
import { useState } from "react";
import { TicketTable } from "@/components/ticket/TicketTable";
import { TicketToolbar } from "@/components/ticket/TicketToolbar";
import { TicketFilterStore, TicketDropdownStore } from "../ticket/Ticket";
import { MOCK_TICKETS } from "@/constants/ticketData";
import { TicketType, Status } from "@/types/filter";


export const TicketListView = () => {

    const [selectedTicketIds, setSelectedTicketIds] = useState<number[]>([]);

    const {
        selectedPriorities,
        selectedStatuses,
        selectedTypes,
    } = TicketFilterStore();

    const {
        updateManyTicketType,
        updateManyTicketStatus,
    } = TicketDropdownStore();

    const filteredTickets = MOCK_TICKETS.filter((ticket) => {
        const isPriorityMatch = selectedPriorities.length === 0 || selectedPriorities.includes(ticket.priority);
        const isStatusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(ticket.status);
        const isTypeMatch = selectedTypes.length === 0 || selectedTypes.includes(ticket.type);
        return isPriorityMatch && isStatusMatch && isTypeMatch;
    });

    return (
        <S.Wrapper>
            <TicketToolbar
                selectedTicketIds={selectedTicketIds}
                onDeleteTickets={() => {
                    // deleteManyTickets(selectedTicketIds)
                }}
                onChangeType={(type: TicketType) => {
                    updateManyTicketType(selectedTicketIds, type);
                }}
                onChangeStatus={(status: Status) => {
                    updateManyTicketStatus(selectedTicketIds, status);
                }}
            />
            <TicketTable tickets={filteredTickets} />
        </S.Wrapper>
    );
};
