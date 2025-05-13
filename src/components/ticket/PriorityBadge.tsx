import * as S from "./PriorityBadge.Style";
import type { Priority } from "@components/ticket/TicketFilter";

interface PriorityBadgeProps {
    priority: Priority;
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
    return <S.Badge $priority={priority}>{priority}</S.Badge>;
};