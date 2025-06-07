'use client';

import { GlobalNavBar } from '@/components/common/navBar/GlobalNavBar';
import { LocalNavBar } from '@/components/common/navBar/LocalNavBar';
import { Footer } from '@/components/common/footer/Footer';
import * as S from './BillingPage.Style';
import { BillingChartSection } from '@/components/billing/BillingChartSection';
import { BillingPlanSection } from '@/components/billing/BillingPlanSection';

export const BillingPage = () => {
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
          <S.Title>이달의 사용 현황</S.Title>
          <S.Description>요금제, 팀 인원, 기능 사용량을 한눈에 확인해보세요</S.Description>

          <S.GridWrapper>
            <BillingChartSection />
            <BillingPlanSection />
          </S.GridWrapper>
        </S.Content>
      </S.MainContainer>
    </S.PageContainer>
  );
};
