import React, { useState } from 'react';
import { Button } from '@/components/common/button/Button';
import * as S from './BillingPlanSection.Style';
import { PLAN_DATA, PlanId } from '@/constants/planData';
import { mapServerPlanToClientPlan } from '@/utils/mapPlanId';
import { PaymentModal } from '@/components/billing/PaymentModal';
import { BadgeCheck } from 'lucide-react';
import type { BillingSummary } from '@/api/Billing';

interface BillingPlanSectionProps {
  billing: BillingSummary;
  user: { name: string; email: string };
  workspaceId: number;
  onUpgrade?: (target: PlanId) => void;
}

export const BillingPlanSection = ({
  billing,
  user,
  workspaceId,
  onUpgrade,
}: BillingPlanSectionProps) => {
  const currentPlanId = mapServerPlanToClientPlan(billing.currentPlan);
  const currentPlan = PLAN_DATA[currentPlanId];

  const atLimit = billing.memberCount >= currentPlan.maxUsers;
  const nextPlanId = currentPlan.nextPlan;

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPlanId, setPendingPlanId] = useState<PlanId | null>(null);

  const handleUpgrade = () => {
    if (!billing.hasPayment) {
      setPendingPlanId(nextPlanId!);
      setShowPaymentModal(true);
      return;
    }
    onUpgrade?.(nextPlanId!);
  };

  /* ---------- UI ---------- */
  return (
    <S.Container>
      {/* 요금제 카드 */}
      <S.Card>
        <S.Header>
          <S.Heading>현재 요금제</S.Heading>
          <S.Sub>{currentPlan.name} 플랜의 상세 정보</S.Sub>
        </S.Header>

        <S.PlanRow>
          <S.PlanName>{currentPlan.name}</S.PlanName>
          <S.PlanBadge>{currentPlan.badge}</S.PlanBadge>
        </S.PlanRow>

        {typeof currentPlan.priceValue === 'number' && (
          <S.PriceRow>
            <S.Price>₩{currentPlan.priceValue.toLocaleString('ko-KR')}</S.Price>
            <S.PriceUnit>/ 월 / 사용자</S.PriceUnit>
          </S.PriceRow>
        )}

        <S.Divider />

        <S.InfoList>
          <li>팀 인원: {currentPlan.userRange}</li>
          <li>{currentPlan.description}</li>
        </S.InfoList>

        <S.ExpectedPrice>
          <S.Title>예상 월 요금</S.Title>
          <S.ExpectedPriceContainer>
            <S.ExpectedPriceRow>
              <S.Label>요금제 단가</S.Label>
              <S.Value>₩{currentPlan.priceValue.toLocaleString('ko-KR')}/월</S.Value>
            </S.ExpectedPriceRow>
            <S.ExpectedPriceRow>
              <S.Label>워크스페이스 멤버</S.Label>
              <S.Value>{billing.memberCount}명</S.Value>
            </S.ExpectedPriceRow>
            <S.RowDivider />
            <S.ExpectedPriceRow>
              <S.Label>총 예상 요금</S.Label>
              <S.Value>
                ₩{(currentPlan.priceValue * billing.memberCount).toLocaleString('ko-KR')}/월
              </S.Value>
            </S.ExpectedPriceRow>
          </S.ExpectedPriceContainer>
        </S.ExpectedPrice>

        <S.CardFooter>
          {atLimit && (
            <S.UpgradeNotice>인원이 한도를 초과했습니다. 플랜을 업그레이드하세요.</S.UpgradeNotice>
          )}
          <Button $variant="tealFilled" size="lg" onClick={handleUpgrade}>
            플랜 변경하기
          </Button>
        </S.CardFooter>
      </S.Card>

      {/* 결제 등록 카드 */}
      <S.Card>
        <S.Header>
          <S.Heading>정기결제 등록</S.Heading>
        </S.Header>

        <S.InfoLine>
          <BadgeCheck size={16} strokeWidth={1.5} />
          <S.InfoLabel>등록 상태</S.InfoLabel>
          <S.InfoValue>
            {billing.hasPayment ? <S.BadgeRegistered>등록 완료</S.BadgeRegistered> : '미등록'}
          </S.InfoValue>
        </S.InfoLine>

        <S.CardFooter>
          <Button
            $variant="neutralOutlined"
            size="md"
            onClick={() => {
              setPendingPlanId(null);
              setShowPaymentModal(true);
            }}
            style={{ width: '100%' }}
          >
            정기결제 등록/변경
          </Button>
        </S.CardFooter>
      </S.Card>

      {/* 결제 모달 */}
      {showPaymentModal && (
        <PaymentModal
          workspaceId={workspaceId}
          selectedPlan={pendingPlanId ? PLAN_DATA[pendingPlanId] : undefined}
          cardholderName={user.name}
          email={user.email}
          onClose={() => {
            setShowPaymentModal(false);
            setPendingPlanId(null);
          }}
          onSuccess={() => {
            if (pendingPlanId) onUpgrade?.(pendingPlanId);
            setShowPaymentModal(false);
          }}
        />
      )}
    </S.Container>
  );
};
