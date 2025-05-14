import * as S from "./StatusBadge.Style";

interface StatusBadgeProps {
    status: "TODO" | "IN_PROGRESS" | "DONE" | "HOLD" | "DROP" | "BACKLOG";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    return <S.Badge $status={status}>{status.replace("_", " ")}</S.Badge>;
};
