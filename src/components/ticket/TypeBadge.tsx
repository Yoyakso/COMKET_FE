import * as S from "./TypeBadge.Style";
import type { TicketType } from "@/types/filter";

interface TypeBadgeProps {
    type: TicketType;
}

export const TypeBadge = ({ type }: TypeBadgeProps) => {
    return <S.Badge>{type}</S.Badge>;
};