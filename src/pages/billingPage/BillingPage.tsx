'use client';

import { useState } from 'react';
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
import * as S from './BillingPage.Style';

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

  const handleConfirmPayment = () => {
    if (nextPlanId) {
      queryClient.setQueryData(['billing', workspaceId], (prev: any) => ({
        ...prev,
        currentPlan: nextPlanId.toUpperCase(),
      }));
    }
    setShowPaymentModal(false);
    setShowPaymentDoneModal(true);
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
              billingInfo={{
                currentPlan: 'PROFESSIONAL', // or 'STARTUP' 등 서버에서 오는 값 흉내
                memberCount: 25,
              }}
              onUpgrade={handleUpgrade}
            />
          </S.GridWrapper>

          {showSelectModal && nextPlanId && (
            <PlanSelectModal
              currentPlanId={mapServerPlanToClientPlan(billingInfo.currentPlan)}
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

          {showPaymentDoneModal && (
            <PaymentCompleteModal onClose={() => setShowPaymentDoneModal(false)} />
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
