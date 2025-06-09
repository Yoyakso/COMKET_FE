import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { BillingChartSection } from '@/components/billing/BillingChartSection';
import { BillingPlanSection } from '@/components/billing/BillingPlanSection';
import { PlanSelectModal } from '@/components/billing/PlanSelectModal';
import { PaymentModal } from '@/components/billing/PaymentModal';
import { PaymentCompleteModal } from '@/components/billing/PaymentCompleteModal';
import { PLAN_DATA, PlanId } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useBillingInfo } from '@/hooks/useBillingInfo';
import { registerCreditCard, getCreditCardInfo, updateWorkspacePlan } from '@/api/Billing';
import * as S from './BillingPage.Style';
import { toast } from 'react-toastify';

interface CardInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvc: string;
}

const qc = new QueryClient();

const BillingPageInner = () => {
  const workspaceId = useWorkspaceStore(s => s.workspaceId);
  const { data: billingInfo } = useBillingInfo(workspaceId);
  const queryClient = useQueryClient();

  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentDoneModal, setShowPaymentDoneModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null);

  const { data: creditCardInfo } = useQuery({
    queryKey: ['creditCardInfo', workspaceId],
    queryFn: () => getCreditCardInfo(workspaceId),
    enabled: !!workspaceId,
  });

  const handleOpenPlanModal = () => {
    setShowSelectModal(true);
  };

  const handleSelectPlan = async (planId: PlanId) => {
    setSelectedPlanId(planId);
    setShowSelectModal(false);

    if (planId === 'basic') {
      try {
        await updateWorkspacePlan(workspaceId, 'BASIC');
        await queryClient.invalidateQueries({ queryKey: ['billing', workspaceId] });
        toast.success('플랜이 변경되었습니다.');
      } catch (err) {
        console.error(err);
        toast.error('요금제 변경에 실패했어요.');
      }
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleConfirmPayment = async (cardInfo: CardInfo) => {
    if (!workspaceId || !selectedPlanId) return;

    try {
      await registerCreditCard(workspaceId, cardInfo);
      await updateWorkspacePlan(
        workspaceId,
        selectedPlanId.toUpperCase() as 'BASIC' | 'STARTUP' | 'PROFESSIONAL' | 'ENTERPRISE',
      );

      await queryClient.invalidateQueries({ queryKey: ['billing', workspaceId] });

      setShowPaymentModal(false);
      setShowPaymentDoneModal(true);
    } catch (err) {
      console.error('카드 등록 or 요금제 변경 실패:', err);
      toast.error('결제에 실패했어요. 정보를 다시 확인해주세요.');
    }
  };

  if (!billingInfo) return null;

  return (
    <S.PageContainer>
      <S.GNBContainer>
        <GlobalNavBar variant="workspace" />
      </S.GNBContainer>

      <S.MainContainer>
        <S.LNBContainer>
          <LocalNavBar variant="settings" />
        </S.LNBContainer>

        <S.Content>
          <S.TitleWrapper>
            <S.Title>이달의 사용 현황</S.Title>
            <S.Description>요금제, 팀 인원, 기능 사용량을 한눈에 확인해보세요</S.Description>
          </S.TitleWrapper>

          <S.GridWrapper>
            <BillingChartSection />
            <BillingPlanSection
              billingInfo={billingInfo}
              creditCardInfo={creditCardInfo}
              onUpgrade={handleOpenPlanModal}
            />
          </S.GridWrapper>

          {showSelectModal && (
            <PlanSelectModal
              currentPlanId={mapServerPlanToClientPlan(billingInfo.currentPlan)}
              onSelect={handleSelectPlan}
              onClose={() => setShowSelectModal(false)}
            />
          )}

          {showPaymentModal && selectedPlanId && (
            <PaymentModal
              selectedPlan={{
                ...PLAN_DATA[selectedPlanId],
                price: PLAN_DATA[selectedPlanId].priceValue || 0,
              }}
              onClose={() => setShowPaymentModal(false)}
              onConfirm={handleConfirmPayment}
            />
          )}

          {showPaymentDoneModal && (
            <PaymentCompleteModal onClose={() => setShowPaymentDoneModal(false)} />
          )}
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
};

export const BillingPage = () => (
  <QueryClientProvider client={qc}>
    <BillingPageInner />
  </QueryClientProvider>
);
