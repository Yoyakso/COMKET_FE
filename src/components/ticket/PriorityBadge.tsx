import * as S from './PriorityBadge.Style';
import type { Priority } from '@/types/filter';

interface PriorityBadgeProps {
  priority: Priority;
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  return <S.Badge $priority={priority}>{priority}</S.Badge>;
};
