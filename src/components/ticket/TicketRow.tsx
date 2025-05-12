import * as S from "./TicketRow.Style";
import { AvatarWithName } from "./AvatarWithName";
import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";
import { Ticket } from "@/types/ticket";

interface TicketRowProps {
    ticket: Ticket;
}

export const TicketRow = ({ ticket }: TicketRowProps) => {
    return (
        <S.TableRow>
            <S.TableCell><input type="checkbox" /></S.TableCell>
            <S.TableCell>{ticket.id}</S.TableCell>
            <S.TableCell>{ticket.title}</S.TableCell>
            <S.TableCell>{ticket.type}</S.TableCell>
            <S.TableCell><AvatarWithName user={ticket.assignee} /></S.TableCell>
            <S.TableCell><PriorityBadge priority={ticket.priority} /></S.TableCell>
            <S.TableCell><StatusBadge status={ticket.status} /></S.TableCell>
            <S.TableCell>{ticket.startDate}</S.TableCell>
            <S.TableCell>{ticket.endDate}</S.TableCell>
            <S.TableCell>{ticket.subticketCount}</S.TableCell>
            <S.TableCell><AvatarWithName user={ticket.writer} /></S.TableCell>
        </S.TableRow>
    );
};