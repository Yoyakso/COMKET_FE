import * as S from './UserStatusBadge.Style';
import { useUserStatusStore } from '@/stores/userStatusStore';

interface Props {
  email: string;
}

export const UserStatusBadge = ({ email }: Props) => {
  const status = useUserStatusStore(s => s.statusMap[email] || '오프라인');

  return (
    <S.Container>
      <S.Indicator $status={status} />
      <S.Text>{status}</S.Text>
    </S.Container>
  );
};
