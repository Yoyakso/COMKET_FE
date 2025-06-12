import React, { useState } from 'react';
import * as S from './PaymentModal.Style';
import { Button } from '@/components/common/button/Button';
import { CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import { registerPayment } from '@/api/Billing';

interface PaymentModalProps {
  workspaceId: number;
  selectedPlan?: { name: string };
  cardholderName: string;
  email: string;
  onClose: () => void;
  onSuccess?: () => void;
}

declare global {
  interface Window {
    IMP: any;
  }
}

export const PaymentModal = ({
  workspaceId,
  selectedPlan,
  cardholderName,
  email,
  onClose,
  onSuccess,
}: PaymentModalProps) => {
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    if (processing) return;

    if (!window.IMP) {
      toast.error('결제 라이브러리를 초기화할 수 없습니다.');
      return;
    }
    window.IMP.init('imp53325701'); // 가맹점 코드

    setProcessing(true);

    window.IMP.request_pay(
      {
        pg: 'kakaopay.TCSUBSCRIP', // 정기결제(테스트)
        pay_method: 'card',
        merchant_uid: `comket_${Date.now()}`,
        amount: 0, // ★ 카드 등록만 → status = "ready"
        customer_uid: `workspace_${workspaceId}`,
        name: selectedPlan?.name ?? '결제 수단 등록',
        buyer_email: email,
        buyer_name: cardholderName,
      },
      async (rsp: any) => {
        if (!rsp.success) {
          toast.error(`카드 등록 실패: ${rsp.error_msg}`);
          setProcessing(false);
          return;
        }

        try {
          await registerPayment(workspaceId, rsp.imp_uid);
          toast.success('카드가 등록되었습니다.');
          onSuccess?.();
          onClose();
        } catch (e) {
          console.error(e);
          toast.error('카드 등록은 성공했지만 서버 저장에 실패했습니다.');
        } finally {
          setProcessing(false);
        }
      },
    );
  };

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

        <S.Title>결제 수단 등록/변경</S.Title>
        <S.SubText>
          카카오페이 앱에서
          <br />
          결제 수단을 등록하거나 변경할 수 있습니다.
        </S.SubText>

        <S.ButtonGroup>
          <Button
            $variant="neutralOutlined"
            size="md"
            onClick={onClose}
            style={{ flex: 1 }}
            disabled={processing}
          >
            취소
          </Button>
          <Button
            $variant="tealFilled"
            size="md"
            onClick={handlePayment}
            style={{ flex: 1 }}
            disabled={processing}
          >
            {processing ? '진행 중...' : '카카오페이로 등록'}
          </Button>
        </S.ButtonGroup>
      </S.Modal>
    </>
  );
};
