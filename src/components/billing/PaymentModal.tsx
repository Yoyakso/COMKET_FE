import React from 'react';
import * as S from './PaymentModal.Style';
import { Button } from '@/components/common/button/Button';
import { CreditCard } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const PaymentModal = ({ onClose, onConfirm }: PaymentModalProps) => {
  return (
    <>
      <S.ModalBackground onClick={onClose} />
      <S.Modal>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>

        <S.IconWrapper>
          <S.IconCircle>
            <CreditCard size={36} strokeWidth={1.5} color="#108D68" />
          </S.IconCircle>
        </S.IconWrapper>

        <S.Title>카드 변경</S.Title>
        <S.SubText>
          카카오페이 앱에서 등록된 카드 중 하나를 선택하여
          <br />
          결제 수단을 변경할 수 있습니다.
        </S.SubText>

        <S.ButtonGroup>
          <Button $variant="neutralOutlined" size="md" onClick={onClose} style={{ flex: 1 }}>
            취소
          </Button>
          <Button $variant="tealFilled" size="md" onClick={onConfirm} style={{ flex: 1 }}>
            카카오페이로 변경
          </Button>
        </S.ButtonGroup>
      </S.Modal>
    </>
  );
};
