import * as S from './EmptyTicket.Style';

interface Props {
  onCreateTicket: () => void;
}

export const EmptyTicket = ({ onCreateTicket }: Props) => {
  return (
    <S.Container>
      <S.Content>
        <S.TextContainer>
          <S.Text>
            아직 생성된 티켓이 없습니다.
            <br />
            지금 티켓을 생성하고 업무를 시작해보세요.
          </S.Text>
        </S.TextContainer>
        <S.CreateButton onClick={onCreateTicket}>티켓 생성</S.CreateButton>
      </S.Content>
    </S.Container>
  );
};
