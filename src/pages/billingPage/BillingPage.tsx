import { useState } from 'react';
import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import * as S from './BillingPage.Style';
import { BillingChartSection } from '@/components/billing/BillingChartSection';
import {
  BillingPlanSection,
  BillingPlanSectionProps,
} from '@/components/billing/BillingPlanSection';
import { PlanSelectModal } from '@/components/billing/PlanSelectModal';

export const BillingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [nextPlanId, setNextPlanId] = useState<string | null>(null);
  const [currentPlanId, setCurrentPlanId] = useState<
    'personal' | 'startup' | 'professional' | 'enterprise'
  >('startup');

  const handleUpgrade = (planId: string) => {
    setNextPlanId(planId);
    setShowModal(true);
  };

  const handleSelectPlan = (planId: string) => {
    console.log('선택된 플랜:', planId);
    setCurrentPlanId(planId as BillingPlanSectionProps['planId']);
    setShowModal(false);
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

          {showModal && nextPlanId && (
            <PlanSelectModal
              currentPlanId={currentPlanId}
              onSelect={handleSelectPlan}
              onClose={() => setShowModal(false)}
            />
          )}
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
};
