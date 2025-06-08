import { useState } from 'react';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import * as S from './BillingPage.Style';
import { BillingChartSection } from '@/components/billing/BillingChartSection';
import { BillingPlanSection } from '@/components/billing/BillingPlanSection';
import { PlanSelectModal } from '@/components/billing/PlanSelectModal';
import { PaymentModal } from '@/components/billing/PaymentModal';
import { PaymentCompleteModal } from '@/components/billing/PaymentCompleteModal';
import { PLAN_DATA } from '@/constants/planData';

export const BillingPage = () => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentCompleteModal, setShowPaymentCompleteModal] = useState(false);
  const [nextPlanId, setNextPlanId] = useState<string | null>(null);
  const [currentPlanId, setCurrentPlanId] = useState<
    'personal' | 'startup' | 'professional' | 'enterprise'
  >('startup');

  const handleUpgrade = (planId: string) => {
    setNextPlanId(planId);
    setShowSelectModal(true);
  };

  const handleSelectPlan = (planId: string) => {
    if (planId !== 'personal' && planId !== 'enterprise') {
      setShowSelectModal(false);
      setShowPaymentModal(true);
    } else {
      setCurrentPlanId(planId);
      setShowSelectModal(false);
    }
  };

  const handleConfirmPayment = () => {
    if (nextPlanId)
      setCurrentPlanId(nextPlanId as 'personal' | 'startup' | 'professional' | 'enterprise');
    setShowPaymentModal(false);
    setShowPaymentCompleteModal(true);
  };

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
              planId={currentPlanId}
              currentUserCount={21}
              onUpgrade={handleUpgrade}
            />
          </S.GridWrapper>

          {showSelectModal && nextPlanId && (
            <PlanSelectModal
              currentPlanId={currentPlanId}
              onSelect={handleSelectPlan}
              onClose={() => setShowSelectModal(false)}
            />
          )}
          {showPaymentModal && nextPlanId && (
            <PaymentModal
              selectedPlan={{
                ...PLAN_DATA[nextPlanId],
                price: parseFloat(PLAN_DATA[nextPlanId].price.replace('$', '')) || 0,
              }}
              onClose={() => setShowPaymentModal(false)}
              onConfirm={handleConfirmPayment}
            />
          )}
          {showPaymentCompleteModal && (
            <PaymentCompleteModal onClose={() => setShowPaymentCompleteModal(false)} />
          )}
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
};
