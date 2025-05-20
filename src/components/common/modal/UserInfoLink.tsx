import styled from 'styled-components';
import { useUserInfoModal } from '@/hooks/useUserInfoModal';

interface Props {
  id: number; // DB userId
  name: string; // 노출 텍스트
  className?: string;
}

export const UserLink = ({ id, name, className }: Props) => {
  const { open } = useUserInfoModal();

  return (
    <NameSpan
      role="button"
      tabIndex={0}
      onClick={() => open(id)}
      onKeyDown={e => e.key === 'Enter' && open(id)}
      className={className}
    >
      {name}
    </NameSpan>
  );
};

const NameSpan = styled.span`
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
