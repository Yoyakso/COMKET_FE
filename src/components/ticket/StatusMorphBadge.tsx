import * as S from './StatusMorphBadge.Style';
import {
    Clock,
    LoaderCircle,
    CheckCircle2,
    PauseCircle,
    XCircle,
    ListTodo,
} from 'lucide-react';

interface StatusMorphBadgeProps {
    status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'HOLD' | 'DROP' | 'BACKLOG';
}

const iconMap = {
    TODO: <Clock size={16} />,
    IN_PROGRESS: <LoaderCircle size={16} />,
    DONE: <CheckCircle2 size={16} />,
    HOLD: <PauseCircle size={16} />,
    DROP: <XCircle size={16} />,
    BACKLOG: <ListTodo size={16} />,
};

export const StatusMorphBadge = ({ status }: StatusMorphBadgeProps) => {
    return (
        <S.BadgeWrapper $status={status}>
            <span className="icon">{iconMap[status]}</span>
            <span className="text">{status.replace('_', ' ')}</span>
        </S.BadgeWrapper>
    );
};
