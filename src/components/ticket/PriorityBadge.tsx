import * as S from "./PriorityBadge.Style";

interface PriorityBadgeProps {
    priority: "HIGH" | "MEDIUM" | "LOW";
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
    return <S.Badge $priority={priority}>{priority}</S.Badge>;
};