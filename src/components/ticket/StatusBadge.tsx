import * as S from './StatusBadge.Style';
import type { Status } from '@/types/filter';

interface StatusBadgeProps {
  status?: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (!status) return null;
  return <S.Badge $status={status}>{status.replace('_', ' ')}</S.Badge>;
};
