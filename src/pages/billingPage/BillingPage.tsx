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
// import { ContactSalesModal } from '@/components/billing/ContactSalesModal';
import { PLAN_DATA, PlanId } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useBillingInfo } from '@/hooks/useBillingInfo';
import { registerCreditCard, getCreditCardInfo } from '@/api/Billing';
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
  const [showContactSalesModal, setShowContactSalesModal] = useState(false);
  const [nextPlanId, setNextPlanId] = useState<PlanId | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null);

  const { data: creditCardInfo } = useQuery({
    queryKey: ['creditCardInfo', workspaceId],
    queryFn: () => getCreditCardInfo(workspaceId),
    enabled: !!workspaceId,
  });

  const handleUpgrade = (planId: PlanId) => {
    setNextPlanId(planId);
    setShowSelectModal(true);
  };

  const handleSelectPlan = (planId: PlanId) => {
    switch (planId) {
      case 'basic':
        queryClient.setQueryData(['billing', workspaceId], (prev: any) => ({
          ...prev,
          currentPlan: 'BASIC',
        }));
        setShowSelectModal(false);
        break;
      case 'enterprise':
        setShowSelectModal(false);
        setShowContactSalesModal(true);
        break;
      default:
        setShowSelectModal(false);
        setShowPaymentModal(true);
    }
  };

  const handleConfirmPayment = async (cardInfo: CardInfo) => {
    if (!workspaceId || !nextPlanId) return;

    try {
      await registerCreditCard(workspaceId, {
        cardNumber: cardInfo.cardNumber,
        cardholderName: cardInfo.cardholderName,
        expiryDate: cardInfo.expiryDate,
        cvc: cardInfo.cvc,
      });

      toast.success('카드 등록이 완료되었어요!');
      queryClient.invalidateQueries({ queryKey: ['billing', String(workspaceId)] });

      setShowPaymentModal(false);
      setShowPaymentDoneModal(true);
    } catch (err) {
      console.error('카드 등록 실패:', err);
      toast.error('카드 등록에 실패했어요. 정보를 다시 확인해주세요.');
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
              onUpgrade={handleUpgrade}
            />
          </S.GridWrapper>

          {showSelectModal && nextPlanId && (
            <PlanSelectModal
              currentPlanId={mapServerPlanToClientPlan(billingInfo.currentPlan)}
              onSelect={planId => {
                setSelectedPlanId(planId as PlanId);
                setShowSelectModal(false);
                setShowPaymentModal(true);
              }}
              onClose={() => setShowSelectModal(false)}
            />
          )}

          {showPaymentModal && nextPlanId && (
            <PaymentModal
              selectedPlan={{
                ...PLAN_DATA[selectedPlanId],
                price: PLAN_DATA[selectedPlanId].priceValue || 0,
              }}
              onClose={() => setShowPaymentModal(false)}
              onConfirm={handleConfirmPayment}
            />
          )}

          {/* {showContactSalesModal && (
            // <ContactSalesModal onClose={() => setShowContactSalesModal(false)} />
          )} */}
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
