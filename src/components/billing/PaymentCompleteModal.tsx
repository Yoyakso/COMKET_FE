import * as S from './PaymentCompleteModal.Style';
import { Button } from '@/components/common/button/Button';

interface PaymentCompleteModalProps {
  onClose: () => void;
}

export const PaymentCompleteModal = ({ onClose }: PaymentCompleteModalProps) => {
  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
        <S.TitleWrapper>
          <S.Title>결제 완료</S.Title>
        </S.TitleWrapper>
        <S.Description>
          결제가 정상 처리되었습니다.
          <br />
          변경된 요금제가 적용되었습니다.
        </S.Description>
        <S.ButtonRow>
          <Button onClick={onClose} $variant="tealFilled" size="md" style={{ flex: 1 }}>
            확인
          </Button>
        </S.ButtonRow>
      </S.Modal>
    </>
  );
};
