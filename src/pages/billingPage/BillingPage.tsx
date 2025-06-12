import { useState } from 'react';
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
import { useBillingSummary } from '@/hooks/useBillingSummary';
import { updateWorkspacePlan } from '@/api/Billing';
import * as S from './BillingPage.Style';
import { toast } from 'react-toastify';

const qc = new QueryClient();

const BillingPageInner = () => {
  const workspaceId = useWorkspaceStore(s => s.workspaceId);
  const { data: billing } = useBillingSummary(workspaceId);
  const queryClient = useQueryClient();

  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentDoneModal, setShowPaymentDoneModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null);

  /* ---------- 이벤트 ---------- */
  const openPlanModal = () => setShowSelectModal(true);

  const selectPlan = async (planId: PlanId) => {
    setSelectedPlanId(planId);
    setShowSelectModal(false);

    // BASIC → 바로 변경
    if (planId === 'basic') {
      try {
        await updateWorkspacePlan(workspaceId, 'BASIC');
        await queryClient.invalidateQueries({ queryKey: ['billing', workspaceId] });
        toast.success('플랜이 변경되었습니다.');
      } catch (e) {
        console.error(e);
        toast.error('요금제 변경에 실패했습니다.');
      }
    } else {
      // 유료 플랜 → 결제 모달
      setShowPaymentModal(true);
    }
  };

  const onPaymentSuccess = async () => {
    if (!workspaceId || !selectedPlanId) return;

    try {
      await updateWorkspacePlan(
        workspaceId,
        selectedPlanId.toUpperCase() as 'STARTUP' | 'PROFESSIONAL' | 'ENTERPRISE',
      );
      await queryClient.invalidateQueries({ queryKey: ['billing', workspaceId] });
      setShowPaymentModal(false);
      setShowPaymentDoneModal(true);
    } catch (e) {
      console.error(e);
      toast.error('요금제 변경에 실패했습니다.');
    }
  };

  if (!billing) return null;

  /* ---------- UI ---------- */
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
            <S.Description>요금제, 팀 인원, 기능 사용량을 한눈에 확인하세요.</S.Description>
          </S.TitleWrapper>

          <S.GridWrapper>
            <BillingChartSection />
            <BillingPlanSection
              billing={billing}
              user={{ name: '', email: '' }}
              workspaceId={workspaceId}
              onUpgrade={openPlanModal}
            />
          </S.GridWrapper>

          {/* 모달들 */}
          {showSelectModal && (
            <PlanSelectModal
              currentPlanId={mapServerPlanToClientPlan(billing.currentPlan)}
              workspaceId={workspaceId}
              user={{ name: '', email: '' }}
              onSelect={selectPlan}
              onClose={() => setShowSelectModal(false)}
            />
          )}

          {showPaymentModal && selectedPlanId && (
            <PaymentModal
              workspaceId={workspaceId}
              selectedPlan={PLAN_DATA[selectedPlanId]}
              cardholderName={''}
              email={''}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={onPaymentSuccess}
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
