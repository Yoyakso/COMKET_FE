import * as S from "./TicketListView.Style";
import { TicketTable } from "@/components/ticket/TicketTable";
import { TicketToolbar } from "@/components/ticket/TicketToolbar";
import { TicketFilterStore } from "../ticket/Ticket";
import { MOCK_TICKETS } from "@/constants/ticketData";


export const TicketListView = () => {

    const {
        selectedPriorities,
        selectedStatuses,
        selectedTypes,
    } = TicketFilterStore();


    const filteredTickets = MOCK_TICKETS.filter((ticket) => {
        const isPriorityMatch = selectedPriorities.length === 0 || selectedPriorities.includes(ticket.priority);
        const isStatusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(ticket.status);
        const isTypeMatch = selectedTypes.length === 0 || selectedTypes.includes(ticket.type);
        return isPriorityMatch && isStatusMatch && isTypeMatch;
    });

    return (
        <S.Wrapper>
            <TicketToolbar />
            <TicketTable tickets={filteredTickets} />
        </S.Wrapper>
    );
};
